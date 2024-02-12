import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import {Animated} from 'react-native';

const forVerticalWithOverlayFade = ({
  current,
  inverted,
  layouts: {screen},
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  const translateY = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.height, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  return {
    cardStyle: {
      transform: [{translateY}],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  };
};

export default forVerticalWithOverlayFade;
