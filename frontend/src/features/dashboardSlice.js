// src/features/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: [], // will hold dashboard statistics
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
  },
});

export const { setStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
