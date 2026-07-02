import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import { orderSlice } from "./orderSlice";

export const store = configureStore({
  reducer: { UI: uiSlice, USER: userSlice, ORDER: orderSlice },
});
