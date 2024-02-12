import {useCallback, useEffect, useState} from 'react';
import {Rationale} from 'react-native';
import Permissions, {
  Permission,
  PermissionStatus,
} from 'react-native-permissions';

const usePermissionStatus: (permission: Permission) => [
  PermissionStatus | undefined,
  {
    loading: boolean;
    check: () => Promise<PermissionStatus | undefined>;
    request: (rationale?: Rationale) => Promise<PermissionStatus>;
  },
] = permission => {
  const [checkingPermissionStatus, setCheckingPermissionStatus] =
    useState<boolean>(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  const checkPermission = useCallback(async () => {
    try {
      setCheckingPermissionStatus(true);
      const status = await Permissions.check(permission);

      setPermissionStatus(status);
      setCheckingPermissionStatus(false);

      return status;
    } catch (err) {
      console.error(err);
      setCheckingPermissionStatus(false);
    }
  }, [permission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const requestPermission = useCallback(
    async (rationale?: Rationale) => {
      const status = await Permissions.request(permission, rationale);

      setPermissionStatus(status);

      return status;
    },
    [permission],
  );

  return [
    permissionStatus,
    {
      loading: checkingPermissionStatus,
      check: checkPermission,
      request: requestPermission,
    },
  ];
};

export default usePermissionStatus;
