import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';

const transitionSpecSlowSpring: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 300,
    damping: 1000,
    mass: 1.2,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export default transitionSpecSlowSpring;
