import { useState, useEffect } from 'react'
import {
  StyleSheet,
  ScaledSize,
  ViewStyle,
  TextStyle,
  ImageStyle,
  useWindowDimensions,
} from 'react-native'

type StylesProvider<T extends ViewStyle | TextStyle | ImageStyle> = (
  window: ScaledSize
) => T
/**
 * Updates styles dynamically when window dimensions change
 */
const useDynamicStyles = <T>(stylesProvider: StylesProvider<T>) => {
  const window = useWindowDimensions()
  const [dynamicStyles, setDynamicStyles] = useState(
    StyleSheet.create({
      style: stylesProvider(window),
    })
  )
  useEffect(() => {
    setDynamicStyles(
      StyleSheet.create({
        style: stylesProvider(window),
      })
    )
  }, [window])
  return dynamicStyles.style
}

export default useDynamicStyles
