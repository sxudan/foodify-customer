import {StackParamList} from '@navigators/StackNavigator';
import {ROUTE_FOOD_DETAIL} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import RenderHeader from '@components/RenderHeader';
import {useConfigurationData} from '../../../configuration';
import {
  Addon,
  Food,
  Option,
  OrderInput,
  Variation,
} from '../../../graphql/generated';
import {ScrollView} from 'react-native-gesture-handler';
import OptionPicker, {OptionPickerData} from '../components/OptionPicker';
import theme from '@utils/theme';
import QuantityPicker from '@components/QuantityPicker';
import {CartItem, SelectedVariation} from '../../cart/store/cartTypes';
import {useAppDispatch} from '../../../store';
import {addCart} from '../../cart/store/cartSlice';
import {calculatePrice} from '@utils/calculatePrice';
import TileButton from '@components/TileButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Title from '@components/Title';
import ItemSeparator from '@components/ItemSeparator';
import {addAlpha} from '@utils/helpers';

type FoodDetailScreenRouteProp = RouteProp<
  StackParamList,
  typeof ROUTE_FOOD_DETAIL
>;
type FoodDetailScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof ROUTE_FOOD_DETAIL
>;

interface Props {
  navigation: FoodDetailScreenNavigationProp;
  route: FoodDetailScreenRouteProp;
}

const FoodDetailScreen: FC<Props> = ({navigation, route}) => {
  const [food, setFood] = useState(route.params?.data);
  const configuration = useConfigurationData();

  const restaurant = useMemo(() => route.params.restaurant, []);

  const variations = useMemo(
    () => food.variations?.map(v => v as Variation) ?? [],
    [food],
  );

  const [availableAddons, setAvailableAddons] = useState<Addon[]>([]);
  // const [availableOptions, setAvailableOptions] = useState<Option[]>([]);
  const dispatch = useAppDispatch();

  const [selectedData, setSelectedData] = useState<CartItem>({
    selectedVariation: undefined,
    // selectedAddon: undefined,
    // selectedOption: [],
    food: food,
    quantity: 1,
    timestamp: 0, // timestamp is added at reducer
  });

  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: Option[]
  }>({})

  const RenderVariation = useCallback(() => {
    const v: OptionPickerData[] = variations.map(variation => ({
      id: variation._id!,
      name: variation.title!,
      price: `  (${configuration!.currencySymbol}${variation.price})`,
    }));
    /// filter the selection and pass it to the option picker as current selection
    const s = v.filter(x => x.id == selectedData.selectedVariation?._id)[0];
    return (
      <OptionPicker
        selected={s}
        title={'Choose type'}
        data={v}
        onSelect={item => {
          const selected = variations.filter(
            f => f._id == item?.id,
          )[0] as SelectedVariation;
          setSelectedData({
            ...selectedData,
            selectedVariation: {...selected, addons: []},
          });
          setSelectedAddons({})
          if (selected) {
            const addons = selected.addons?.map(a => a as Addon) ?? [];
            setAvailableAddons(addons);
          } else {
            setAvailableAddons([]);
          }
        }}
      />
    );
  }, [configuration, selectedData, variations]);

  const selectedAddonIndex = useCallback(
    (addonId: string) => {
      return selectedData.selectedVariation?.addons?.findIndex(
        a => a?._id === addonId,
      );
    },
    [selectedData.selectedVariation?.addons],
  );

  const getCurrentSelectedOptions = useCallback(
    (options: OptionPickerData[], addonId: string) => {
      let selected: OptionPickerData[] = [];
      if (selectedData.selectedVariation) {
        const index = selectedAddonIndex(addonId);
        console.log('index', index, selectedData.selectedVariation?.addons, addonId)
        if (index && index > -1) {
          const selectedAddon = {...selectedData.selectedVariation.addons[index]};
          selected = options.filter(x =>
            selectedAddon.options?.filter(o => o._id == x.id),
          );
        } else {
            selected = []
        }
      }
      return selected;
    },
    [selectedAddonIndex, selectedData.selectedVariation],
  );

    // keyval to cartItems
  const update = useCallback((keyval: {[key: string]: Option[]}) => {
    const addonIds = Object.keys(keyval);
    const currentVariation = variations.filter(f => f._id === selectedData.selectedVariation?._id)[0]
    if (currentVariation && currentVariation.addons && (currentVariation.addons?.length ?? 0) > 0) {
        const addons = currentVariation.addons.filter(f => !!f) as Addon[]
        const _addon = addonIds.map(id => addons.filter(addon => addon._id == id)).flat().map(a => ({...a,options: keyval[a._id]}))
        setSelectedData({...selectedData, selectedVariation: {...selectedData.selectedVariation, addons: _addon}})
    }
  }, [selectedData, variations])

