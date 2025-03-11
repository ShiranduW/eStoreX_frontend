import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        state.value.push({ product: action.payload, quantity: 1 });
      }
      // Calculate total amount
      state.totalAmount = state.value.reduce((total, item) => {
        return total + (Number(item.product.price) * item.quantity);
      }, 0);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.value.find(item => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
        // Update total amount when quantity changes
        state.totalAmount = state.value.reduce((total, item) => {
          return total + (Number(item.product.price) * item.quantity);
        }, 0);
      }
    },
    clearCart: (state) => {
      state.value = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
