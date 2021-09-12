import { MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import colors from '../assets/colors'
import store from '../store/index'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accentLight,
  },
}
const Providers: FC = ({ children }) => {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: props => <MaterialIcons {...props} name={props.name as any} />,
      }}>
      {/* <ReduxProvider store={store}> */}
      <NavigationContainer>{children}</NavigationContainer>
      {/* </ReduxProvider> */}
    </PaperProvider>
  )
}
export default Providers
