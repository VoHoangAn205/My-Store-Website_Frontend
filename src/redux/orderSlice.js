import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const initialState = {
  parentOrder: [],
  shopOrders: null,
  isLoading: { getParent: true, createOrder: true, shopOrders: true },
  errMessage: { getParent: "", createOrder: "", shopOrders: "" },
};

export const shopCancelOrder = createAsyncThunk(
  "order/shopCancelOrder",
  async (id, thunkAPI) => {
    try {
      const response = await orderService.shopCancelOrder(id);
      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);
export const shopUpdateOrderStatus = createAsyncThunk(
  "order/shopUpdateOrderStatus",
  async (id, thunkAPI) => {
    try {
      const response = await orderService.shopUpdateOrderStatus(id);
      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getAllUserOrder = createAsyncThunk(
  "order/getAllUserOrder",
  async (token, thunkAPI) => {
    try {
      const response = await orderService.getAllUserOrders(token);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, thunkAPI) => {
    try {
      const response = await orderService.createOrder(data);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getShopOrders = createAsyncThunk(
  "order/getShopOrders",
  async (data, thunkAPI) => {
    try {
      const response = await orderService.getOrdersForShop(data);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserOrder.fulfilled, (state, action) => {
        state.parentOrder = action.payload;
        state.isLoading.getParent = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading.createOrder = false;
      })
      .addCase(getShopOrders.fulfilled, (state, action) => {
        state.shopOrders = action.payload;
        state.isLoading.shopOrders = false;
      })

      .addCase(getAllUserOrder.pending, (state) => {
        state.isLoading.getParent = true;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading.createOrder = true;
      })
      .addCase(getShopOrders.pending, (state) => {
        state.isLoading.shopOrders = true;
      })

      .addCase(getAllUserOrder.rejected, (state, action) => {
        state.errMessage.getParent = action.payload || action.error.message;
        state.isLoading.getParent = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.errMessage.createOrder = action.payload || action.error.message;
        state.isLoading.createOrder = false;
      })
      .addCase(getShopOrders.rejected, (state, action) => {
        state.errMessage.shopOrders = action.payload || action.error.message;
        state.isLoading.shopOrders = false;
      });
  },
});

const { actions, reducer } = orderSlice;

export const {} = actions;
export default reducer;
