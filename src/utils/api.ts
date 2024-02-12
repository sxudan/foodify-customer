import axios from 'axios';
import Config from 'react-native-config';
import {Store} from 'redux';
import {TOKEN_EXPIRED} from '../screens/auth/store/authTypes';

export const api = axios.create({
  baseURL: `${Config.API_BASE_URL}`,
});

export function configureAxios(store: Store) {
  api.interceptors.response.use(
    response => {
      return response;
    },
    function (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        store.dispatch({type: TOKEN_EXPIRED});
      }
      return Promise.reject(error);
    },
  );

  if (process.env.NODE_ENV === 'development') {
    api.interceptors.request.use(request => {
      console.debug('🚀 Starting network request: ', request);
      return request;
    });
  }
}
