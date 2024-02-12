import theme, {Fonts} from '@utils/theme';
import React, {FC} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';

export interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  font?: Fonts;
  size?: number;
  color?: string;
}

const DEFAULT_FONT_SIZE = 16;

const AppText: FC<AppTextProps> = ({
  size = DEFAULT_FONT_SIZE,
  font = theme.fonts.system,
  color = theme.colors.black,
  style,
  children,
  ...otherProps
}) => {
  return (
    <Text
      style={[{fontSize: size, color: color, fontFamily: font}, style]}
      {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
