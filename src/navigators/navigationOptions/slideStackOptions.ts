import {
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import forSlide from '../cardStyleInterpolators/forSlide';
import defaultStackOptions from './defaultStackOptions';

const slideStackOptions: StackNavigationOptions = {
  ...defaultStackOptions,
  cardStyleInterpolator: forSlide,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
};

export default slideStackOptions;
