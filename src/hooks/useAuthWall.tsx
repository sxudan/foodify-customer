import {selectAuth} from '../screens/auth/store/authSlice';
import {useAppSelector} from '../store';
import BlockButton from '@components/BlockButton';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_AUTHENTICATION_NAVIGATOR} from '@navigators/routeNames';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '@utils/theme';
import ItemSeparator from '@components/ItemSeparator';

const useAuthWall = () => {
  const {authToken, user} = useAppSelector(selectAuth);
  const navigation = useNavigation();

  if (!authToken || !user) {
    return (
      <View style={styles.container}>
        <Icon name='pizza' size={70} color={'black'}/>
        <ItemSeparator gap={24}/>
        <BlockButton
          onPress={() => {
            navigation.navigate(ROUTE_AUTHENTICATION_NAVIGATOR);
            // eslint-disable-next-line react-native/no-inline-styles
          }}
          containerStyle={{width: 150}}
          text="Log in / Sign up"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.white
  },
});

export default useAuthWall;
