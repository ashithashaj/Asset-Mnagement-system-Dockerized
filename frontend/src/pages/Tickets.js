// src/pages/Tickets.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, addTicket, updateTicket, deleteTicket } from "../features/ticketsSlice";
import Table from "../components/Table";
import Form from "../components/Form";
import axios from "axios";

const ASSETS_API = "https://asset-mnagement-system-dockerized.onrender.com/api/assets/";
const USERS_API = "https://asset-mnagement-system-dockerized.onrender.com/api/users/";

export default function Tickets() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [assetsList, setAssetsList] = useState([]);
  const [techniciansList, setTechniciansList] = useState([]);

  // Fetch tickets, assets, technicians
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
  const tableData = Array.isArray(tickets) ? tickets.map((t) => {
    let technicianName = "-";
    if (t.assigned_technician) {
      if (typeof t.assigned_technician === "object") {
        technicianName = t.assigned_technician.username || "-";
      } else {
        const tech = techniciansList.find((tech) => tech.id === t.assigned_technician);
        technicianName = tech ? tech.username : "-";
      }
    }
    return {
      ...t,
      technician_name: technicianName,
      actions: (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => handleEdit(t)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </div>
      ),
    };
  }) : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tickets</h2>
      <button onClick={handleAdd}>Create Ticket</button>

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
              value: currentTicket?.asset || "",
            },
            { name: "issue", label: "Issue", type: "text", value: currentTicket?.issue || "" },
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
              value: currentTicket?.status || "Pending",
            },
            {
              name: "assigned_technician",
              label: "Technician",
              type: "select",
              options: techniciansList.map((t) => ({ value: t.id, label: t.username })),
              value: currentTicket?.assigned_technician?.id || currentTicket?.assigned_technician || "",
            },
          ]}
        />
      )}
    </div>
  );
}
