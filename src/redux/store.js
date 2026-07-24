import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import gallerySlice from "./gallerySlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    UI: uiSlice,
    USER: userSlice,
    CART: cartSlice,
    ORDER: orderSlice,
    GALLERY: gallerySlice,
    PRODUCT: productSlice,
    CATEGORY: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["gallery/changeImagesUpload"],
        ignoredPaths: ["GALLERY.imagesToUpload"],
      },
    }),
});
