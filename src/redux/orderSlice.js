import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const initialState = {
  parentOrder: [],
  isLoading: { getParent: true, createOrder: true },
  errMessage: { getParent: "", createOrder: "" },
};

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
      console.log(response.data);

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
      .addCase(getAllUserOrder.pending, (state) => {
        state.isLoading.getParent = true;
      })
      .addCase(getAllUserOrder.rejected, (state, action) => {
        state.errMessage.getParent = action.payload || action.error.message;
        state.isLoading.getParent = false;
      })
      .addCase(getAllUserOrder.fulfilled, (state, action) => {
        state.parentOrder = action.payload.data;
        state.isLoading.getParent = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading.createOrder = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.errMessage.createOrder = action.payload || action.error.message;
        state.isLoading.createOrder = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.parentOrder = action.payload.data;
        state.isLoading.createOrder = false;
      });
  },
});

const { actions, reducer } = orderSlice;

export const {} = actions;
export default reducer;
