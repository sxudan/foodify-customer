import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_CHECKOUT,
  ROUTE_FOOD_DETAIL,
  ROUTE_PRODUCT_DETAIL,
} from '@navigators/routeNames';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList, SectionList, StyleSheet, View} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import {StackParamList} from '@navigators/StackNavigator';
import theme from '@utils/theme';
import {Food, useRestaurantQuery} from '../../../graphql/generated';
import ListEmptyState from '@components/ListEmptyState';
import ItemSeparator from '@components/ItemSeparator';
import {
  ScrollView,
} from 'react-native-gesture-handler';
import {useConfigurationData} from '../../../configuration';
import FoodCard from '../components/FoodCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../../../store';
import {selectCart} from '../../cart/store/cartSlice';
import CartScreen from '../../cart/container/CartScreen';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import RenderHeader from '@components/RenderHeader';
import BlockButton from '@components/BlockButton';
import Title from '@components/Title';
import Tile from '@components/Tile';
import TileButton from '@components/TileButton';

type DashboardScreenRouteProp = RouteProp<
  StackParamList,
  typeof ROUTE_PRODUCT_DETAIL
>;
type DashboardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  typeof ROUTE_PRODUCT_DETAIL
>;

interface Props {
  navigation: DashboardScreenNavigationProp;
  route: DashboardScreenRouteProp;
}

