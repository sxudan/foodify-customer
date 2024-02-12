import {AuthenticationStackParamList} from '@navigators/AuthenticationNavigator';
import {ROUTE_LOGIN, ROUTE_SIGNUP} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '../../../store';
import {loggedIn} from '../store/authSlice';
import BlockButton from '@components/BlockButton';
import ItemSeparator from '@components/ItemSeparator';
import theme from '@utils/theme';
import {Formik} from 'formik';
import { useLoginMutation } from '../../../graphql/generated';

type LoginScreenRouteProp = RouteProp<
  AuthenticationStackParamList,
  typeof ROUTE_LOGIN
>;
type LoginScreenNavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  typeof ROUTE_LOGIN
>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [login, {loading}] = useLoginMutation();

  const handleSubmit = useCallback(async (value: {email: string, password: string}) => {
    const response = await login({
      variables: {
        email: value.email,
        password: value.password,
        type: '1'
      }
    })
    const data = response.data?.login;

    dispatch(loggedIn({
      token: data?.token,
      user: {
        userId: data?.userId,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
      },
    }))
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <Text style={styles.loginTitleText}>Login</Text>
            <ItemSeparator lineColor="#aaa" gap={6} />
            <Formik
              onSubmit={handleSubmit}
              initialValues={{email: '', password: ''}}
            >
              {({isSubmitting, values, handleSubmit, handleChange}) => (
                <>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize='none'
                      onChangeText={handleChange('email')}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      value={values.email}
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      style={styles.input}
                      // autoCapitalize={false}
                      onChangeText={handleChange('password')}
                      secureTextEntry={true}
                      textContentType="password"
                      value={values.password}
                    />
                  </View>
                  <ItemSeparator gap={22} />
                  <BlockButton onPress={handleSubmit} text="Login" />
                </>
              )}
            </Formik>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTE_SIGNUP);
              }}>
              <Text style={styles.registerText}>
                {"Don't have an account? Register Now"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  authBox: {
    width: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.colors.white,
  },

  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },

  input: {
    height: 40,
    backgroundColor: theme.colors.textfieldGrey,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },

  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
