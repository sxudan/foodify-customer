import { TabParamList } from "@navigators/TabNavigator";
import { ROUTE_ACCOUNT_MENU, ROUTE_DASHBOARD, ROUTE_ORDERS } from "@navigators/routeNames";
import React, { FC } from "react";
import Icon from "react-native-vector-icons/Ionicons";


const TabIcons  = {
    [ROUTE_DASHBOARD]: 'home-outline',
    [ROUTE_ACCOUNT_MENU]: 'person-circle-outline',
    [ROUTE_ORDERS]: 'restaurant-outline',
}

type Props = {
    size: number;
    color: string;
    focused: boolean;
    name: keyof TabParamList;
}

const TabbarIcon: FC<Props> = ({size, color, focused, name}) => {
    console.log(name)
    return <Icon name={TabIcons[name]} size={size} color={color} />;
}

export default TabbarIcon;