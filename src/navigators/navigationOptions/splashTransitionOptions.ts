import {StackNavigationOptions, TransitionSpecs} from '@react-navigation/stack';
import forSlide from '../cardStyleInterpolators/forSlide';

const splashTransitionOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: forSlide,
};

export default splashTransitionOptions;
