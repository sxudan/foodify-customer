import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  SharedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const PULSE_DURATION = 2000;

const useLoadingAnimation: () => [
  SharedValue<number>,
  SharedValue<number>,
] = () => {
  const screenWidth = useWindowDimensions().width;
  const translateValue = useSharedValue(-screenWidth);
  const opacityValue = useSharedValue(1);

  useEffect(() => {
    const pulseWidth = screenWidth;

    translateValue.value = withRepeat(
      withSequence(
        withTiming(pulseWidth * 2, {duration: PULSE_DURATION}),
        withTiming(pulseWidth * -2, {duration: 0}),
      ),
      -1,
    );

    opacityValue.value = withRepeat(
      withSequence(
        withTiming(0.5, {duration: PULSE_DURATION}),
        withTiming(1, {duration: PULSE_DURATION}),
      ),
      -1,
    );
  }, [opacityValue, screenWidth, translateValue]);

  return [translateValue, opacityValue];
};

export default useLoadingAnimation;
