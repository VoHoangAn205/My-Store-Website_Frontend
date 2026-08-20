import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  isLoading: {
    userInfo: true,
    otpRegister: true,
    register: true,
  },
  errMessage: {
    userInfo: null,
    otpRegister: null,
    register: null,
  },
  userInfo: null,
  token: "",
  otpRegister: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await userService.register(data);

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
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

    return { data: response.data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const logout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    try {
      const response = await userService.logout();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token, thunkAPI) => {
    try {
      const response = await userService.getUserInfo(token);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const requestOtpRegister = createAsyncThunk(
  "product/requestOtpRegister",
  async (email, thunkAPI) => {
    try {
      const response = await userService.requestOtpRegister(email);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const requestUpgradeToVendor = createAsyncThunk(
  "product/requestUpgradeToVendor",
  async (email, thunkAPI) => {
    try {
      const response = await userService.upgradeToVendor(email);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    silentTokenSave: (state, action) => {
      state.token = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading.userInfo = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = "";
        state.userInfo = null;
      })
      .addCase(requestOtpRegister.fulfilled, (state, action) => {
        state.otpRegister = action.payload;
        state.isLoading.otpRegister = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading.register = false;
      })

      .addCase(requestOtpRegister.pending, (state) => {
        state.isLoading.otpRegister = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading.register = true;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading.userInfo = true;
      })

      .addCase(requestOtpRegister.rejected, (state, action) => {
        state.errMessage.otpRegister = action.payload || action.error.message;
        state.isLoading.otpRegister = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.errMessage.register = action.payload || action.error.message;
        state.isLoading.register = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.errMessage.userInfo = action.payload || action.error.message;
        state.isLoading.userInfo = false;
      });
  },
});

const { actions, reducer } = userSlice;

export const { silentTokenSave } = actions;
export default reducer;
