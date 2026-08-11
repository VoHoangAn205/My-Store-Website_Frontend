import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  isLoading: {
    detailPage: true,
    homeProductList: true,
    searchProduct: true,
    listProductByCate: true,
    newArrivalsList: true,
    otpRegister: true,
  },
  errMessage: {
    detailPage: null,
    homeProductList: null,
    searchProduct: null,
    listProductByCate: null,
    newArrivalsList: null,
    otpRegister: null,
  },
  productDetail: [],
  homeProductList: [],
  userProducts: [],
  shopProducts: [],
  searchProduct: null,
  listProductByCate: null,
  newArrivalsList: null,
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

export const getNewArrivalProducts = createAsyncThunk(
  "product/getNewArrivalProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getNewArrivalProducts(data);

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
        state.homeProductList = action.payload;
        state.isLoading.homeProductList = false;
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
      .addCase(getNewArrivalProducts.fulfilled, (state, action) => {
        state.newArrivalsList = action.payload;
        state.isLoading.newArrivalsList = false;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading.homeProductList = true;
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
      .addCase(getNewArrivalProducts.pending, (state) => {
        state.isLoading.newArrivalsList = true;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.errMessage.homeProductList =
          action.payload || action.error.message;
        state.isLoading.homeProductList = false;
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
      })
      .addCase(getNewArrivalProducts.rejected, (state, action) => {
        state.errMessage.newArrivalsList =
          action.payload || action.error.message;
        state.isLoading.newArrivalsList = false;
      });
  },
});

const { actions, reducer } = productSlice;

export const {} = actions;
export default reducer;
