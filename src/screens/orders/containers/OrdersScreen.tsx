import TextDefault from "@components/TextDefault";
import { TabParamList } from "@navigators/TabNavigator";
import { ROUTE_AUTHENTICATION_NAVIGATOR, ROUTE_ORDERS } from "@navigators/routeNames";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../../../store";
import { selectAuth } from "../../auth/store/authSlice";
import useAuthWall from "@hooks/useAuthWall";
import Title from "@components/Title";


type OrdersScreenRouteProp = RouteProp<
  TabParamList,
  typeof ROUTE_ORDERS
>;
type OrdersScreenNavigationProp = StackNavigationProp<
  TabParamList,
  typeof ROUTE_ORDERS
>;

type Props = {
    navigation: OrdersScreenNavigationProp;
    route: OrdersScreenRouteProp;
}

const OrdersScreen: FC<Props> = ({navigation}) => {

    const authwall = useAuthWall();
    if (authwall) {
      return authwall;
    }
    return (
        <View style={{backgroundColor: 'white',display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image width={300} height={300} source={{uri: 'https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png'}} />
          <Title size={16} weight="600">No Orders</Title>
        </View>
    )
}

export default OrdersScreen;
