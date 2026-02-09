// src/pages/Inventory.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, addInventory, updateInventory, deleteInventory } from "../features/inventorySlice";
import Table from "../components/Table";
import Form from "../components/Form";

export default function Inventory() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.inventory);

  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch inventory on load
  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleAdd = () => {
    setCurrentItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteInventory(id));
    }
  };

  const handleSubmit = (data) => {
    if (currentItem) {
      dispatch(updateInventory({ id: currentItem.id, data }));
    } else {
      dispatch(addInventory(data));
    }
    setShowModal(false);
  };

  const columns = [
    { key: "item_type", label: "Item Type" },
    { key: "quantity", label: "Quantity" },
    { key: "threshold", label: "Threshold" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory</h2>
      <button onClick={handleAdd}>Add Item</button>

      {loading && <p>Loading inventory...</p>}

      {error && <p style={{ color: "red" }}>Error: {JSON.stringify(error)}</p>}

      {!loading && !error && Array.isArray(items) && items.length === 0 && (
        <p>No inventory items found.</p>
      )}

      {!loading && Array.isArray(items) && items.length > 0 && (
        <Table
          columns={columns}
          data={items.map((i) => ({
            ...i,
            actions: (
              <>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i.id)}>Delete</button>
              </>
            ),
          }))}
        />
      )}

      {showModal && (
        <Form
          title={currentItem ? "Edit Item" : "Add Item"}
          data={currentItem}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          fields={[
            { name: "item_type", label: "Item Type", type: "text" },
            { name: "quantity", label: "Quantity", type: "number" },
            { name: "threshold", label: "Threshold", type: "number" },
          ]}
        />
      )}
    </div>
  );
}
