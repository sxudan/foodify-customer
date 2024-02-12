import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import backIcon from '../../../assets/images/back-arrow-light.png';

export interface Props {
  onPress: (() => void) | undefined;
  color?: string;
  style?: ViewStyle;
}

const Back: FC<Props> = ({onPress, style, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.hitArea, style]}>
      <Image source={backIcon} style={[styles.icon, {tintColor: color}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hitArea: {
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
});

export default Back;
