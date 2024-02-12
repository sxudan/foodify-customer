import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import conditional from '@react-navigation/stack/lib/module/utils/conditional';

const forFade = ({
  current,
  closing,
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
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
      opacity,
    },
  };
};

export default forFade;