//   useEffect(() => {
    // const addonIds = Object.keys(selectedAddons);
    // const currentVariation = variations.filter(f => f._id === selectedData.selectedVariation?._id)[0]
    // if (currentVariation && currentVariation.addons && (currentVariation.addons?.length ?? 0) > 0) {
    //     const addons = currentVariation.addons.filter(f => !!f) as Addon[]
    //     const _addon = addonIds.map(id => addons.filter(addon => addon._id == id)).flat().map(a => ({...a,options: selectedAddons[a._id]}))
    //     setSelectedData({...selectedData, selectedVariation: {...selectedData.selectedVariation, addons: _addon}})
    // }

//   }, [selectedAddons, selectedData, selectedData.selectedVariation?._id, variations]);

  const RenderOptions: FC<{
    availableOptions: Option[];
    title: string;
    addon: Addon;
  }> = useCallback(
    ({availableOptions, title, addon}) => {
      const v: OptionPickerData[] = availableOptions.map(option => ({
        id: option._id!,
        name: `${option.title!}`,
        price: `  (${configuration!.currencySymbol}${option.price})`,
      }));

    const selectedOptionRaw = selectedAddons[addon._id] ?? []
    const selectedOptions: OptionPickerData[] = selectedOptionRaw.map((r) => {
        return {
            id: r._id,
            name: `${r.title!}`,
            price: `  (${configuration!.currencySymbol}${r.price})`
        }
    })
      return (
        <OptionPicker
          selected={selectedOptions[0]}
          multiselectedData={selectedOptions}
        //   multiselect={addon.quantityMinimum > 0}
            multiselect
          title={title}
          data={v}
          onMultiSelect={data => {
            const s: {[key: string]: Option[]} = {...(selectedAddons || {})}
            const raw = data.map(d => availableOptions.filter(f => f._id == d.id)).flat()
            s[addon._id] = raw
            setSelectedAddons(s)
            update(s)
          }}
          onSelect={data => {
            const s: {[key: string]: Option[]} = {...(selectedAddons || {})}
            if (data) {
                const raw = availableOptions.filter(o => o._id == data.id)
                s[addon._id] = raw;
            } else {
                s[addon._id] = [];
            }
            setSelectedAddons(s)
            update(s)
          }}
        />
      );
    },
    [configuration, selectedAddons, update],
  );

  const RenderAddon = useCallback(() => {
    // convert the available addons to the option type
    const v = availableAddons.map(addon => ({
      id: addon._id!,
      name: addon.title!,
      addon: addon,
    }));

    return v.map(data => {
      // const selected = availableAddons.filter(f => f._id == data.id)[0];
      const options = data.addon.options?.map(a => a as Option) ?? [];
      return (
        <RenderOptions
          addon={data.addon}
          title={data.name}
          availableOptions={options}
          key={data.id}
        />
      );
    });
  }, [RenderOptions, availableAddons]);

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <RenderHeader onBack={() => navigation.pop()} />
        <ScrollView style={{}}>
          <ImageHeader
            url={
              'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg'
            }
            height={300}
          />
          <View style={styles.container}>
            <View>
              <Title
                size={theme.fonts.titleSize}
                weight={theme.fonts.titleWeight}>
                {food.title}
              </Title>
              <ItemSeparator gap={4} />
              <Title size={theme.fonts.textTitleSize}>{food.description}</Title>
              {/* <TextDefault H2>{configuration?.currencySymbol ?? '-'}{food.variations[0]?.price}</TextDefault> */}
            </View>
            <ItemSeparator gap={16} />
            <RenderVariation />
            <RenderAddon />
            {/* <RenderOptions /> */}
            <QuantityPicker
              quantity={selectedData.quantity}
              onPicked={value => {
                setSelectedData({...selectedData, quantity: value});
              }}
            />
          </View>
        </ScrollView>
        <View style={{flex: 1}} />
        <TileButton
          onPress={() => {
            dispatch(
              addCart({
                item: selectedData,
                restaurant: restaurant,
              }),
            );
            navigation.pop();
          }}
          text="Add to Cart"
          buttonColor={theme.colors.primaryButton}
          trailingText={`${configuration?.currencySymbol}${calculatePrice(
            selectedData,
          )}`}
          style={styles.addToCartContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addToCartContainer: {
    paddingHorizontal: 24,
    marginBottom: 0,
    paddingTop: 4,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  foodDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
  },
});

export default FoodDetailScreen;
