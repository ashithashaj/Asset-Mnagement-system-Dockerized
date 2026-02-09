// src/components/StatCard.js
import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white rounded shadow m-2 w-40">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
