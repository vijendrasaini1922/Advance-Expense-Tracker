import React from "react";
import ExpenseTableActions from "./ExpenseTableAction";

function ExpenseTableRow({
  item,
  editableId,
  editedValues,
  handleEdit,
  handleSave,
  handleChange,
  handleDeleteClick,
}) {
  return (
    <tr className="hover:bg-gray-200">
      <td className="border px-6 py-4">
        {editableId === item.id ? (
          <input
            type="text"
            name="name"
            value={editedValues.name}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          item.name
        )}
      </td>
      <td className="border px-6 py-4">
        {editableId === item.id ? (
          <input
            type="number"
            name="cost"
            value={editedValues.cost}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          item.cost
        )}
      </td>
      <td className="border px-6 py-4">
        {editableId === item.id ? (
          <input
            type="text"
            name="category"
            value={editedValues.category}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          item.category
        )}
      </td>
      <td className="border px-6 py-4">{item.date}</td>
      <td className="border px-6 py-4">
        <ExpenseTableActions
          item={item}
          editableId={editableId}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDeleteClick={handleDeleteClick}
        />
      </td>
    </tr>
  );
}

export default ExpenseTableRow;
