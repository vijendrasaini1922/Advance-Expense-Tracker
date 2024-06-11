import React from "react";
import ExpenseTableRow from "./ExpenseTableRow";
import TableHeader from "./TableHeader";

function ExpenseTable({
  data,
  editableId,
  editedValues,
  handleEdit,
  handleSave,
  handleChange,
  handleDeleteClick,
}) {
  return (
    <table className="table-auto w-full text-gray-700 rounded-lg">
      <TableHeader />
      <tbody>
        {data.map((item) => (
          <ExpenseTableRow
            key={item.id}
            item={item}
            editableId={editableId}
            editedValues={editedValues}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleChange={handleChange}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
