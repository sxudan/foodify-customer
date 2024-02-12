import {
  createNavigationContainerRef,
  NavigationAction,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const navigationRef = createNavigationContainerRef<any>();

export function navigate(
  routeName: string,
  params?: ParamListBase[typeof routeName],
): void {
  navigationRef.current?.navigate(routeName, params);
}

export function reset(state: NavigationState): void {
  navigationRef.current?.reset(state);
}

export function dispatch(action: NavigationAction): void {
  navigationRef.current?.dispatch(action);
}
