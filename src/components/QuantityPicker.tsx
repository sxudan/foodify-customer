import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import TextDefault from "./TextDefault";
import theme from "@utils/theme";

type Props = {
    max?: number;
    min?: number;
    quantity: number;
    onPicked?: (quantity: number) => void
    size?: number
}

const QuantityPicker: FC<Props> = ({max = 10, min = 1, onPicked, quantity, size = 44}) => {

    // const [quantity, setQuantity] = useState(1);

    const onIncrease = useCallback(() => {
        if (quantity >= max) {
            return;
        }
        onPicked?.call(this, quantity + 1);
        // setQuantity(quantity + 1)
    }, [max, onPicked, quantity]);

    const onDecrease = useCallback(() => {
        if (quantity <= min) {
            return;
        }
        onPicked?.call(this, quantity - 1);
        // setQuantity(quantity - 1)
    }, [min, onPicked, quantity]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onDecrease}>
                <Icon name="remove-circle-outline" size={size} color={quantity == min ? theme.colors.lightGrey : theme.colors.black}/>
            </TouchableOpacity>
            <TextDefault H2 style={{width: size * 1.5, fontSize: size * 0.5, textAlign: 'center'}}>{quantity}</TextDefault>
            <TouchableOpacity onPress={onIncrease}>
                <Icon name="add-circle-outline" size={size} color={quantity == max ? theme.colors.lightGrey : theme.colors.black}/>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    }
})

export default QuantityPicker;