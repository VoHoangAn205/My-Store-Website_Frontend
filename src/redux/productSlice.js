import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  productDetail: null,
  listProducts: null,
  isLoading: true,
  userProducts: [],
  shopProducts: [],
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getAllProducts(data);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getAllUserProducts = createAsyncThunk(
  "product/getAllUserProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getAllUserProducts(data);
      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err.message);

      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productService.createProduct(data);

      console.log(response);
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserProducts.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.userProducts = action.payload.data;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listProducts = action.payload;
        state.isLoading = false;
      });
  },
});

const { actions, reducer } = productSlice;

export const {} = actions;
export default reducer;
