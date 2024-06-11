import React from "react";

function CategoricalSums({ categoricalSums }) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl text-gray-800 font-bold mb-4 border-b pb-2">Total Expenses by Category</h3>
      <ul className="space-y-2">
        {categoricalSums.map((category, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow-sm">
            <span className="font-medium text-gray-900">{category.category}</span>
            <span className="text-gray-600">Rs {category.sum}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoricalSums;
