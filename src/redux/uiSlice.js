import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarStatus: false,
};

export const uiSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarStatus = !state.sidebarStatus;
    },
    closeSidebar: (state) => {
      state.sidebarStatus = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
