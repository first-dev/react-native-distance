import React from 'react'
import { enableScreens } from 'react-native-screens'
import MainNavigator from './navigation/MainNavigator'

import Providers from './util/Providers'

enableScreens()

export default function App() {
  return (
    <Providers>
      <MainNavigator />
    </Providers>
  )
}
