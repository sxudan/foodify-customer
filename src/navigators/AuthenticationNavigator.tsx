// navigation
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import slideStackOptions from './navigationOptions/slideStackOptions';
// utils
import {
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from './routeNames';
import LoginScreen from '../screens/auth/containers/LoginPage';
import Close from '@components/navigation/Close';
import SignupScreen from '../screens/auth/containers/SignupPage';
import Back from '@components/navigation/Back';
import { useAppSelector } from '../store';
import { selectAuth } from '../screens/auth/store/authSlice';
import { useNavigation } from '@react-navigation/native';

export type AuthenticationStackParamList = {
  [ROUTE_LOGIN]: undefined,
  [ROUTE_SIGNUP]: undefined,
  
};

const Stack = createStackNavigator<AuthenticationStackParamList>();

const AuthenticationNavigator: FC = () => {

  const { authToken } = useAppSelector(selectAuth);
  const navigation = useNavigation();

  useEffect(() => {
    if (authToken) {
      navigation.goBack();
    }
  }, [authToken, navigation])

  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_LOGIN}
        component={LoginScreen}
        options={{
          ...slideStackOptions,
          title: '',
          headerLeft: ({onPress}) => <Close onPress={onPress} />
        }}
      />
      <Stack.Screen
        name={ROUTE_SIGNUP}
        component={SignupScreen}
        options={{
          ...slideStackOptions,
          title: '',
          headerLeft: ({onPress}) => <Back onPress={onPress} />
        }}
      />
      {/* <Stack.Screen
        name={ROUTE_AUTHENTICATION_VERIFICATION_CODE}
        component={AuthenticationVerificationCode}
        options={{...slideStackOptions, title: ''}}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
