import theme from '@utils/theme';
import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface ItemSeparatorProps {
  style?: StyleProp<ViewStyle>;
  lineColor?: string
  gap?: number
}

const ItemSeparator: FC<ItemSeparatorProps> = props => {
  const {style, lineColor, gap = 2} = props;

  return (
    <View style={[styles.container, style, {...gap ? {marginVertical: gap} : {}}]}>
      <View style={[styles.itemSeparator, {backgroundColor: lineColor ? lineColor : 'transparent'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.white,
    marginLeft: 4, marginRight: 4
  },
});

export default ItemSeparator;
