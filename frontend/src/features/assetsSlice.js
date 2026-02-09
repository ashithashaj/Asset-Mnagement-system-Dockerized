// src/features/assetsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://asset-mnagement-system-dockerized.onrender.com/api/assets/";

// ------------------ THUNKS ------------------

// Fetch all assets
export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to fetch assets" });
    }
  }
);

// Add new asset
export const addAsset = createAsyncThunk(
  "assets/addAsset",
  async (asset, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, asset, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to add asset" });
    }
  }
);

// Update asset
export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}${id}/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to update asset" });
    }
  }
);

// Delete asset
export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to delete asset" });
    }
  }
);

// ------------------ SLICE ------------------
const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    assets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })
      .addCase(addAsset.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.assets[index] = action.payload;
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default assetsSlice.reducer;
