import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import imgFileFormatter from "../helpers/imgFileFormatter";

const initialState = { imagesToUpload: [] };

export const createGallery = createAsyncThunk(
  "gallery/createGallery",
  async (data, thunkAPI) => {
    try {
      const imageFile = imgFileFormatter(data);

      const response = await galleryService.uploadGallery(imageFile);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

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
