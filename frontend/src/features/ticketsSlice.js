// src/features/ticketsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Make sure this matches your deployed backend path exactly
const API_URL = "https://asset-mnagement-system-dockerized.onrender.com/api/tickets/";

// ------------------ THUNKS ------------------

// Fetch all tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to fetch tickets" });
    }
  }
);

// Add ticket
export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (ticket, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, ticket, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to add ticket" });
    }
  }
);

// Update ticket
export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // ✅ Important: trailing slash must match backend
      const res = await axios.put(`${API_URL}${id}/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to update ticket" });
    }
  }
);

// Delete ticket
export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id, { rejectWithValue }) => {
    try {
      // ✅ Important: trailing slash must match backend
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Failed to delete ticket" });
    }
  }
);

// ------------------ SLICE ------------------
const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTickets.fulfilled, (state, action) => { state.tickets = action.payload; state.loading = false; })
      .addCase(fetchTickets.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addTicket.pending, (state) => { state.error = null; })
      .addCase(addTicket.fulfilled, (state, action) => { state.tickets.push(action.payload); })
      .addCase(addTicket.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateTicket.pending, (state) => { state.error = null; })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tickets[index] = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => { state.error = action.payload; })
      .addCase(deleteTicket.pending, (state) => { state.error = null; })
      .addCase(deleteTicket.fulfilled, (state, action) => { state.tickets = state.tickets.filter((t) => t.id !== action.payload); })
      .addCase(deleteTicket.rejected, (state, action) => { state.error = action.payload; });
  },
});

export default ticketsSlice.reducer;
