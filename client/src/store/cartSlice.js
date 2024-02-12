import { createSlice } from "@reduxjs/toolkit";

// Load initial state from session storage, if available
const storedCart = sessionStorage.getItem("cart");
const initialState = storedCart ? JSON.parse(storedCart) : [];
// cart slice for handling the data to add or remove recipe items from the reduc store

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const newItem = action.payload;
      const isExisting = state.find((item) => item.id === newItem.id); //handling the multiple clicks of recipe items
      if (!isExisting) {
        state.push(newItem);
        sessionStorage.setItem("cart", JSON.stringify(state)); // Update session storage
      }
    },
    remove(state, action) {
      const itemId = action.payload;
      const updatedState = state.filter((item) => item.id !== itemId); //removing the delete clicked item
      state.splice(0, state.length, ...updatedState); // Mutating state to trigger Redux update
      sessionStorage.setItem("cart", JSON.stringify(updatedState)); // Update session storage
    },
  },
});

export const { add, remove } = cart.actions;
export default cart.reducer;
