import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://asset-mnagement-system-dockerized.onrender.com/api/assets/";
 // adjust if different

// ------------------ THUNKS ------------------ //

// Fetch all assets
export const fetchAssets = createAsyncThunk("assets/fetchAssets", async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

// Add new asset
export const addAsset = createAsyncThunk("assets/addAsset", async (asset) => {
  const res = await axios.post(API_URL, asset, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

// Update asset
export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}${id}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    return res.data;
  }
);

// Delete asset
export const deleteAsset = createAsyncThunk("assets/deleteAsset", async (id) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return id;
});

// ------------------ SLICE ------------------ //

const assetsSlice = createSlice({
  name: "assets",
  initialState: { assets: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssets.rejected, (state) => {
        state.loading = false;
      })

      // Add asset
      .addCase(addAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })

      // Update asset
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.assets[index] = action.payload;
      })

      // Delete asset
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter((a) => a.id !== action.payload);
      });
  },
});

export default assetsSlice.reducer;
