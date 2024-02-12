import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import Back from '../../components/navigation/Back';

const defaultStackOptions: StackNavigationOptions = {
  headerTintColor: '#000',
  headerBackTitleVisible: false,
  headerLeft: ({onPress}) => <Back onPress={onPress} />,
  headerTitleStyle: {
    fontSize: 20,
    color: '#000',
  },
  headerStyle: {
    backgroundColor: '#FFF',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleAlign: 'center',
};

export default defaultStackOptions;
