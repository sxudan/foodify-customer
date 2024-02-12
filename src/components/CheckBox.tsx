import theme from '@utils/theme';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

export interface CheckboxProps {
  selected: boolean | undefined;
  onSelected?: () => void;
  size?: number;
  disabled?: boolean;
  unselectedStrokeColor?: string;
  unselectedFillColor?: string;
  selectedFillColor?: string;
}

const DEFAULT_SIZE = 24;

const Checkbox: FC<CheckboxProps> = ({
  size = DEFAULT_SIZE,
  selected,
  onSelected,
  disabled,
  unselectedStrokeColor = theme.colors.black,
  unselectedFillColor = 'transparent',
  selectedFillColor = theme.colors.black,
}) => {
  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <TouchableOpacity
        onPress={onSelected}
        disabled={disabled}
        style={styles.container}>
        <Svg height={size} width={size}>
          <Rect
            x={1}
            y={1}
            rx={5}
            ry={5}
            height={size - 2}
            width={size - 2}
            fill={selected ? selectedFillColor : unselectedFillColor}
            stroke={selected ? 'transparent' : unselectedStrokeColor}
            strokeWidth={1.5}
          />
          {selected && (
            <Path
              d={
                'M17.6899 7.80416C18.1034 8.2097 18.1034 8.86722 17.6899 9.27276L10.6311 16.1958C10.2176 16.6014 9.54715 16.6014 9.13365 16.1958L6.31012 13.4266C5.89663 13.0211 5.89663 12.3635 6.31012 11.958C6.72362 11.5525 7.39403 11.5525 7.80752 11.958L9.88235 13.9929L16.1925 7.80416C16.606 7.39861 17.2764 7.39861 17.6899 7.80416Z'
              }
              fill={theme.colors.white}
              x={0}
              y={0}
              scale={size / DEFAULT_SIZE}
            />
          )}
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;
