import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/productService";
import categoryService from "../services/categoryService";

const initialState = {
  categories: [],
};

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (data, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories();
      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err.message);

      return { message: err.message };
    }
  },
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
    });
  },
});

const { actions, reducer } = categorySlice;

export const {} = actions;
export default reducer;
