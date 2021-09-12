import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MeasureScreen from '../screens/MeasureScreen'
import HeaderButton from '../components/UI/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

export type MainStackParamList = {
  Home: undefined
  Measure: {
    type: 'height' | 'width' | 'distance'
  }
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export default () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="Measure"
      component={MeasureScreen}
      options={() => ({
        headerRight: ({ tintColor }) => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="info"
              iconName="info-outline"
              onPress={() => console.log(`info pressed`)}
            />
          </HeaderButtons>
        ),
      })}
    />
  </Stack.Navigator>
)
