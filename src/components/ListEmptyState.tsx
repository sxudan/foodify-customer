import theme from '@utils/theme';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import AppText from './AppText';

interface ListEmptyStateProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const ListEmptyState = ({text, style}: ListEmptyStateProps) => {
  return (
    <View style={[styles.container, style]}>
      <AppText color={theme.colors.black} style={styles.text}>
        {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.black,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  text: {
    fontFamily: theme.fonts.system,
    color: theme.colors.white,
  },
});

export default ListEmptyState;
