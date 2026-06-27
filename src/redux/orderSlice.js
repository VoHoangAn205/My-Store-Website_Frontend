import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const initialState = {};

export const getAllUserOrder = createAsyncThunk(
  "order/getAllUserOrder",
  async (token, thunkAPI) => {
    try {
      const response = await orderService.getAllUserOrders(token);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      return { message: err.response.data.message };
    }
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserOrder.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.data.accessToken;
    });
  },
});

const { actions, reducer } = orderSlice;

export const {} = actions;
export default reducer;
