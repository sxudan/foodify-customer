import React, { FC, useCallback } from 'react';
import {useAppDispatch, useAppSelector} from '../../../store';
import {clearCart, removeItem, selectCart, updateQty} from '../store/cartSlice';
import {FlatList} from 'react-native-gesture-handler';
import TextDefault from '@components/TextDefault';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import ItemSeparator from '@components/ItemSeparator';
import Icon from 'react-native-vector-icons/Ionicons';
import { calculatePrice } from '@utils/calculatePrice';
import { useConfigurationData } from '../../../configuration';
import QuantityPicker from '@components/QuantityPicker';
import BlockButton from '@components/BlockButton';
import { SCREEN_HEIGHT } from '@utils/constants';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_CHECKOUT } from '@navigators/routeNames';
import { CartItem } from '../store/cartTypes';
import Tile from '@components/Tile';
import Title from '@components/Title';
import theme from '@utils/theme';

type CartScreenProps = {
  onCheckoutPress?: () => void;
}

const CartScreen: FC<CartScreenProps> = ({onCheckoutPress}) => {
  const {cartItems} = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const configuration = useConfigurationData();
  

  const onDeleteAll = useCallback(() => {
    dispatch(clearCart());
  }, [])

  const handleQuantityChange = (item: CartItem, newQty: number) => {
    if (newQty === 0) {
      Alert.alert('Warning', 'Remove item from cart?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          dispatch(removeItem(item.timestamp))
        }},
      ]);
    } else {
      dispatch(updateQty({qty: newQty, timestamp: item.timestamp}));
    }
  }

  return (
    <>
      <View style={[styles.flex, {height: 30, paddingHorizontal: 16}]}>
        <Title size={18} weight={theme.fonts.titleWeight}>Selected Items</Title>
        <View style={{flex: 1}}/>
        <Icon name='trash-outline' onPress={onDeleteAll} size={24}/>
      </View>
      <ItemSeparator lineColor='#ccc' style={{paddingVertical: 8}}/>

      <ScrollView>
      <View style={[styles.container]}>
      {cartItems.map((item, index) => (
        <View key={index} style={[styles.flex, styles.listItem]}>
          <Tile
            leading={
              <View style={{width: 50}}>
                <Title size={theme.fonts.subTextTitleSize} weight='600'>x{item.quantity}</Title>
              </View>
            }
            body={
              <View>
                <Title size={theme.fonts.textTitleSize} weight={theme.fonts.textTitleWeight}>{item.food.title}</Title>
                <ItemSeparator gap={2}/>
                {
                item.selectedVariation?.addons.map(addon => {
                  return addon.options?.map((option) => (
                    <Title size={theme.fonts.subTextTitleSize} key={option._id}>{option.title}</Title>
                ))
                })
            }
              </View>
            }
            trailing={
              <QuantityPicker min={0} quantity={item.quantity} size={24} onPicked={(qty) => {
                handleQuantityChange(item, qty)
              }}/>
            }
          />
          {/* <TextDefault bold style={{width: 50}}>{item.quantity}x</TextDefault>
          <View>
            <TextDefault style={styles.foodTitle} bold>{item.food.title}</TextDefault>
            {
                item.selectedOption.map((option) => (
                    <TextDefault key={option._id}>{option.title}</TextDefault>
                ))
            }
            <TextDefault >{configuration?.currencySymbol}{calculatePrice(item)}</TextDefault>
          </View>
          <View style={{flex: 1}}/>
          <QuantityPicker min={0} quantity={item.quantity} size={24} onPicked={(qty) => {
            handleQuantityChange(item, qty)
          }}/> */}
        </View>
      ))}
      
    </View>
    </ScrollView>
    <View style={{flex: 1}}/>
      <BlockButton containerStyle={{marginBottom: 16, marginHorizontal: 16}} text='Checkout' onPress={() => {
        onCheckoutPress?.call(this);
      }}/>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodTitle: {
        fontSize: 16,
    },
    listItem: {
        height: 70
    },
})

export default CartScreen;
