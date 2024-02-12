import {ModalNavigatorParamList} from '@navigators/ModalNavigator';
import {
  ROUTE_DASHBOARD,
  ROUTE_LOCATION,
  ROUTE_PRODUCT_DETAIL,
} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useEffect} from 'react';
import {FC} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ProductItem from '../components/ProductItem';
import ItemSeparator from '@components/ItemSeparator';
import {
  RestaurantForCustomer,
  useRestaurantsQuery,
} from '../../../graphql/generated';
import {StackParamList} from '@navigators/StackNavigator';
import {TabParamList} from '@navigators/TabNavigator';
import theme from '@utils/theme';
import SearchBar from '@components/SearchBar';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import Title from '@components/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationPickType} from '../../location/containers/LocationPicker';
import {useAppSelector} from '../../../store';
import {selectPreferences} from '../../preference/store/preferenceSlice';

type DashboardScreenRouteProp = RouteProp<TabParamList, typeof ROUTE_DASHBOARD>;
type DashboardScreenNavigationProp = StackNavigationProp<
  TabParamList,
  typeof ROUTE_DASHBOARD
>;

interface Props {
  navigation: DashboardScreenNavigationProp;
  route: DashboardScreenRouteProp;
}

const DashboardScreen: FC<Props> = ({navigation, route}) => {
  const {data} = useRestaurantsQuery();
  const {currentLocation} = useAppSelector(selectPreferences);

  useEffect(() => {
    console.log(data?.nearByRestaurants?.sections);
  }, [data]);

  function onChangeAddress() {
    navigation.push(ROUTE_LOCATION, {type: LocationPickType.CURRENT});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressContainer}>
        <TouchableOpacity style={styles.row} onPress={onChangeAddress}>
          <Title size={16} weight="600">
            {currentLocation?.addressString || 'Pick the address'}
          </Title>
          <Icon name="chevron-down" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchbarContainer}>
        <SearchBar
          placeholder="Search Restaurants"
          style={{
            borderColor: 'transparent',
            backgroundColor: '#f6f6f6',
            borderRadius: 44,
          }}
        />
      </View>
      <ScrollView>
          <View style={{padding: 16}}>
          {data?.nearByRestaurants?.sections?.map(section => {
        return (
          <View key={section?._id}>
            <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>{section?.name}</Title>
            <ItemSeparator gap={8} />
            <FlatList
              horizontal
              data={section?.restaurants ?? []}
              keyExtractor={(k, i) => k?._id ?? `${i}`}
              renderItem={({item, index}) => {
                return (
                  <View style={{paddingRight: 24, width: 200}}>
                    <ProductItem
                item={item}
                key={index}
                onPress={item => {
                  navigation.push(ROUTE_PRODUCT_DETAIL, {data: item});
                }}
              />
                  </View>
                );
              }}
            />
          </View>
        );
      })}

      <ItemSeparator gap={16} />
      <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>Nearby Restaurants</Title>
      <ItemSeparator gap={8} />
      <FlatList
        scrollEnabled={false}
        data={data?.nearByRestaurants?.restaurants ?? []}
        keyExtractor={(d, i) => d?._id ?? `${i}`}
        ItemSeparatorComponent={() => (
          <ItemSeparator style={{height: 16, backgroundColor: 'white'}} />
        )}
        renderItem={({item, index}) => (
          <ProductItem
            item={item}
            key={index}
            onPress={item => {
              navigation.push(ROUTE_PRODUCT_DETAIL, {data: item});
            }}
          />
        )}
      />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  searchbarContainer: {
    paddingHorizontal: 16,
  },
});

export default DashboardScreen;
