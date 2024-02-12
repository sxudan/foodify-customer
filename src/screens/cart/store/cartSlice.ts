import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import { CartItem, CartPayload, CartState, UpdateQtyPayload } from './cartTypes';

const initialState: CartState = {
  cartItems: [],
  restaurant: undefined
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartPayload>) => {
      state.cartItems = state.cartItems.concat([{...action.payload.item, timestamp: Date.now()}]);
      state.restaurant = action.payload.restaurant;
    },
    updateQty: (state, action: PayloadAction<UpdateQtyPayload>) => {
      state.cartItems = state.cartItems.map((item, index) => item.timestamp === action.payload.timestamp ? {...item, quantity: action.payload.qty} : item);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.timestamp !== action.payload)
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const {addCart, updateQty,removeItem, clearCart} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState): CartState => state.cart;

export default cartSlice.reducer;
