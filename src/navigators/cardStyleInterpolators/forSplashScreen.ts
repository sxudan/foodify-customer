import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
} from '@react-navigation/stack';

const forSplashScreen = ({
  current,
  next,
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  return {
    cardStyle: {
      opacity: next
        ? next.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 0],
          })
        : current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          }),
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  };
};

export default forSplashScreen;
