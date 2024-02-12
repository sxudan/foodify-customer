import BlockButton from "@components/BlockButton";
import TextDefault from "@components/TextDefault";
import { TabParamList } from "@navigators/TabNavigator";
import { ROUTE_ACCOUNT_MENU } from "@navigators/routeNames";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store";
import { loggedOut, selectAuth } from "../../auth/store/authSlice";
import useAuthWall from "@hooks/useAuthWall";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@components/Title";
import theme from "@utils/theme";
import Tile from "@components/Tile";
import Icon from "react-native-vector-icons/Ionicons";


type AccountMenuScreenRouteProp = RouteProp<
  TabParamList,
  typeof ROUTE_ACCOUNT_MENU
>;
type AccountMenuScreenNavigationProp = StackNavigationProp<
  TabParamList,
  typeof ROUTE_ACCOUNT_MENU
>;

type Props = {
    navigation: AccountMenuScreenNavigationProp;
    route: AccountMenuScreenRouteProp;
}

const AccountMenuScreen: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(selectAuth);
    
    const authWall = useAuthWall();

    if (authWall) {
        return authWall;
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1, padding: 12, backgroundColor: 'white'}}>
                <Tile
                    gap={12}
                    leading={<Icon name="person-circle" size={55}/>}
                    body={<View>
                        <Title size={16} weight="600">{user?.name}</Title>
                        <Title size={12}>{user?.phone}</Title>
                        <Title size={12}>{user?.email}</Title>
                    </View>}
                    trailing={<Icon name="chevron-forward" size={24}/>}
                />
            </View>
            <View style={styles.flex}>
            <TouchableOpacity onPress={() => {
                dispatch(loggedOut())
            }}><Title size={16} color="red">Logout</Title></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 32
    }
})

export default AccountMenuScreen;