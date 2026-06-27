import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { UI: uiSlice, USER: userSlice },
});
