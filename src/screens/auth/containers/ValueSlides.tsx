import {valueSlidesSeen} from '../../singleViewItems/store/singleViewItemsSlice';
import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import BlockButton from '../../../components/BlockButton';
import {useAppDispatch} from '../../../store';

const ValueSlides: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Value Slides</Text>
      <BlockButton
        text="Go to landing"
        onPress={async () => dispatch(valueSlidesSeen())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 50,
  },
});

export default ValueSlides;
