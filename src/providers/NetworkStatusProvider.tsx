import NetInfo from '@react-native-community/netinfo';
import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const NetworkStatusContext = React.createContext(true);

const NetworkStatusProvider: FC<Props> = ({children}) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      state?.isConnected && state?.isInternetReachable
        ? setIsOnline(true)
        : setIsOnline(false);
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <NetworkStatusContext.Provider value={isOnline}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export default NetworkStatusProvider;

export const useOnlineStatus = () => {
  return useContext(NetworkStatusContext);
};
