import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { imagesToUpload: [] };

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    changeImagesUpload(state, action) {
      state.imagesToUpload = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const { actions, reducer } = gallerySlice;

export const { changeImagesUpload } = actions;
export default reducer;
