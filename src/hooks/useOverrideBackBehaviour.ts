import {
  EventArg,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Mutex} from 'async-mutex';
import React, {useMemo, useRef} from 'react';

export enum OverrideBackBehaviourAction {
  ALLOW_REMOVE,
  BLOCK_REMOVE,
  BLOCK_AND_ALLOW_NEXT_REMOVE, // This action should be used if you want to perform an alternative navigation action which will also remove this screen
}

/**
 * Overrides the default action when either the React Navigation header back button is pressed or the Android hardware back button is pressed.
 */
const useOverrideBackBehaviour: (
  onBack: () => OverrideBackBehaviourAction,
) => void = onBack => {
  const allowNextRemoveRef = useRef<boolean>(false);
  const mutex = useMemo(() => new Mutex(), []);

  const navigation = useNavigation();

  // Override back button for android
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = (
        e: EventArg<
          'beforeRemove',
          true,
          {
            action: Readonly<{
              type: string;
              payload?: object | undefined;
              source?: string | undefined;
              target?: string | undefined;
            }>;
          }
        >,
      ) => {
        e.preventDefault();

        mutex.runExclusive(() => {
          // Mutex is required to prevent infinite loop

          if (allowNextRemoveRef.current) {
            navigation.dispatch(e.data.action);

            return;
          }

          const action = onBack();

          switch (action) {
            case OverrideBackBehaviourAction.BLOCK_REMOVE: {
              break;
            }

            case OverrideBackBehaviourAction.BLOCK_AND_ALLOW_NEXT_REMOVE: {
              allowNextRemoveRef.current = true;

              break;
            }

            default:
            case OverrideBackBehaviourAction.ALLOW_REMOVE: {
              navigation.dispatch(e.data.action);
              break;
            }
          }
        });
      };

      navigation.addListener('beforeRemove', onBackPress);

      return () => navigation.removeListener('beforeRemove', onBackPress);
    }, [onBack, mutex, navigation]),
  );
};

export default useOverrideBackBehaviour;
