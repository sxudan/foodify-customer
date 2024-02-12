import Geolocation, { GeolocationError } from '@react-native-community/geolocation';
import { getAddressFromCoordinates } from '@utils/geoUtils';
import { useCallback, useEffect, useState } from 'react';
import { UserLocation } from '../screens/preference/store/preferenceTypes';
import { LocationPickType } from '../screens/location/containers/LocationPicker';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Platform } from 'react-native';

// autorequest is set enabled 
const useLocation = (autorequest = true) => {
    const [error, setError] = useState<string | null>();
    // const dispatch = useAppDispatch()
    // const { currentLocation, deliveryLocation } = useAppSelector(selectPreferences);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<UserLocation | undefined>(undefined);


    const getCurrentLocation = useCallback(() => {
        Geolocation.getCurrentPosition(async (position) => {
            const result: string = await getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
            const addressResult = result.split(',')[0].trim();
            const userLocation: UserLocation = {
                addressString: addressResult,
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                label: LocationPickType.CURRENT,
            };
            setLocation(userLocation);
            setError(undefined);
        }, (error) => {
            setError(error.message);
        }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }, []);

    useEffect(() => {
        if (error) {
            setLoading(false);
        }
        if (location) {
            setLoading(false);
        }
    },[error, location]);

    const requestLocationPermission = useCallback(async () => {
        try {
          const permissionStatus = await request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );

          if (permissionStatus === RESULTS.GRANTED) {
            // Permission granted after request
            getCurrentLocation();
          } else {
            // Permission denied
            console.warn('Location permission denied');
            setError('Location permission denied');
          }
        } catch (error) {
        //   console.error('Error requesting location permission:', error);
          setError('Error requesting location permission');
        }
      }, [getCurrentLocation]);


    const checkLocationPermission = useCallback(async () => {
        setLoading(true);
        try {
          const permissionStatus = await check(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );

          if (permissionStatus === RESULTS.GRANTED) {
            // Permission already granted
            getCurrentLocation();
          } else {
            // Permission not granted, request it
            requestLocationPermission();
          }
        } catch (error) {
          console.error('Error checking location permission:', error);
          setError('Error checking location permission');
        }
      }, [getCurrentLocation, requestLocationPermission]);


      useEffect(() => {
        if (autorequest) {
            checkLocationPermission();
        }
      }, [autorequest, checkLocationPermission]);



      return { location, error, loading, checkLocationPermission };
};

export default useLocation;
