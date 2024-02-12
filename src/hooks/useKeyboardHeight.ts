import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, LayoutAnimation, Platform} from 'react-native';

export const useKeyboardHeight: () => [number, boolean] = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const _keyboardDidShow = (props: KeyboardEvent) => {
    const {endCoordinates} = props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setKeyboardHeight(endCoordinates.height);
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setKeyboardHeight(0);
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      _keyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      _keyboardDidHide,
    );

    // cleanup function
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return [keyboardHeight, keyboardVisible];
};
