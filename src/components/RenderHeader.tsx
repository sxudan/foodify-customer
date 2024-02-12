import React, { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
    onBack?: () => void;
    color?: string
}

const RenderHeader = ({onBack, color = 'white'}: Props) => {
    const insets = useSafeAreaInsets();

    return (
      <View
        style={styles.header}>
        <View style={{marginTop: insets.top}}>
        <Icon
          name="chevron-back-outline"
          size={32}
          color={color}
          onPress={onBack}
        />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top:0,
        zIndex: 99,
      },
})

  export default RenderHeader;