const ProductDetailScreen: FC<Props> = ({route, navigation}) => {
  const {data} = useRestaurantQuery({
    variables: {
      id: route.params.data!._id,
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const insets = useSafeAreaInsets();
  const configuration = useConfigurationData();

  const restaurant = useMemo(() => data?.restaurant, [data]);

  const categories = useMemo(() => {
    if (restaurant && restaurant.categories) {
      const c = restaurant.categories;
      return c.filter(x => (x?.foods?.length ?? 0) > 0)
    } else {
      return []
    }
  }, [restaurant])

  const {cartItems} = useAppSelector(selectCart);

  const overallQty = useMemo(() => cartItems.map(item => item.quantity).reduce((a,b) => a + b, 0), [cartItems]);

  const [selectedCategoryId, setSelectedCategory] = useState('');

  const isActiveCategory = (id: string) => {
    return selectedCategoryId === id;
  };

  const sectionListRef = useRef<SectionList>(null);

  useEffect(() => {
    if (
      categories.length > 0
    ) {
      if (categories[0]?._id) {
        setSelectedCategory(categories[0]?._id);
      }
    }
  }, [categories, restaurant]);

  const onBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onOpenCart = () => {
    bottomSheetModalRef.current?.present();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '',
      headerLeft: props => (
        <Icon
          name="chevron-back-outline"
          size={32}
          color={'black'}
          onPress={onBack}
        />
      ),
    });
  }, [navigation, onBack]);

  if (restaurant === undefined) {
    return <></>;
  }

  const RenderSectionList = () => {
    // const allDeals =
    //   categories.filter(cat => cat?.foods?.length) ?? [];
    if (categories.length === 0) {
      return <ListEmptyState text={'No data'} />;
    }
    const deals = categories.map((c, index) => ({
      ...c,
      data: c!.foods! as Food[],
      index,
    }));

    return (
      <SectionList
        ref={sectionListRef}
        scrollEnabled={false}
        sections={deals}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexGrow: 1,
          zIndex: -1,
          //   paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
          //   marginTop: HEADER_MIN_HEIGHT,
        }}
        // Important
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingBottom: 0,
        }}
        scrollEventThrottle={1}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <ItemSeparator />}
        SectionSeparatorComponent={props => {
          if (!props.leadingItem) {
            return null;
          }
          return (
            <ItemSeparator
              lineColor={theme.colors.lightGrey}
              style={{height: 32}}
            />
          );
        }}
        renderSectionHeader={({section: {title}}) => {
          return <Title size={theme.fonts.titleSize}>{title}</Title>;
        }}
        renderItem={({item, index}) => (
          <FoodCard
            item={item}
            onPress={item => {
              navigation.push(ROUTE_FOOD_DETAIL, {
                data: item,
                restaurant: restaurant,
              });
            }}
          />
        )}
      />
    );
  };

  // Builds the details section of the page
  const RenderDetails = () => {
    return (
      <>
        <Title size={theme.fonts.titleSize} weight={theme.fonts.titleWeight}>
          {restaurant?.name}
        </Title>
        <ItemSeparator gap={4} />
        <Tile
          gap={4}
          leading={<Icon name="location" size={18} />}
          body={
            <Title
              size={theme.fonts.textTitleSize}
              weight={theme.fonts.subTextTitleSize}>
              {restaurant?.address}
            </Title>
          }
        />
        <ItemSeparator gap={4} />
        <Title
          size={theme.fonts.subTextTitleSize}
          weight={theme.fonts.subTextTitleSize}>
          {configuration?.currencySymbol ?? '-'}
          {restaurant?.minimumOrder ?? '-'} minimum order
        </Title>
        <ItemSeparator gap={4} />
        <Title
          size={theme.fonts.subTextTitleSize}
          weight={theme.fonts.subTextTitleSize}>
          Deliver in around {restaurant?.deliveryTime ?? '-'} min
        </Title>
        <ItemSeparator gap={4} />
      </>
    );
  };

  const scrollToSection = (index: number) => {
    if (sectionListRef.current != null) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: index,
        itemIndex: 0,
        viewOffset: -50,
        viewPosition: 0
      })
    } else {
      console.log('undefined')
    }
  }

  const RenderCategoriesSection = () => {
    return (
      <FlatList
        style={styles.categoryContainer}
        contentContainerStyle={{flexGrow: 1}}
        data={categories}
        horizontal={true}
        //   ListEmptyComponent={emptyView()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.categoryButtonContainer}>
            <BlockButton
              text={item?.title}
              buttonColor={
                isActiveCategory(item!._id!) ? 'black' : theme.colors.lightGrey
              }
              containerStyle={{paddingHorizontal: 8, height: 40, minWidth: 70}}
              textStyle={{fontSize: 13}}
              onPress={() => {
                setSelectedCategory(item!._id!);
                scrollToSection(index)
              }}
            />
            {/* <RectButton
              activeOpacity={0.05}
              style={styles.categoryButton}
              // rippleColor={currentTheme.rippleColor}
              // onPress={() => props.changeIndex(index)}
              // style={styles(currentTheme).headerContainer}
            >
              <View>
                <TextDefault center uppercase small>
                  {item?.title}
                </TextDefault>
              </View>
            </RectButton> */}
          </View>
        )}
      />
    );
  };

  return (
    <>
      <View style={styles.page}>
        <RenderHeader
          onBack={() => {
            navigation.pop();
          }}
        />
        <ScrollView style={{flex: 1}}>
          <ImageHeader url={restaurant?.image} restaurant={restaurant} onBack={onBack} />
          <View style={styles.container}>
            <RenderDetails />
            <ItemSeparator lineColor="#ccc" style={{marginBottom: 16}} />
            <RenderCategoriesSection />
            <ItemSeparator gap={16} />
            <RenderSectionList />
          </View>
        </ScrollView>
        {/* <View style={{flex: 1}} /> */}
        {cartItems.length > 0 && (
          <TileButton style={styles.viewCartContainer} onPress={() => {
            onOpenCart();
          }} text='View Cart' leadingText={cartItems.length == 0 ? undefined : `${overallQty}`} style={styles.viewCartContainer}/>
          // <View style={styles.viewCartContainer}>
          //   <TouchableOpacity
          //     style={styles.viewCart}
          //     onPress={() => {
          //       onOpenCart();
          //     }}>
          //     <TextDefault H4 bold textColor="white">
          //       View Cart
          //     </TextDefault>
          //     {/* <TextDefault bold style={{position: 'absolute', right: 16, color: 'white'}}>{configuration?.currencySymbol}{calculatePrice()}</TextDefault> */}
          //   </TouchableOpacity>
          // </View>
        )}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backgroundStyle={{borderTopColor: '#ccc', borderWidth: 1}}
        snapPoints={['50%']}>
        <CartScreen
          onCheckoutPress={() => {
            bottomSheetModalRef?.current?.close();
            navigation.push(ROUTE_AUTHENTICATED_NAVIGATOR, {
              screen: ROUTE_CHECKOUT,
            });
          }}
        />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    width: '100%',
  },
  categoryButtonContainer: {
    paddingHorizontal: 8,
    height: 75,
  },
  categoryContainer: {
    height: 55,
  },
  container: {
    padding: 16,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 99,
  },
  page: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  viewCart: {
    backgroundColor: theme.colors.primaryButton,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  viewCartContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 4,
  },
});

export default ProductDetailScreen;
