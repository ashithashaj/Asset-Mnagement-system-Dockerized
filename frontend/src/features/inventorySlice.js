// src/features/inventorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://asset-management-system-backend-tr78.onrender.com/api/inventory/";

// ------------------ THUNKS ------------------

// Fetch all inventory items
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to fetch inventory" });
    }
  }
);

// Add new inventory item
export const addInventory = createAsyncThunk(
  "inventory/addInventory",
  async (item, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to add inventory item" });
    }
  }
);

// Update inventory item
export const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}${id}/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to update inventory item" });
    }
  }
);

// Delete inventory item
export const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to delete inventory item" });
    }
  }
);

// ------------------ SLICE ------------------
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchInventory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchInventory.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchInventory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Add
      .addCase(addInventory.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(addInventory.rejected, (state, action) => { state.error = action.payload; })

      // Update
      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateInventory.rejected, (state, action) => { state.error = action.payload; })

      // Delete
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(deleteInventory.rejected, (state, action) => { state.error = action.payload; });
  },
});

export default inventorySlice.reducer;
