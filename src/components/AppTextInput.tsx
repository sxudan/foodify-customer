import theme from '@utils/theme';
import React, {forwardRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface AppTextInputProps extends TextInputProps {
  error?: boolean;
  highlightOnFocus?: boolean;
  style?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  SuffixComponent?: React.ReactElement;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
const AppTextInput = forwardRef<TextInput, AppTextInputProps & TextInputProps>(
  (
    {
      style,
      containerStyle,
      error = false,
      highlightOnFocus,
      SuffixComponent,
      ...otherProps
    },
    ref,
  ) => {
    const [inputFocused, setInputFocused] = useState(false);
    const showHighlight = inputFocused && highlightOnFocus;

    const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setInputFocused(true);

      otherProps?.onFocus?.(e);
    };

    const onBlurInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setInputFocused(false);

      otherProps?.onBlur?.(e);
    };

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          showHighlight ? styles.highlight : {},
          error ? styles.error : {},
        ]}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            style,
            showHighlight
              ? styles.inputHighlight
              : styles.nonHighlightMarginAdjustment,
          ]}
          placeholderTextColor={
            otherProps.placeholderTextColor ?? theme.colors.black
          }
          onFocus={onInputFocus}
          onBlur={onBlurInput}
          {...otherProps}
        />
        {SuffixComponent !== undefined && SuffixComponent}
      </View>
    );
  },
);

export default React.memo(AppTextInput);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  error: {},
  highlight: {},
  input: {
    lineHeight: 20,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: theme.fonts.system,
    color: theme.colors.black,
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  inputHighlight: {},
  nonHighlightMarginAdjustment: {},
});
