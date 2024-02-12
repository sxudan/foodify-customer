import {addAlpha} from '@utils/helpers';
import theme from '@utils/theme';
import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {DEFAULT_BLOCK_BUTTON_HEIGHT} from '../utils/constants';

export interface BlockButtonProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  text: string;
  textColor?: string;
  buttonColor?: string;
  loadingIndicatorColor?: string;
  loadingIndicatorStyle?: string;
  loading?: boolean;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  SuffixComponent?: React.ReactElement;
  PrefixComponent?: React.ReactElement;
}

const BlockButton: FC<BlockButtonProps> = ({
  onPress,
  containerStyle,
  bodyStyle,
  text,
  textColor = theme.colors.white,
  buttonColor = theme.colors.black,
  loadingIndicatorColor = theme.colors.white,
  loading,
  disabled,
  textStyle,
  SuffixComponent,
  PrefixComponent,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        {backgroundColor: disabled ? addAlpha(buttonColor, 0.5) : buttonColor},
      ]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && (
        <ActivityIndicator size="small" color={loadingIndicatorColor} />
      )}
      {!loading && (
        <View style={[styles.textContainer, bodyStyle]}>
          {PrefixComponent !== undefined && PrefixComponent}
          <Text style={[styles.buttonText, textStyle, {color: textColor}]}>
            {text}
          </Text>
          {SuffixComponent !== undefined && SuffixComponent}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    lineHeight: 27,
    color: theme.colors.white,
    fontFamily: theme.fonts.system,
  },
  container: {
    height: DEFAULT_BLOCK_BUTTON_HEIGHT,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BlockButton;
