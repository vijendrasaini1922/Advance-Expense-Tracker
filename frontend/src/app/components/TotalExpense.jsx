import React from "react";

function TotalExpense({ total, last7Days, last30Days, last365Days }) {
  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-blue-500 text-white p-4 h-1/2">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Total Expense</div>
        <div className="text-sm">Total: Rs {total}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="bg-white text-gray-700 rounded-lg p-2">
          <div className="text-sm font-semibold">Last 7 Days</div>
          <div>Rs {last7Days}</div>
        </div>
        <div className="bg-white text-gray-700 rounded-lg p-2">
          <div className="text-sm font-semibold">Last 30 Days</div>
          <div>Rs {last30Days}</div>
        </div>
        <div className="bg-white text-gray-700 rounded-lg p-2">
          <div className="text-sm font-semibold">Last 365 Days</div>
          <div>Rs {last365Days}</div>
        </div>
      </div>
    </div>
  );
}

export default TotalExpense;
