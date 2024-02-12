import TextDefault from '@components/TextDefault';
import {TabParamList} from '@navigators/TabNavigator';
import {
  ROUTE_AUTHENTICATION_NAVIGATOR,
  ROUTE_LOCATION,
  ROUTE_ORDERS,
} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../../store';
import {selectAuth} from '../../auth/store/authSlice';
import useAuthWall from '@hooks/useAuthWall';
import Title from '@components/Title';
import {StackParamList} from '@navigators/StackNavigator';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlockButton from '@components/BlockButton';
import { UserLocation } from '../../preference/store/preferenceTypes';
import { setCurrentLocation, setDeliveryLocation } from '../../preference/store/preferenceSlice';
import useLocation from '@hooks/useLocation';
import theme from '@utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';

type LocationScreenRouteProp = RouteProp<StackParamList, typeof ROUTE_LOCATION>;
type LocationScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof ROUTE_LOCATION
>;

type Props = {
  navigation: LocationScreenNavigationProp;
  route: LocationScreenRouteProp;
};

export enum LocationPickType {
    DELIVERY = 'Delivery',
    CURRENT = 'Current'
}

const LocationPickerScreen: FC<Props> = ({navigation, route}) => {

    const [type, setType] = useState(LocationPickType.CURRENT)
    const dispatch = useAppDispatch();
    const {location, loading, checkLocationPermission} = useLocation(false);


    useEffect(() => {
        if (route.params.type) {
            setType(route.params.type);
        }
    }, [route.params.type]);

    const onSelectCurrentLocation = useCallback((data: UserLocation) => {
      dispatch(setCurrentLocation(data));
      navigation.pop();
  }, [dispatch, navigation])

    const onSelectDeliveryLocation = useCallback((data: UserLocation) => {
      dispatch(setDeliveryLocation(data));
      navigation.pop();
  }, [dispatch, navigation])

    useEffect(() => {
      if (location) {
        const l = {...location, label: type};
        if (type == LocationPickType.CURRENT) {
            onSelectCurrentLocation(l);
        } else {
            onSelectDeliveryLocation(l);
        }
      }
    }, [location, onSelectCurrentLocation, onSelectDeliveryLocation, type])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}} edges={{bottom: 'additive'}}>
      {/* <ScrollView> */}
      <GooglePlacesAutocomplete
            placeholder="Enter your address"
            enablePoweredByContainer={false}
            fetchDetails
            debounce={100}
            listLoaderComponent={<ActivityIndicator />}
            onTimeout={() => console.log('timeout')}
            styles={{
              textInput:{margin: 12, backgroundColor: '#dfdfdf'},
            //   row: styles.rowStyles,
            //   listView: {backgroundColor: 'red', }
            }}
            onPress={(data, detail) => {
                if (!detail) {
                    console.log('Detail is null')
                    return;
                }
                const addressString = data.structured_formatting.main_text;
                const {lat, lng} = detail.geometry.location
                const obj: UserLocation = {
                    latitude: lat,
                    longitude: lng,
                    label: type,
                    addressString: addressString
                }
                if (type == LocationPickType.CURRENT) {
                    onSelectCurrentLocation(obj);
                } else {
                    onSelectDeliveryLocation(obj);
                }

            }}
            onFail={(error) => console.log(error)}
            query={{
              key: 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA',
              language: 'us',
            }}
            // onPress={onPressAddress}
            // textInputProps={{
            //   placeholderTextColor: theme.colors.gray['1'],
            // }}
          />
      {/* </ScrollView> */}

      <View style={{paddingHorizontal: 32}}>
        <BlockButton loading={loading} onPress={async () => {
            checkLocationPermission();
        }} text='Use current location' />
      </View>
    </SafeAreaView>
  );
};

export default LocationPickerScreen;
