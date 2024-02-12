import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {AuthState, LoggedInPayload} from './authTypes';

const initialState: AuthState = {
  authToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoggedInPayload>) => {
      state.authToken = action.payload.token;
      state.user = action.payload.user;
    },
    loggedOut: state => {
      state.authToken = initialState.authToken;
      state.user = initialState.user;
    },
    tokenExpired: state => {
      state.authToken = initialState.authToken;
    },
  },
});

export const {loggedOut, loggedIn, tokenExpired} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
