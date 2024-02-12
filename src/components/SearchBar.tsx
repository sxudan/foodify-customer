import SearchIcon from '@assets/images/search-bar-ic.png';
import theme from '@utils/theme';
import React, {FC, useCallback, useRef, useState} from 'react';
import {
  Image,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AppTextInput, {AppTextInputProps} from './AppTextInput';

interface Props extends Omit<AppTextInputProps, 'style'> {
  searchText?: string;
  setSearchText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  PrefixComponent?: React.ReactElement;
  SuffixComponent?: React.ReactElement;
  iconStyle?: ImageStyle;
  highlightOnFocus?: boolean;
  showSearchIcon?: boolean;
  highlightColor?: string;
  placeholder: string;
}

const FOCUSED_BORDER_WIDTH = 2;

const SearchBar: FC<Props> = ({
  searchText = '',
  setSearchText,
  placeholder,
  style,
  textStyle,
  PrefixComponent,
  SuffixComponent,
  iconStyle,
  highlightOnFocus,
  highlightColor,
  showSearchIcon = true,
  error,
  ...rest
}) => {
  const ref = useRef<TextInput>(null);

  const [inputFocused, setInputFocused] = useState(rest.autoFocus);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setInputFocused(true);
      rest?.onFocus?.(e);
    },
    [rest],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setInputFocused(false);
      rest?.onBlur?.(e);
    },
    [rest],
  );

  return (
    <View
      style={[
        styles.container,
        style,
        highlightOnFocus && inputFocused
          ? [
              {borderColor: highlightColor ?? theme.colors.black},
              styles.highlightContainer,
            ]
          : undefined,
        error ? styles.error : undefined,
      ]}>
      {PrefixComponent}
      {showSearchIcon && (
        <Image source={SearchIcon} style={[iconStyle, styles.icon]} />
      )}
      <View style={styles.inputContainer}>
        <AppTextInput
          ref={ref}
          value={searchText}
          onChangeText={setSearchText}
          style={[styles.searchText, textStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.lightGrey}
          containerStyle={styles.inputContainerInner}
          numberOfLines={1}
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      {SuffixComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
  },
  error: {
    borderColor: theme.colors.error,
  },
  highlightContainer: {
    borderWidth: FOCUSED_BORDER_WIDTH,
    // Compensate for increased border width causing input to shift when focused
    left: -(FOCUSED_BORDER_WIDTH / 2),
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
  },
  inputContainerInner: {
    borderWidth: 0,
    borderRadius: 0,
  },
  searchText: {
    paddingHorizontal: 0,
    flex: 1,
    fontSize: 14,
    paddingRight: 20,
    fontFamily: theme.fonts.system,
  },
});

export default SearchBar;
