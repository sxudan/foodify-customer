import TextDefault from '@components/TextDefault';
import {scale} from '@utils/textStyles';
import theme from '@utils/theme';
import React, {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Food, Variation} from '../../../graphql/generated';
import {FC} from 'react';
import {useConfigurationData} from '../../../configuration';
import Tile from '@components/Tile';
import Title from '@components/Title';
import ItemSeparator from '@components/ItemSeparator';

type Props = {
  item: Food;
  onPress: (item: Food) => void;
};

const FoodCard: FC<Props> = ({item, onPress}) => {
  const configuration = useConfigurationData();

  const variations = (item.variations?.filter(v => v !== undefined) ?? []).map(
    v => v as Variation,
  );

  return (
    <TouchableOpacity
      style={styles.dealSection}
      activeOpacity={0.7}
      onPress={() => {
        onPress?.call(this, item);
      }}
      // onPress={() =>
      //   onPressItem({
      //     ...item,
      //     restaurant: restaurant._id,
      //     restaurantName: restaurant.name,
      //   })
      // }
    >
      <Tile
        body={
          <View>
            <Title
              size={theme.fonts.textTitleSizeBig}
              lineHeight={24}
              weight={theme.fonts.textTitleWeight}>
              {item.title}
            </Title>
            <ItemSeparator gap={4} />
            {
              item.description && <>
                <Title size={theme.fonts.subTextTitleSize}>
              {item.description}
            </Title>
            <ItemSeparator gap={4} />
              </>
            }
            <View style={styles.flex}>
              {variations.map((variation, index) => (
                <Title
                  key={variation?._id}
                  size={theme.fonts.textTitleSize}
                  weight={theme.fonts.textTitleWeight}>
                  {configuration?.currencySymbol}
                  {variation?.price}
                  {variations.length - 1 > index && ' | '}
                </Title>
              ))}
            </View>
          </View>
        }
        trailing={
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: scale(60),
              width: scale(60),
              borderRadius: 30,
            }}
            source={{
              uri: 'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',
            }}
          />
        }
      />

      {/* {tagCart(item._id)} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dealSection: {
    position: 'relative',
    backgroundColor: theme.colors.white,
    // ...alignment.PLlarge,
    // ...alignment.PRxSmall,
    borderRadius: scale(25),
    paddingVertical: scale(10),
  },
  flex: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
});

export default FoodCard;
