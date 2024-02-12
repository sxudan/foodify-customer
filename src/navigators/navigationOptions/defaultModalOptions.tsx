import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import Close from '../../components/navigation/Close';
import defaultStackOptions from './defaultStackOptions';

const defaultModalOptions: StackNavigationOptions = {
  ...defaultStackOptions,
  headerLeft: ({onPress}) => <Close onPress={onPress} />,
};

export default defaultModalOptions;
