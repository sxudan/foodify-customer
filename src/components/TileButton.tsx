import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Tile from './Tile';
import React, {FC, ReactNode} from 'react';
import theme from '@utils/theme';
import Title from './Title';

type TileButtonProps = {
  buttonColor?: string;
  textColor?: string;
  leadingText?: string;
  text?: string;
  trailingText?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  textSize?: number
  bold?: boolean
  height?: number
};

const TileButton: FC<TileButtonProps> = ({
  text,
  leadingText,
  trailingText,
  textColor = 'white',
  buttonColor = 'black',
  onPress,
  style,
  borderRadius = 4,
  textSize = 16,
  bold = true,
  height = 54

}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: buttonColor, borderRadius: borderRadius, height},
        ]}
        onPress={onPress}>
        <Tile
          leading={
            <View style={[styles.info]}>
                { leadingText ? <View style={[styles.circle, {backgroundColor: textColor}]}><Title color={buttonColor} size={12}>{leadingText}</Title></View> : null}
          </View>
          }
          body={
            <View style={styles.body}>
              <Title size={textSize} color={textColor} weight={bold ? '600' : '400'}>{text}</Title>
            </View>
          }
          trailing={
            <View style={styles.info}>
            <Title color={textColor} size={12}>{trailingText}</Title>
          </View>
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 34,
    width: 26,
    height: 26,
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    width: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TileButton;
