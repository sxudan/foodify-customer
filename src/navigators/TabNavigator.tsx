import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TextDefault from '@components/TextDefault';
import { ROUTE_ACCOUNT_MENU, ROUTE_DASHBOARD, ROUTE_ORDERS } from './routeNames';
import DashboardScreen from '../screens/dashboard/containers/DashboardScreen';
import React from 'react';
import TabbarIcon from './components/TabbarIcon';
import theme from '@utils/theme';
import AccountMenuScreen from '../screens/account/containers/AccountMenuScreen';
import OrdersScreen from '../screens/orders/containers/OrdersScreen';

export type TabParamList = {
    [ROUTE_DASHBOARD]: undefined,
    [ROUTE_ACCOUNT_MENU]: undefined,
    [ROUTE_ORDERS]: undefined,
};

const Tab = createBottomTabNavigator<TabParamList>();


export const TabNavigator = () => {
  return (
    // <TextDefault>Hello</TextDefault>
    <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size, focused}) => {
                    return <TabbarIcon color={color} size={size} name={route.name} focused={focused} />
                },
                tabBarActiveTintColor: theme.colors.black,
                tabBarInactiveTintColor: theme.colors.lightGrey
            })}
        >
      <Tab.Screen
        name={ROUTE_DASHBOARD}
        component={DashboardScreen}
        options={{title: 'Dashboard', headerShown: false}}
      />
      <Tab.Screen
        name={ROUTE_ORDERS}
        component={OrdersScreen}
        options={{title: 'My Orders'}}
      />
      <Tab.Screen
        name={ROUTE_ACCOUNT_MENU}
        component={AccountMenuScreen}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
}