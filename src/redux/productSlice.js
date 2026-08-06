import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  isLoading: {
    detailPage: true,
    homePage: true,
    searchProduct: true,
    listProductByCate: true,
  },
  errMessage: {
    detailPage: null,
    homePage: null,
    searchProduct: null,
    listProductByCate: null,
  },
  productDetail: [],
  listProducts: [],
  userProducts: [],
  shopProducts: [],
  searchProduct: null,
  listProductByCate: null,
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

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getProductByCategory(data);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productService.searchProduct(data);

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
        state.userProducts = action.payload.data;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.listProducts = action.payload;
        state.isLoading.homePage = false;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.isLoading.detailPage = false;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchProduct = action.payload;
        state.isLoading.searchProduct = false;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.listProductByCate = action.payload;
        state.isLoading.listProductByCate = false;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading.homePage = true;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading.detailPage = true;
      })
      .addCase(searchProduct.pending, (state) => {
        state.isLoading.searchProduct = true;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.isLoading.listProductByCate = true;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.errMessage.homePage = action.payload || action.error.message;
        state.isLoading.homePage = false;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.errMessage.detailPage = action.payload || action.error.message;
        state.isLoading.detailPage = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.errMessage.searchProduct = action.payload || action.error.message;
        state.isLoading.searchProduct = false;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.errMessage.listProductByCate =
          action.payload || action.error.message;
        state.isLoading.listProductByCate = false;
      });
  },
});

const { actions, reducer } = productSlice;

export const {} = actions;
export default reducer;
