import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import conditional from '@react-navigation/stack/lib/module/utils/conditional';
import {Animated} from 'react-native';

const forVerticalWithFade = ({
  current,
  inverted,
  closing,
  layouts: {screen},
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  const translateY = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.height * 0.25, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  const opacity = conditional(
    closing,
    current.progress.interpolate({
      inputRange: [0, 0.59, 0.6, 1],
      outputRange: [0, 0, 0.5, 1],
      extrapolate: 'clamp',
    }),
    current.progress.interpolate({
      inputRange: [0, 0.29, 0.3, 0.5, 1],
      outputRange: [0, 0, 0.5, 1, 1],
      extrapolate: 'clamp',
    }),
  );

  return {
    cardStyle: {
      transform: [{translateY}],
    },
    containerStyle: {
      opacity,
    },
  };
};

export default forVerticalWithFade;
