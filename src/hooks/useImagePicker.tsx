import {useCallback} from 'react';
import {
  Alert,
  Linking,
  Platform,
  PlatformAndroidStatic,
  Rationale,
} from 'react-native';
import ImageCropPicker, {Image, Options} from 'react-native-image-crop-picker';
import Permissions, {Permission} from 'react-native-permissions';

// Export refined type to avoid naming conflicts with react-native
export type ImagePickerResult = Image;

export const defaultPhotoOptions: Options = {
  mediaType: 'photo',
  width: 800,
  height: 800,
  compressImageQuality: 0.8,
  cropping: true,
  cropperActiveWidgetColor: 'white',
};

export const defaultCameraOptions: Options = {
  ...defaultPhotoOptions,
};

const mediaLibraryPermission = Platform.select({
  ios: Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
  android:
    Number((Platform as PlatformAndroidStatic).constants.Release) >= 13
      ? Permissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
}) as Permission;

const cameraPermission = Platform.select({
  ios: Permissions.PERMISSIONS.IOS.CAMERA,
  android: Permissions.PERMISSIONS.ANDROID.CAMERA,
}) as Permission;

const useImagePicker: (
  mediaPermissionRationale?: Rationale,
  cameraPermissionRationale?: Rationale,
) => {
  pickImage: (
    options?: Options,
  ) => Promise<ImagePickerResult | ImagePickerResult[] | undefined>;
  takePhoto: (options?: Options) => Promise<ImagePickerResult | undefined>;
} = (mediaPermssionRationale, cameraPermissionRationale) => {
  const checkPermission = useCallback(async (permission: Permission) => {
    try {
      return await Permissions.check(permission);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const requestPermission = useCallback(
    async (permission: Permission, rationale?: Rationale) => {
      try {
        return await Permissions.request(permission, rationale);
      } catch (err) {
        console.debug(err);
      }
    },
    [],
  );

  const pickImage = async (options?: Options) => {
    try {
      let permissionResult = await checkPermission(mediaLibraryPermission);

      if (permissionResult === Permissions.RESULTS.DENIED) {
        permissionResult = await requestPermission(
          mediaLibraryPermission,
          mediaPermssionRationale,
        );
      }

      if (permissionResult === Permissions.RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Denied',
          'Photo library access has been denied. Please update the permissions in Settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        throw new Error('Media library permission not granted');
      }

      const pickerResponse = await ImageCropPicker.openPicker(
        options ?? defaultPhotoOptions,
      );

      if (pickerResponse) {
        return pickerResponse;
      } else {
        return;
      }
    } catch (err) {
      console.debug(err);
    }
  };

  const takePhoto = async (options?: Options) => {
    try {
      let permissionResult = await checkPermission(cameraPermission);

      if (permissionResult === Permissions.RESULTS.DENIED) {
        permissionResult = await requestPermission(
          cameraPermission,
          cameraPermissionRationale,
        );
      }

      if (permissionResult === Permissions.RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Denied',
          'Camera access has been denied. Please update the permissions in Settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
          {cancelable: true},
        );

        throw new Error('Camera permission not granted');
      }

      const pickerResponse = await ImageCropPicker.openCamera(
        options ?? defaultCameraOptions,
      );

      if (pickerResponse) {
        return pickerResponse;
      } else {
        return;
      }
    } catch (err) {
      console.debug(err);
    }
  };

  return {pickImage, takePhoto};
};

export default useImagePicker;
