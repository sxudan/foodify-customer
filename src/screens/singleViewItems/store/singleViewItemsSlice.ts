import {createSlice} from '@reduxjs/toolkit';
import {SingleViewItemsState} from './singleViewItemsTypes';

const initialState: SingleViewItemsState = {
  seenValueSlides: false,
};

export const singleViewItemsSlice = createSlice({
  name: 'singleViewItems',
  initialState,
  reducers: {
    valueSlidesSeen: state => {
      state.seenValueSlides = true;
    },
  },
});

export const {valueSlidesSeen} = singleViewItemsSlice.actions;

export default singleViewItemsSlice.reducer;
