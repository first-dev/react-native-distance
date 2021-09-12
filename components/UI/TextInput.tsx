import React, { FC, forwardRef, useState } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput as NativeTextInput,
} from 'react-native'
import {
  HelperText,
  TextInput as PaperTextInput,
  withTheme,
} from 'react-native-paper'
import { TextInputProps as PaperTextInputProps } from 'react-native-paper/src/components/TextInput/TextInput'

export type TextInputProps = PaperTextInputProps & {
  errorText?: string
  showCounter?: boolean
  containerStyle?: StyleProp<ViewStyle>
}
interface TextInputInterface
  extends React.ForwardRefExoticComponent<
    TextInputProps & React.RefAttributes<NativeTextInput>
  > {
  Affix: typeof PaperTextInput.Affix
  Icon: typeof PaperTextInput.Icon
}

const TextInput = forwardRef<NativeTextInput, TextInputProps>((props, ref) => {
  const [length, setLength] = useState(props.value?.length ?? 0)
  return (
    <View style={props.containerStyle}>
      <PaperTextInput
        {...props}
        ref={ref}
        onChangeText={v => {
          props.onChangeText?.(v)
          if (length !== v.length) setLength(v.length)
        }}
        // @ts-ignore
        theme={{ colors: { text: props.style?.color } }}
      />
      <View style={styles.helpersWrapper}>
        <HelperText
          type="error"
          visible={props.error === true && props.errorText !== undefined}
          style={styles.helper}>
          {props.errorText}
        </HelperText>
        {props.showCounter && (
          <View style={styles.counterWrapper}>
            {props.maxLength !== undefined ? (
              <HelperText type="info" visible style={styles.counterHelper}>
                {length} / {props.maxLength}
              </HelperText>
            ) : (
              <HelperText type="info" visible style={styles.counterHelper}>
                {length}
              </HelperText>
            )}
          </View>
        )}
      </View>
    </View>
  )
}) as TextInputInterface
TextInput.Affix = PaperTextInput.Affix
TextInput.Icon = PaperTextInput.Icon
export default withTheme(TextInput)
const styles = StyleSheet.create({
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helper: {
    flexShrink: 1,
  },
  counterWrapper: {
    flexDirection: 'row-reverse',
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
})
