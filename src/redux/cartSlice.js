import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cartService";

const initialState = {
  cartList: [],
};

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (data, thunkAPI) => {
    try {
      const response = await cartService.getCarts();

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id, thunkAPI) => {
    try {
      const response = await cartService.deleteCart(id);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartList.fulfilled, (state, action) => {
      state.cartList = action.payload.cartItems;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cartList = action.payload.cartItems;
    });
  },
});

const { actions, reducer } = cartSlice;

export const {} = actions;
export default reducer;
