import {loggedIn} from '../screens/auth/store/authSlice';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store';

const useAuthToken: () => [
  string | null,
  (token: string | null) => void,
] = () => {
  const dispatch = useAppDispatch();

  const authToken = useSelector<RootState, string | null>(
    state => state.auth.authToken,
  );

  const setAuthToken = useCallback(
    (token: string | null) => {
      if (token) {
        dispatch(loggedIn(token));
      }
    },
    [dispatch],
  );

  return [authToken, setAuthToken];
};

export default useAuthToken;
