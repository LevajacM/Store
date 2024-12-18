import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  cartItemsNum: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((it) => it.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.cartItemsNum += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotal(state);
      toast.success('Item added to cart');
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const removingItem = state.cartItems.find((it) => it.cartID === cartID);
      state.cartItems = state.cartItems.filter((it) => it.cartID !== cartID);
      state.cartItemsNum -= removingItem.amount;
      state.cartTotal -= removingItem.amount * removingItem.price;
      cartSlice.caseReducers.calculateTotal(state);
      toast.success('Item removed from cart');
    },
    editItem: (state, { payload }) => {
      const { cartID, amount } = payload;
      const editingItem = state.cartItems.find((it) => it.cartID === cartID);
      state.cartItemsNum += amount - editingItem.amount;
      state.cartTotal += (amount - editingItem.amount) * editingItem.price;
      editingItem.amount = amount;
      cartSlice.caseReducers.calculateTotal(state);
      toast.success('Cart successfully updated');
    },
    calculateTotal: (state) => {
      state.tax = state.cartTotal / 10;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
