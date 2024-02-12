import React, {useContext} from 'react';
import {View, Dimensions, Text, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  BorderlessButton,
  FlatList,
  RectButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {RestaurantForCustomer} from '../../../graphql/generated';
import AppErrorLabel from '@components/AppError';
import AppText from '@components/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextDefault from '@components/TextDefault';
import ItemSeparator from '@components/ItemSeparator';
import { useConfigurationData } from '../../../configuration';

const {height} = Dimensions.get('screen');
const TOP_BAR_HEIGHT = height * 0.05;
const AnimatedBorderless = Animated.createAnimatedComponent(BorderlessButton);

type Props = {
  height?: number
  url?: string | null | undefined
};

function ImageHeader({height, url}: Props) {
// const config = useConfigurationData();
//   const EmptyView = () => {
//     return (
//       <View
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{
//           width: '100%',
//           height: 40,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <AppErrorLabel>
//           <AppText>No Items</AppText>
//         </AppErrorLabel>
//       </View>
//     );
//   };

//   const insets = useSafeAreaInsets();

  return (
    <Animated.View>
      <Animated.Image
        resizeMode='cover'
        source={{
          uri: url,
          // uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY2MTU3Ny13aWtpbWVkaWEtaW1hZ2Uta293YXBlZWouanBn.jpg',
        }}
        style={{
          height: height ?? 200,
        }}
      />
      <Animated.View
        style={{
          height: height ?? 200,
          opacity: 0.2,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: '#222'
        }}
      />
      {/* <View style={{position: 'absolute', top: insets.top, left: 0, right: 0}}>
        <Icon
          name="chevron-back-outline"
          size={32}
          color={'white'}
          onPress={onBack}
        />
      </View> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  
});

export default ImageHeader;
