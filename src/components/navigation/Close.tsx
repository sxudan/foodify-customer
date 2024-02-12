import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import closeIcon from '../../../assets/images/modal-close-light.png';

export interface Props {
  onPress: (() => void) | undefined;
  color?: string;
  style?: ViewStyle;
}

const Close: FC<Props> = ({onPress, color, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.hitArea, style]}>
      <Image source={closeIcon} style={[styles.icon, {tintColor: color}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hitArea: {
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
});

export default Close;
