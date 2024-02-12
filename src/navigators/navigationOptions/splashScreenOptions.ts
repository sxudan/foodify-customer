import {StackNavigationOptions, TransitionSpecs} from '@react-navigation/stack';
import forSplashScreen from '../cardStyleInterpolators/forSplashScreen';

const splashScreenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: forSplashScreen,
};

export default splashScreenOptions;
