import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="px-6 py-4 text-left">Name</th>
        <th className="px-6 py-4 text-left">Cost</th>
        <th className="px-6 py-4 text-left">Category</th>
        <th className="px-6 py-4 text-left">Date</th>
        <th className="px-6 py-4 text-left">Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
