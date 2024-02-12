import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
// import DashboardScreen from '../features/dashboard/containers/DashboardScreen';
import {ROUTE_CHECKOUT} from './routeNames';
import CheckoutScreen from '../screens/checkout/containers/checkoutScreen';
import RenderHeader from '@components/RenderHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthWall from '@hooks/useAuthWall';

export type AuthenticatedStackParamList = {
  [ROUTE_CHECKOUT]: undefined;
};

const Stack = createStackNavigator<AuthenticatedStackParamList>();

export const AuthenticatedStackNavigator: FC = () => {
  const authWall = useAuthWall();
 
  if (authWall) {
    return authWall;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_CHECKOUT}
        component={CheckoutScreen}
        options={{
          // headerShown: false,
          title: 'Checkout',
          headerLeft: ({onPress}) => <Icon
          name="chevron-back-outline"
          size={32}
          color={'black'}
          onPress={onPress}
        />
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStackNavigator;
