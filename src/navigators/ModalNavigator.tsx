import {NavigatorScreenParams} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import ValueSlides from '../screens/auth/containers/ValueSlides';
import {useAppDispatch, useAppSelector} from '../store';
import {navigationRef} from '../utils/rootNavigation';
import AuthenticatedStackNavigator from './AuthenticatedStackNavigator';
import AuthenticationNavigator, {
  AuthenticationStackParamList,
} from './AuthenticationNavigator';
import defaultModalOptions from './navigationOptions/defaultModalOptions';
import splashTransitionOptions from './navigationOptions/splashTransitionOptions';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_AUTHENTICATION_NAVIGATOR,
  ROUTE_COUNTRY_CODE_SELECT,
  ROUTE_DASHBOARD,
  ROUTE_LANDING,
  ROUTE_MAIN_NAVIGATOR,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_SPLASH,
  ROUTE_VALUE_SLIDES,
} from './routeNames';
import useAuthToken from '@hooks/useAuthToken';
import useSplashScreenStatus from '@hooks/useSplashScreenStatus';
import useStoreAndNavigationResetOnLogout from '@hooks/useStoreAndNavigationResetOnLogout';
import usePrevious from '@hooks/usePrevious';
import DashboardScreen from '../screens/dashboard/containers/DashboardScreen';
import ProductDetailScreen from '../screens/dashboard/containers/ProductDetailScreen';
import { RestaurantForCustomer } from '../graphql/generated';
import StackNavigator from './StackNavigator';
import useLocation from '@hooks/useLocation';
import { selectPreferences, setCurrentLocation, setDeliveryLocation } from '../screens/preference/store/preferenceSlice';
import { Alert } from 'react-native';

export type ModalNavigatorParamList = {
  [ROUTE_SPLASH]: undefined;
  [ROUTE_MAIN_NAVIGATOR]: undefined;
  [ROUTE_AUTHENTICATION_NAVIGATOR]: undefined,
};

const ModalStack = createStackNavigator<ModalNavigatorParamList>();

const ModalNavigator: FC = () => {
  // useStoreAndNavigationResetOnLogout();
  // const [splashActive] = useSplashScreenStatus();

  // const [authToken] = useAuthToken();
  // const valueSlidesSeen = useAppSelector(
  //   state => state.singleViewItems.seenValueSlides,
  // );
  // const previousAuthToken = usePrevious(authToken);
  const dispatch = useAppDispatch()
    const { deliveryLocation } = useAppSelector(selectPreferences);
  const {error, location} = useLocation();

  useEffect(() => {
    if (location) {
      dispatch(setCurrentLocation(location));
      if (!deliveryLocation) {
        dispatch(setDeliveryLocation(location));
      }
    }
  }, [deliveryLocation, dispatch, location]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error])

  return (
    <NavigationContainer ref={navigationRef}>
      <ModalStack.Navigator
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
        }}>

        <ModalStack.Screen
          name={ROUTE_MAIN_NAVIGATOR}
          component={StackNavigator}
        />
         <ModalStack.Screen
          name={ROUTE_AUTHENTICATION_NAVIGATOR}
          component={AuthenticationNavigator}
          options={{headerShown: false}}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer
  //     ref={navigationRef}
  //     onStateChange={Instabug.onStateChange}>
  //     <ModalStack.Navigator
  //       screenOptions={{
  //         presentation: 'modal',
  //         cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  //       }}>
  //       {splashActive && (
  //         <ModalStack.Screen
  //           name={ROUTE_SPLASH}
  //           component={Splash}
  //           options={splashTransitionOptions}
  //         />
  //       )}
  //       {authToken === null && (
  //         <>
  //           {!valueSlidesSeen && (
  //             <ModalStack.Screen
  //               name={ROUTE_VALUE_SLIDES}
  //               component={ValueSlides}
  //               options={splashTransitionOptions}
  //             />
  //           )}
  //           <ModalStack.Screen
  //             name={ROUTE_LANDING}
  //             component={Landing}
  //             options={{
  //               ...splashTransitionOptions,
  //               animationTypeForReplace:
  //                 previousAuthToken && !authToken ? 'pop' : 'push',
  //             }}
  //           />
  //         </>
  //       )}
  //       {authToken !== null && (
  //         <ModalStack.Screen
  //           name={ROUTE_AUTHENTICATED_NAVIGATOR}
  //           component={AuthenticatedStackNavigator}
  //           options={splashTransitionOptions}
  //         />
  //       )}
  //       <ModalStack.Screen
  //         name={ROUTE_AUTHENTICATION_NAVIGATOR}
  //         component={AuthenticationNavigator}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //       {/*
  //           General iOS style modals
  //       */}
  //       <ModalStack.Group
  //         screenOptions={{
  //           ...defaultModalOptions,
  //           cardStyleInterpolator:
  //             CardStyleInterpolators.forModalPresentationIOS,
  //         }}>
  //         <ModalStack.Screen
  //           name={ROUTE_COUNTRY_CODE_SELECT}
  //           component={CountryCodeSelectScreen}
  //           options={{title: 'COUNTRY / REGION'}}
  //         />
  //       </ModalStack.Group>
  //     </ModalStack.Navigator>
  //   </NavigationContainer>
  // );
};

export default ModalNavigator;
