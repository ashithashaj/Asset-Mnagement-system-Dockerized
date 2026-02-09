// src/pages/Tickets.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, addTicket, updateTicket, deleteTicket } from "../features/ticketsSlice";
import Table from "../components/Table";
import Form from "../components/Form";
import axios from "axios";

// Backend URLs
const ASSETS_API = "https://asset-mnagement-system-dockerized.onrender.com/api/assets/";
const USERS_API = "https://asset-mnagement-system-dockerized.onrender.com/api/users/";

export default function Tickets() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [assetsList, setAssetsList] = useState([]);
  const [techniciansList, setTechniciansList] = useState([]);

  // Fetch tickets, assets, and technicians
  useEffect(() => {
    dispatch(fetchTickets());
    fetchAssets();
    fetchTechnicians();
  }, [dispatch]);

  const fetchAssets = async () => {
    try {
      const res = await axios.get(ASSETS_API, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setAssetsList(res.data);
    } catch (err) {
      console.error("Failed to fetch assets:", err);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const res = await axios.get(USERS_API, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setTechniciansList(res.data);
    } catch (err) {
      console.error("Failed to fetch technicians:", err);
    }
  };

  const handleAdd = () => {
    setCurrentTicket(null);
    setShowModal(true);
  };

  const handleEdit = (ticket) => {
    setCurrentTicket(ticket);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(id));
    }
  };

  const handleSubmit = (data) => {
    if (currentTicket) {
      dispatch(updateTicket({ id: currentTicket.id, data }));
    } else {
      dispatch(addTicket(data));
    }
    setShowModal(false);
  };

  // Map tickets for table
  const tableData = Array.isArray(tickets)
    ? tickets.map((t) => ({
        ...t,
        technician_name: t.technician_name || "-", // from serializer
        actions: (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#e0f7fa",
                color: "#00796b",
                border: "1px solid #b2ebf2",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => handleEdit(t)}
            >
              Edit
            </button>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#fff3e0",
                color: "#ef6c00",
                border: "1px solid #ffe0b2",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => handleDelete(t.id)}
            >
              Delete
            </button>
          </div>
        ),
      }))
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tickets</h2>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          borderRadius: "5px",
          border: "1px solid #80ae83",
          backgroundColor: "#d1ded2",
          color: "#388e3c",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Create Ticket
      </button>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>Error: {JSON.stringify(error)}</p>}
      {!loading && !error && tableData.length === 0 && <p>No tickets found.</p>}

      {!loading && tableData.length > 0 && (
        <Table
          columns={[
            { key: "asset_name", label: "Asset" },
            { key: "issue", label: "Issue" },
            { key: "status", label: "Status" },
            { key: "technician_name", label: "Technician" },
            { key: "created_at", label: "Created At" },
            { key: "actions", label: "Actions" },
          ]}
          data={tableData}
        />
      )}

      {showModal && (
        <Form
          title={currentTicket ? "Edit Ticket" : "Create Ticket"}
          data={currentTicket}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          fields={[
            {
              name: "asset",
              label: "Asset",
              type: "select",
              options: assetsList.map((a) => ({ value: a.id, label: a.name })),
              defaultValue: currentTicket ? currentTicket.asset : null,
            },
            { name: "issue", label: "Issue", type: "text" },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ],
              defaultValue: currentTicket ? currentTicket.status : "Pending",
            },
            {
              name: "assigned_technician",
              label: "Technician",
              type: "select",
              options: techniciansList.map((t) => ({
                value: t.id,
                label:
                  t.first_name && t.last_name
                    ? `${t.first_name} ${t.last_name}`
                    : t.username,
              })),
              defaultValue: currentTicket ? currentTicket.assigned_technician : null, // ✅ Pre-select technician
            },
          ]}
        />
      )}
    </div>
  );
}
