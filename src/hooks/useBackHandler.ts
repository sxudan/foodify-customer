import {useEffect} from 'react';
import {BackHandler} from 'react-native';

function useBackHandler(handler: () => boolean): void {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => BackHandler.removeEventListener('hardwareBackPress', handler);
  }, [handler]);
}

export default useBackHandler;
