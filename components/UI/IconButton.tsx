import React, { FC } from 'react'
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'

type IconButtonProps = TouchableNativeFeedback['props'] & {
  style?: StyleProp<ViewStyle>
}

const IconButton: FC<IconButtonProps> = props => {
  return (
    <TouchableNativeFeedback {...props}>
      <View style={[styles.container, props.style]}>{props.children}</View>
    </TouchableNativeFeedback>
  )
}

export default IconButton

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 2,
    elevation: 4,
  },
})
