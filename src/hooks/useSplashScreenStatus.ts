import {SPLASH_ANIM_RUNTIME_MS} from '@utils/constants';
import {useEffect, useState} from 'react';
import usePrevious from './usePrevious';

const useSplashScreenStatus: () => [
  splashActive: boolean,
  wasActive: boolean | undefined,
] = () => {
  const [splashActive, setSplashActive] = useState(true);
  const previousSplashActive = usePrevious(splashActive);

  /*
    Skip the splash screen animation if running dev builds
    to preserve the developers sanity
  */
  useEffect(() => {
    setTimeout(
      () => {
        setSplashActive(false);
      },
      __DEV__ ? 250 : SPLASH_ANIM_RUNTIME_MS,
    );
  }, []);

  return [splashActive, previousSplashActive];
};

export default useSplashScreenStatus;
