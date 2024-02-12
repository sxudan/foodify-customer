import {useStatusBar} from '@hooks/useStatusBar';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '@utils/theme';
import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import BlockButton from '../../../components/BlockButton';
import {ModalNavigatorParamList} from '../../../navigators/ModalNavigator';
import {
  ROUTE_AUTHENTICATION_NAVIGATOR,
  ROUTE_LANDING,
} from '../../../navigators/routeNames';

type LandingRouteProp = RouteProp<
  ModalNavigatorParamList,
  typeof ROUTE_LANDING
>;
type LandingNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  typeof ROUTE_LANDING
>;

interface Props {
  navigation: LandingNavigationProp;
  route: LandingRouteProp;
}

const Landing: FC<Props> = ({navigation}) => {
  useStatusBar('dark-content', theme.colors.white);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Landing</Text>
      <BlockButton
        text="Login"
        onPress={() => navigation.navigate(ROUTE_AUTHENTICATION_NAVIGATOR)}
      />
      {/* <BlockButton text='Login' onPress={() => dispatch({ type: LOGIN, payload: { authToken: '1' } })} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 50,
  },
});

export default Landing;
