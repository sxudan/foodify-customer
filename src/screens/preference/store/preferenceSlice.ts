import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import { PreferenceState, UserLocation} from './preferenceTypes';

const initialState: PreferenceState = {
  currentLocation: null,
  deliveryLocation: null,
};

export const preferenceSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<UserLocation>) => {
      state.currentLocation = action.payload
    },
    setDeliveryLocation: (state, action: PayloadAction<UserLocation>) => {
      state.deliveryLocation = action.payload
    },
  },
});

export const {setCurrentLocation, setDeliveryLocation} = preferenceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPreferences = (state: RootState): PreferenceState => state.preference;

export default preferenceSlice.reducer;
