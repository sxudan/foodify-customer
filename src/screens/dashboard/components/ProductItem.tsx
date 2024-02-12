import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Category, RestaurantForCustomer} from '../../../graphql/generated';
import Title from '@components/Title';
import ItemSeparator from '@components/ItemSeparator';
import theme from '@utils/theme';
import { useConfigurationData } from '../../../configuration';

type Props = {
  item: RestaurantForCustomer;
  onPress?: (item: RestaurantForCustomer) => void;
};
const ProductItem: FC<Props> = ({item, onPress}) => {

  const configuration = useConfigurationData()

  const renderImageHeader = () => {
    console.log(item.image)
    return (
      <View style={{height: 150}}>
        <Image
          source={{
            uri: item.image ?? ''
            // uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY2MTU3Ny13aWtpbWVkaWEtaW1hZ2Uta293YXBlZWouanBn.jpg',
          }}
          style={{flex: 1}}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{backgroundColor: 'white'}}
      delayPressIn={0}
      onPress={() => {
        onPress?.call(this, item);
      }}>
      {renderImageHeader()}
      <ItemSeparator gap={8}/>
      <Title size={theme.fonts.textTitleSizeBig} weight='16'>{item.name}</Title>
      <ItemSeparator gap={2}/>
      {
        item.categories && item.categories.length > 0 && <><Title size={13} color={theme.colors.lightGrey}>{(item.categories?.filter(c => !!c) as Category[]).map(c => c.title).join(', ')}</Title>
        <ItemSeparator gap={2}/></>
      }
      <View style={{display: 'flex', flexDirection: 'row',}}>
        <Title size={12} color={theme.colors.lightGrey}>Delivery from {configuration?.currencySymbol}{configuration?.deliveryRate}</Title>
        <View style={{flex: 1}} />
        <Title size={12} color={theme.colors.lightGrey}>{item.deliveryTime} min</Title>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ProductItem;
