import theme from '@utils/theme';
import React, {FC} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface Props {
  style?: TextStyle;
  size?: number;
  color?: string;
  weight?: TextStyle['fontWeight'] | undefined;
  lineHeight?: number
}

export type TitleProps = Props & TextProps;

const Title: FC<Props & TextProps> = ({
  style,
  size = 24,
  color = theme.colors.black,
  children,
  weight = 'normal',
  lineHeight
}) => {
  return (
    <Text style={[styles.text, {fontSize: size, color: color, fontWeight: weight, lineHeight: lineHeight}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.system,
  },
});

export default Title;
