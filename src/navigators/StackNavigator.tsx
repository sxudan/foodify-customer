import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
// import DashboardScreen from '../features/dashboard/containers/DashboardScreen';
import {ROUTE_AUTHENTICATED_NAVIGATOR, ROUTE_AUTHENTICATION_NAVIGATOR, ROUTE_DASHBOARD, ROUTE_FOOD_DETAIL, ROUTE_LOCATION, ROUTE_PRODUCT_DETAIL, ROUTE_TAB_NAVIGATOR} from './routeNames';
import { Food, RestaurantForCustomer } from '../graphql/generated';
import DashboardScreen from '../screens/dashboard/containers/DashboardScreen';
import ProductDetailScreen from '../screens/dashboard/containers/ProductDetailScreen';
import FoodDetailScreen from '../screens/dashboard/containers/FoodDetailScreen';
import { TabNavigator } from './TabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import AuthenticatedStackNavigator from './AuthenticatedStackNavigator';
import LocationPickerScreen, { LocationPickType } from '../screens/location/containers/LocationPicker';
import Back from '@components/navigation/Back';

export type StackParamList = {
  [ROUTE_TAB_NAVIGATOR]: undefined;
  [ROUTE_PRODUCT_DETAIL]: { data: RestaurantForCustomer };
  [ROUTE_FOOD_DETAIL]: { data: Food, restaurant: RestaurantForCustomer },
  [ROUTE_AUTHENTICATED_NAVIGATOR]: undefined,
  [ROUTE_LOCATION]: {type: LocationPickType}
};

const Stack = createStackNavigator<StackParamList>();

export const StackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name={ROUTE_TAB_NAVIGATOR}
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE_PRODUCT_DETAIL}
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE_FOOD_DETAIL}
          component={FoodDetailScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={ROUTE_AUTHENTICATED_NAVIGATOR}
          component={AuthenticatedStackNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE_LOCATION}
          component={LocationPickerScreen}
          options={{title: 'Choose Location', headerLeft: ({onPress}) => <Back onPress={onPress}/>}}
        />
    </Stack.Navigator>
  );
};

export default StackNavigator;
