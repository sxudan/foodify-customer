import NetInfo from '@react-native-community/netinfo';
import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import { Configuration, ConfigurationQueryResult, useConfigurationQuery } from './graphql/generated';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const ConfigurationContext = React.createContext<Configuration | undefined>(undefined);

const ConfigurationProvider: FC<Props> = ({children}) => {
    const {data} = useConfigurationQuery();


  return (
    <ConfigurationContext.Provider value={data?.configuration}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;

export const useConfigurationData = () => {
  return useContext(ConfigurationContext);
};
