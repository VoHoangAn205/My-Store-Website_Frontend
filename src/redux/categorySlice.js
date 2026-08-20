import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import productService from "../services/productService";
import categoryService from "../services/categoryService";

const initialState = {
  categories: [],
  homePageCategories: [],
  categoriesToUpload: [],
  isLoading: { categories: true },
  errMessage: { categories: null },
};

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (data, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories();

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategoryUpload(state, action) {
      state.categoriesToUpload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.homePageCategories = action.payload.slice(0, 6);
        state.isLoading.categories = false;
      })
      .addCase(getAllCategories.pending, (state, action) => {
        state.isLoading.categories = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.errMessage.categories = action.payload || action.error.message;
        state.isLoading.categories = false;
      });
  },
});

const { actions, reducer } = categorySlice;

export const { changeCategoryUpload } = actions;
export default reducer;
