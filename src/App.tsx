import {ApolloProvider} from '@apollo/client';
import React, {FC, ReactNode, useEffect} from 'react';
import {Platform, StyleSheet, Text, TextInput, UIManager} from 'react-native';
import Config from 'react-native-config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import client from './client';
import AppStateSideEffects from './screens/appState/AppStateSideEffects';
import ModalNavigator from './navigators/ModalNavigator';
import NetworkStatusProvider from './providers/NetworkStatusProvider';
import store, {persistor} from './store';
import {configureAxios} from './utils/api';
import {Configuration, useConfigurationQuery} from './graphql/generated';
import ConfigurationProvider from './configuration';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';


// Disable font scaling
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

const App: FC = () => {
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
});
  
  useEffect(() => {
    configureAxios(store);
  }, []);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <ConfigurationProvider>
              <NetworkStatusProvider>
                <BottomSheetModalProvider>
                  <ModalNavigator />
                  <AppStateSideEffects />
                </BottomSheetModalProvider>
              </NetworkStatusProvider>
            </ConfigurationProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
