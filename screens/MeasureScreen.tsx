import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Camera } from 'expo-camera'
import { Text, Button, IconButton, Portal, Modal } from 'react-native-paper'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import { MainStackParamList } from '../navigation/MainNavigator'
import Rotation from '../util/sensors/Rotation'
import TextInput from '../components/UI/TextInput'
import { calculateDistance } from '../util/measures'
import useDynamicStyles from '../hooks/useDynamicStyles'

type Props = NativeStackScreenProps<MainStackParamList, 'Measure'>
type Angles = {
  horizontal: number
  vertical: number
}

const MeasureScreen: FC<Props> = ({ route }) => {
  const { type } = route.params
  const [hasPermission, setHasPermission] = useState<boolean>()
  const [initialAngles, setInitialAngles] = useState<Angles>()
  const [finalAngles, setFinalAngles] = useState<Angles>()
  const [altitude, setAltitude] = useState('0.8')
  const [result, setResult] = useState<number>()
  const [anglesUpdaterIntervalId, setAnglesUpdaterIntervalId] = useState(0)
  const [toolModalVisible, setToolModalVisible] = useState(false)
  const cameraOverlayDynamicStyles = useDynamicStyles(({ width }) => ({
    width,
  }))
  const rotation = useRef(new Rotation()).current
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
    rotation.listen()
  }, [])
  useEffect(() => {
    if (
      finalAngles?.vertical !== undefined &&
      initialAngles?.vertical !== undefined
    ) {
      setResult(
        calculateDistance(
          parseFloat(altitude),
          initialAngles.vertical,
          finalAngles.vertical
        )
      )
    }
  }, [finalAngles])
  const pressInHandler = useCallback(() => {
    setInitialAngles({
      horizontal: rotation.horizontal!,
      vertical: rotation.vertical!,
    })
    if (anglesUpdaterIntervalId) {
      clearInterval(anglesUpdaterIntervalId)
      setAnglesUpdaterIntervalId(0)
    } else {
      const newIntervalId = setInterval(
        () =>
          setFinalAngles({
            horizontal: rotation.horizontal!,
            vertical: rotation.vertical!,
          }),
        100
      )
      console.log(`intervalId: ${newIntervalId}`)
      setAnglesUpdaterIntervalId(newIntervalId as unknown as number)
    }
  }, [anglesUpdaterIntervalId])
  const pressOutHandler = useCallback(() => {
    if (anglesUpdaterIntervalId) {
      clearInterval(anglesUpdaterIntervalId)
      setAnglesUpdaterIntervalId(0)
      console.log(`cleared: ${anglesUpdaterIntervalId}`)
    }
  }, [anglesUpdaterIntervalId])
  useEffect(() => {
    return () => {
      if (anglesUpdaterIntervalId) {
        clearInterval(anglesUpdaterIntervalId)
      }
      rotation.removerListener()
    }
  }, [])

  const showToolModal = () => setToolModalVisible(true)
  const hideToolModal = () => setToolModalVisible(false)
  const pressHandler = () => {}

  if (hasPermission === undefined) return <View />
  if (hasPermission === false) return <Text>No access to camera</Text>

  return (
    <View style={styles.screen}>
      <Camera type="back" style={styles.camera} ratio="16:9">
        <View style={[styles.cameraOverlay, cameraOverlayDynamicStyles]}>
          <View style={styles.topBar}>
            <View style={styles.toolContainer}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#0004', false)}
                style={styles.toolTouchable}
                onPress={showToolModal}>
                <IconButton
                  icon="height"
                  size={26}
                  color="white"
                  style={styles.toolIcon}
                />
                <Text style={styles.toolBarText}>{altitude} m</Text>
              </TouchableNativeFeedback>
              <Portal>
                <Modal
                  visible={toolModalVisible}
                  onDismiss={hideToolModal}
                  contentContainerStyle={styles.modalContainer}>
                  <TextInput
                    mode="outlined"
                    keyboardType="number-pad"
                    style={styles.modalNumericInput}
                    right={<TextInput.Affix text="m" />}
                    value={altitude.toString()}
                    onChangeText={setAltitude}
                    onSubmitEditing={hideToolModal}
                  />
                  <Button icon="done" onPress={hideToolModal}>
                    Done
                  </Button>
                </Modal>
              </Portal>
            </View>
          </View>
          <View style={styles.resultContainer}>
            {result !== undefined && (
              <Text style={styles.resultText}>{`${result?.toFixed(2)} m`}</Text>
            )}
          </View>
          <View style={styles.crosshairContainer}>
            <Image
              source={require('../assets/icons/crosshair.png')}
              style={styles.crosshair}
            />
          </View>
          <IconButton
            style={styles.cameraIcon}
            icon="camera"
            color="black"
            size={80}
            onPressIn={pressInHandler}
            onPressOut={pressOutHandler}
            onPress={pressHandler}
          />
        </View>
      </Camera>
    </View>
  )
}
export default MeasureScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    aspectRatio: 9 / 16,
    height: '100%',
    alignItems: 'center',
  },
  cameraOverlay: {
    height: '100%',
    padding: 8,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
  },
  toolContainer: {
    backgroundColor: '#0002',
    borderRadius: 100,
    overflow: 'hidden',
  },
  toolTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    margin: 0,
  },
  toolBarText: {
    color: 'white',
    marginRight: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
  },
  modalNumericInput: {
    width: 80,
  },
  resultContainer: {
    alignItems: 'center',
    padding: 12,
  },
  resultText: {
    fontSize: 28,
  },
  textInput: {
    width: 200,
  },
  crosshairContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshair: {
    width: 100,
    height: 100,
  },
  cameraIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
})
