import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {ColorValue, Platform, StatusBar, StatusBarStyle} from 'react-native';

export const useStatusBar = (
  style: StatusBarStyle,
  backgroundColor?: ColorValue,
  translucent?: boolean,
): void => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
      if (Platform.OS === 'android' && backgroundColor) {
        StatusBar.setBackgroundColor(backgroundColor);
        if (translucent !== undefined) {
          StatusBar.setTranslucent(translucent);
        }
      }
    }, [backgroundColor, style, translucent]),
  );
};
