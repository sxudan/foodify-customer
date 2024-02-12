import React, {FC, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const AppStateSideEffects: FC = () => {
  const appState = useRef(AppState.currentState);

  const accessToken = useSelector<RootState, string | null>(
    state => state.auth?.authToken,
  );

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible === 'active') {
      // Put active side-effects here
    }
  }, [appStateVisible, accessToken]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return <View />;
};

export default AppStateSideEffects;
