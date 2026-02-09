import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://asset-mnagement-system-dockerized.onrender.com/api/tickets/";

export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const addTicket = createAsyncThunk("tickets/addTicket", async (ticket) => {
  const res = await axios.post(API_URL, ticket, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const updateTicket = createAsyncThunk("tickets/updateTicket", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}${id}/`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return res.data;
});

export const deleteTicket = createAsyncThunk("tickets/deleteTicket", async (id) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
  return id;
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: { tickets: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => { state.loading = true; })
      .addCase(fetchTickets.fulfilled, (state, action) => { state.tickets = action.payload; state.loading = false; })
      .addCase(fetchTickets.rejected, (state) => { state.loading = false; })
      .addCase(addTicket.fulfilled, (state, action) => { state.tickets.push(action.payload); })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tickets[index] = action.payload;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => { state.tickets = state.tickets.filter((t) => t.id !== action.payload); });
  },
});

export default ticketsSlice.reducer;
