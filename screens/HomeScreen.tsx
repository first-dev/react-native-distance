import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatGrid } from 'react-native-super-grid'

import { MainStackParamList } from '../navigation/MainNavigator'
import ToolItem, { ToolItemProps } from '../components/ToolItem'

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>

const HomeScreen: FC<Props> = ({ navigation }) => {
  const toolsList: ToolItemProps[] = [
    {
      title: 'Width',
      image: require('../assets/icons/width.png'),
      onPress: () => navigation.navigate('Measure', { type: 'width' }),
    },
    {
      title: 'Height',
      image: require('../assets/icons/height.png'),
      onPress: () => navigation.navigate('Measure', { type: 'height' }),
    },
    {
      title: 'Distance',
      image: require('../assets/icons/distance.png'),
      onPress: () => navigation.navigate('Measure', { type: 'distance' }),
    },
  ]
  return (
    <View style={styles.screen}>
      <FlatGrid
        data={toolsList}
        itemDimension={80}
        renderItem={({ item }) => <ToolItem {...item} />}
      />
    </View>
  )
}
export default HomeScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
