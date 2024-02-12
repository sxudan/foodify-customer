import {StyleSheet} from 'react-native';

export const color = (textColor: string) =>
  StyleSheet.create({
    color: {
      color: textColor,
    },
  });

export default color;
