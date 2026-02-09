import React from "react";

export default function Table({ columns, data = [] }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse", // ensures borders merge properly
          fontFamily: "Arial, sans-serif",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  border: "2px solid #7d6e6e", // thicker visible border
                  padding: "12px",
                  textAlign: "left",
                  backgroundColor: "#4cb750",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  border: "2px solid #7d6e6e", // match header border
                  textAlign: "center",
                  padding: "12px",
                  color: "#555",
                }}
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                style={{
                  border: "2px solid #7d6e6e", // ensures visible row borders
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f9f1")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      border: "2px solid #7d6e6e", // ensures all cells have borders
                      padding: "12px",
                      color: "#333",
                    }}
                  >
                    {col.key === "actions" ? (
                      <div style={{ display: "flex", gap: "10px" }}>{row[col.key]}</div>
                    ) : (
                      row[col.key] !== undefined ? row[col.key] : "-"
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
