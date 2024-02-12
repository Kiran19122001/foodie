import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

// redux store for state management and we are using only one slice which cartSlice beacuse it is the only required for this project
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
export default store;
