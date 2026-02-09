// src/features/inventorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/inventory/";

// ------------------ THUNKS ------------------
export const fetchInventory = createAsyncThunk("inventory/fetchInventory", async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const addInventory = createAsyncThunk("inventory/addInventory", async (item) => {
  const res = await axios.post(API_URL, item, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const updateInventory = createAsyncThunk("inventory/updateInventory", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}${id}/`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const deleteInventory = createAsyncThunk("inventory/deleteInventory", async (id) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return id;
});

// ------------------ SLICE ------------------
const inventorySlice = createSlice({
  name: "inventory",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => { state.loading = true; })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchInventory.rejected, (state) => { state.loading = false; })

      .addCase(addInventory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

// ------------------ EXPORTS ------------------
export default inventorySlice.reducer; // default reducer export
// ✅ Named exports already exist above for thunks
