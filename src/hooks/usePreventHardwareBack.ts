import {useEffect} from 'react';
import {BackHandler} from 'react-native';

function usePreventHardwareBack(): void {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
}

export default usePreventHardwareBack;
