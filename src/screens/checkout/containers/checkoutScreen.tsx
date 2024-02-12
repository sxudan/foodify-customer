import BlockButton from '@components/BlockButton';
import ItemSeparator from '@components/ItemSeparator';
import TextDefault from '@components/TextDefault';
import {AuthenticatedStackParamList} from '@navigators/AuthenticatedStackNavigator';
import {ROUTE_CHECKOUT, ROUTE_LOCATION} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../../../store';
import {selectCart} from '../../cart/store/cartSlice';
import {useConfigurationData} from '../../../configuration';
import {calculatePrice} from '@utils/calculatePrice';
import Tile from '@components/Tile';
import Title from '@components/Title';
import theme from '@utils/theme';
import {selectPreferences} from '../../preference/store/preferenceSlice';
import useLocation from '@hooks/useLocation';
import {getAddressFromCoordinates} from '@utils/geoUtils';
import {LocationPickType} from '../../location/containers/LocationPicker';
// import Esewa, {eSewaOptions} from '../../../../../../react-native-esewa2/src/index';

type CheckoutScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  typeof ROUTE_CHECKOUT
>;
type CheckoutScreenNavigationProp = StackNavigationProp<
  AuthenticatedStackParamList,
  typeof ROUTE_CHECKOUT
>;

type Props = {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
};

const CheckoutScreen: FC<Props> = ({navigation}) => {
  const {cartItems, restaurant} = useAppSelector(selectCart);
  const configuration = useConfigurationData();
  const {deliveryLocation} = useAppSelector(selectPreferences);
  const [currentAddressString, setCurrentAddressString] = useState('');

  const [streetname, address] = useMemo(() => {
    const component = currentAddressString.split(',');
    if (component.length > 1) {
      const primary = component[0].trim();
      const secondary = component.splice(1).join(',').trim();
      return [primary, secondary];
    } else {
      return [currentAddressString, ''];
    }
  }, [currentAddressString]);

  useEffect(() => {
    if (deliveryLocation) {
      // console.log(deliveryLocation)
      getAddressFromCoordinates(
        deliveryLocation.latitude,
        deliveryLocation.longitude,
      ).then((value: string) => {
        setCurrentAddressString(value);
      });
    }
  }, [deliveryLocation]);

  const subtotal = useMemo(() => {
    const val = cartItems
      .map(item => calculatePrice(item))
      .reduce((a, b) => a + b, 0);
    return val;
  }, [cartItems]);

  const RenderAddressCard = () => {
    return (
      <View style={styles.card}>
        <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>
          Address
        </Title>
        <ItemSeparator gap={8} />
        <Tile
          leading={<Icon name="location" size={24} />}
          body={
            <View style={styles.addressDetailsContainer}>
              <Title
                size={theme.fonts.textTitleSize}
                weight={theme.fonts.textTitleWeight}>
                {streetname}
              </Title>
              <Title
                size={theme.fonts.subTextTitleSize}
                weight={theme.fonts.subTextTitleWeight}>
                {address}
              </Title>
            </View>
          }
          trailing={
            <BlockButton
              onPress={() => {
                navigation.navigate(ROUTE_LOCATION, {
                  type: LocationPickType.DELIVERY,
                });
              }}
              containerStyle={{width: 70, height: 44}}
              textStyle={{fontSize: 14}}
              text="Edit"
            />
          }
          gap={8}
        />
      </View>
    );
  };

  const RenderDeliveryOptionCard = () => {
    return (
      <View style={styles.card}>
        <View style={[styles.deliveryOption, styles.flex]}>
          <TextDefault style={{flex: 1}}>Delivery</TextDefault>
          <Icon name="checkmark-circle" size={18} />
        </View>
        <ItemSeparator lineColor="#ccc" />
        <View style={[styles.deliveryOption, styles.flex]}>
          <TextDefault style={{flex: 1}}>Pickup</TextDefault>
          <Icon name="" size={18} />
        </View>
      </View>
    );
  };

  const RenderOrderSummaryCard = () => {
    return (
      <View style={styles.card}>
        <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>
          Order Summary
        </Title>
        <View style={{marginVertical: 16}}>
          <Title size={16} weight="600">
            {restaurant?.name}
          </Title>
          <View style={styles.listContainer}>
            {cartItems.map((item, index) => (
              <>
                <Tile
                  key={index}
                  leading={
                    <View style={{width: 30}}>
                      <TextDefault>x{item.quantity}</TextDefault>
                    </View>
                  }
                  body={
                    <View>
                      <Title
                        size={theme.fonts.textTitleSize}
                        weight="500"
                        lineHeight={28}>
                        {item.food.title}({configuration?.currencySymbol}
                        {item.selectedVariation?.price})
                      </Title>
                      <View>
                        {item.selectedVariation?.addons.map(addon => {
                          return addon.options?.map(option => (
                            <Title
                              key={option._id}
                              size={theme.fonts.subTextTitleSize}>
                              {option.title}({configuration?.currencySymbol}
                              {option.price})
                            </Title>
                          ));
                        })}
                      </View>
                    </View>
                  }
                  trailing={
                    <Title size={theme.fonts.textTitleSize}>
                      {configuration?.currencySymbol}
                      {calculatePrice(item)}
                    </Title>
                  }
                />
                <ItemSeparator lineColor="#eee" gap={12} />
              </>
            ))}
          </View>
        </View>
        <View style={styles.flex}>
          <Title size={theme.fonts.textTitleSize}>Subtotal</Title>
          <View style={{flex: 1}} />
          <TextDefault>
            {configuration?.currencySymbol}
            {subtotal}
          </TextDefault>
        </View>
        <ItemSeparator gap={4} />
        <View style={styles.flex}>
          <Title size={theme.fonts.textTitleSize}>Delivery Charge</Title>
          <View style={{flex: 1}} />
          <TextDefault>
            {configuration?.currencySymbol}
            {configuration?.deliveryRate}
          </TextDefault>
        </View>
        <ItemSeparator lineColor="#eee" gap={8} />
        <View style={styles.flex}>
          <TextDefault H3 bold>
            Total
          </TextDefault>
          <View style={{flex: 1}} />
          <TextDefault H4 bold>
            {configuration?.currencySymbol}
            {(
              parseFloat(configuration?.deliveryRate ?? '0') + subtotal
            ).toFixed(2)}
          </TextDefault>
        </View>
      </View>
    );
  };

  const RenderPaymentOptionCard = () => {
    return (
      <View style={styles.card}>
        <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>
          Payment Option
        </Title>
        <View style={[{height: 50}, styles.flex]}>
          <Title size={theme.fonts.textTitleSize} style={{flex: 1}}>
            Cash on deliver
          </Title>
          <Icon name="checkmark-circle" size={18} />
        </View>
      </View>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <RenderAddressCard />
          <RenderDeliveryOptionCard />
          <RenderOrderSummaryCard />
          <RenderPaymentOptionCard />
          <ItemSeparator gap={75} />
          {/* <View style={{height: 150}} /> */}
        </View>
      </ScrollView>
      <BlockButton
        onPress={async () => {
          
        }}
        containerStyle={{position: 'absolute', bottom: 24, left: 16, right: 16}}
        text="Order"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  deliveryOption: {
    height: 44,
  },
  listContainer: {
    marginVertical: 16,
  },
});

export default CheckoutScreen;
