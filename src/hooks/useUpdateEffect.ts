import {DependencyList, useEffect, useRef} from 'react';
const useUpdateEffect = (
  callback: () => void,
  dependencies: DependencyList,
): void => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useUpdateEffect;
