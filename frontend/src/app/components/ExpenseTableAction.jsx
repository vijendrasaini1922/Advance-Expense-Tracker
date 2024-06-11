import React from "react";

function ExpenseTableActions({ item, editableId, handleEdit, handleDeleteClick, handleSave }) {
  return (
    <>
      {editableId !== item.id ? (
        <>
          <button
            onClick={() => handleEdit(item.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(item.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Delete
          </button>
        </>
      ) : (
        <button
          onClick={() => handleSave(item.id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Save
        </button>
      )}
    </>
  );
}

export default ExpenseTableActions;
