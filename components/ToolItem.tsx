import React, { FC } from 'react'
import { View, StyleSheet, ImageSourcePropType, Image } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Card, Text } from 'react-native-paper'

export type ToolItemProps = {
  title: string
  image: ImageSourcePropType
  onPress?: () => void
}

const ToolItem: FC<ToolItemProps> = ({ title, image, onPress }) => {
  return (
    <Card style={styles.screen}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </Card>
  )
}
export default ToolItem
const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
  },
  container: {
    padding: 10,
  },
  imageContainer: {
    padding: 4,
    aspectRatio: 1,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: '14%',
  },
})
