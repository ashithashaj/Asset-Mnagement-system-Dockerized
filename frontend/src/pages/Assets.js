import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets, addAsset, updateAsset, deleteAsset } from "../features/assetsSlice";
import Table from "../components/Table";
import Form from "../components/Form";

export default function Assets() {
  const dispatch = useDispatch();
  const { assets, loading } = useSelector((state) => state.assets);

  const [showModal, setShowModal] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);

  // Fetch assets on load
  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const handleAdd = () => {
    setCurrentAsset(null);
    setShowModal(true);
  };

  const handleEdit = (asset) => {
    setCurrentAsset(asset);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      dispatch(deleteAsset(id));
    }
  };

  const handleSubmit = (data) => {
    if (currentAsset) {
      dispatch(updateAsset({ id: currentAsset.id, data }));
    } else {
      dispatch(addAsset(data));
    }
    setShowModal(false);
  };

  // Table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "serial_number", label: "Serial Number" },
    { key: "status", label: "Status" },
    { key: "purchase_date", label: "Purchase Date" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assets</h2>
      <button onClick={handleAdd}>Add Asset</button>

      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <Table
          columns={columns}
          data={assets.map((a) => ({
            ...a,
            actions: (
              <>
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </>
            ),
          }))}
        />
      )}

      {showModal && (
        <Form
          title={currentAsset ? "Edit Asset" : "Add Asset"}
          data={currentAsset}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "type", label: "Type", type: "text" },
            { name: "serial_number", label: "Serial Number", type: "text" },
            { name: "status", label: "Status", type: "text" }, // can be dropdown later
            { name: "purchase_date", label: "Purchase Date", type: "date" },
          ]}
        />
      )}
    </div>
  );
}
