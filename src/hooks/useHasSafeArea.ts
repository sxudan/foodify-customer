import {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Checks insets via useSafeAreaInsets and return
 * true if bottom insets are greater than 0
 */
const useHasSafeArea = () => {
  const insets = useSafeAreaInsets();

  const hasSafeArea = useMemo(() => insets.bottom > 0, [insets.bottom]);

  return hasSafeArea;
};

export default useHasSafeArea;
