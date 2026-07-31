import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  productDetail: null,
  listProducts: null,
  isLoading: { detailPage: true, homePage: true },
  errMessage: { detailPage: null, homePage: null },
  userProducts: [],
  shopProducts: [],
};

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, thunkAPI) => {
    try {
      const response = await productService.getProductDetail(id);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

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
        state.isLoading.homePage = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.errMessage.homePage = action.payload || action.error.message;
        state.isLoading.homePage = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.listProducts = action.payload;
        state.isLoading.homePage = false;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading.detailPage = true;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.errMessage.detailPage = action.payload || action.error.message;
        state.isLoading.detailPage = false;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.isLoading.detailPage = false;
      });
  },
});

const { actions, reducer } = productSlice;

export const {} = actions;
export default reducer;
