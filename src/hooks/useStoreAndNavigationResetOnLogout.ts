import {useApolloClient} from '@apollo/client';
import {ROUTE_LANDING} from '@navigators/routeNames';
import {CommonActions} from '@react-navigation/core';
import * as RootNavigation from '../utils/rootNavigation';
import useAuthToken from './useAuthToken';
import usePrevious from './usePrevious';
import useUpdateEffect from './useUpdateEffect';

const useStoreAndNavigationResetOnLogout = () => {
  const [authToken] = useAuthToken();
  const previousAuthToken = usePrevious(authToken);
  const client = useApolloClient();

  useUpdateEffect(() => {
    const clearStore = async () => {
      await client?.clearStore();
    };

    if (previousAuthToken && !authToken) {
      RootNavigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ROUTE_LANDING}],
        }),
      );

      clearStore();
    }
  }, [previousAuthToken, authToken]);
};

export default useStoreAndNavigationResetOnLogout;
