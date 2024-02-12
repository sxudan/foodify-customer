import {LayoutAnimation, Platform} from 'react-native';

const useLayoutAnimation: () => [() => void] = () => {
  const layoutAnimate = () => {
    // Android can crash when using LayoutAnimation for React nodes
    // that are being removed. Custom config for Android fixe this
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {type: LayoutAnimation.Types.easeInEaseOut},
      });
    }
  };

  return [layoutAnimate];
};

export default useLayoutAnimation;
