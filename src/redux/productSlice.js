import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  productDetail: null,
  homePageProduct: [],
  userProducts: [],
  shopProducts: [],
};

export const getAllUserProducts = createAsyncThunk(
  "user/getAllUserProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getAllUserProducts(data);
      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err.message);

      return { message: err.message };
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserProducts.fulfilled, (state, action) => {
      state.userProducts = action.payload.data;
    });
  },
});

const { actions, reducer } = productSlice;

export const {} = actions;
export default reducer;
