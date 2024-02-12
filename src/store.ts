import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
// import createSensitiveStorage from 'redux-persist-sensitive-storage';
import authReducer from './screens/auth/store/authSlice';
import singleViewItemsReducer from './screens/singleViewItems/store/singleViewItemsSlice';
import cartReducer from './screens/cart/store/cartSlice';
import preferenceReducer from './screens/preference/store/preferenceSlice';

// const sensitiveStorage = createSensitiveStorage();

const mainPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  singleViewItems: persistReducer(mainPersistConfig, singleViewItemsReducer),
  cart: cartReducer,
  preference: preferenceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    if (__DEV__) {
      return middleware.concat(logger);
    } else {
      return middleware;
    }
  },
  // Turn off devtools in prod
  devTools: __DEV__,
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
