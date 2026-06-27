import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = { userProfile: {}, token: "" };

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await userService.register(data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  },
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (data, thunkAPI) => {
    try {
      const response = await userService.refreshToken();
      return { status: true, data: response.data };
    } catch (err) {
      return { status: false, message: err.response.data.message };
    }
  },
);

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await userService.login(data);
    return { status: true, data: response.data };
  } catch (err) {
    return { status: false, message: err.response.data.message };
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.data.accessToken;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.data.accessToken;
    });
  },
});

const { actions, reducer } = userSlice;

export const {} = actions;
export default reducer;
