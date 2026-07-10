import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    UI: uiSlice,
    USER: userSlice,
    ORDER: orderSlice,
    PRODUCT: productSlice,
    CATEGORY: categorySlice,
  },
});
