import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, addTicket, updateTicket, deleteTicket } from "../features/ticketsSlice";
import Table from "../components/Table";
import Form from "../components/Form";
import axios from "axios";

// ✅ Updated USERS_API URL to point to the correct endpoint
const ASSETS_API = "https://asset-management-system-backend-tr78.onrender.com/api/assets/";
const USERS_API = "https://asset-management-system-backend-tr78.onrender.com/api/users/users/";

export default function Tickets() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [assetsList, setAssetsList] = useState([]);
  const [techniciansList, setTechniciansList] = useState([]);
  const [techLoading, setTechLoading] = useState(true);

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
      const users = Array.isArray(res.data) ? res.data : res.data.results;
      setTechniciansList(users || []);
      setTechLoading(false);
    } catch (err) {
      console.error("Failed to fetch technicians:", err);
      setTechLoading(false);
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

  // Map tickets to table rows
  const tableData =
    Array.isArray(tickets) && !techLoading
      ? tickets.map((t) => ({
          ...t,
          technician_name: t.technician_name || "-",
          asset_name: t.asset_name || "-",
          actions: (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleEdit(t)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          ),
        }))
      : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tickets</h2>
      <button onClick={handleAdd}>Create Ticket</button>

      {loading && <p>Loading tickets...</p>}
      {techLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error: {JSON.stringify(error)}</p>}
      {!loading && !techLoading && tableData.length === 0 && <p>No tickets found.</p>}

      {!loading && !techLoading && tableData.length > 0 && (
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

      {/* Form Modal - only render after technicians are loaded */}
      {showModal && !techLoading && (
        <Form
          key={techniciansList.length} // force re-render when users load
          title={currentTicket ? "Edit Ticket" : "Create Ticket"}
          data={currentTicket}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          fields={[
            {
              name: "asset",
              label: "Asset",
              type: "select",
              options: [
                { value: "", label: "Select Asset" },
                ...assetsList.map((a) => ({ value: a.id, label: a.name })),
              ],
              value: currentTicket?.asset || "",
            },
            {
              name: "issue",
              label: "Issue",
              type: "text",
              value: currentTicket?.issue || "",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "", label: "Select Status" },
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ],
              value: currentTicket?.status || "",
            },
            {
              name: "assigned_technician",
              label: "Technician",
              type: "select",
              options: [
                { value: "", label: "Select Technician" },
                ...techniciansList.map((t) => ({
                  value: t.id,
                  label: `${t.first_name || ""} ${t.last_name || ""}`.trim() || t.username,
                })),
              ],
              value: currentTicket?.assigned_technician || "",
            },
          ]}
        />
      )}
    </div>
  );
}
