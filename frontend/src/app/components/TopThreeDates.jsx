import React from "react";

function TopThreeDates({ topDates }) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Top Three Dates with Highest Expenses (Last 30 Days)</h3>
      <ul>
        {topDates.map((date, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{date.date}</span>
            <span className="text-green-600 font-bold">Rs {date.total_expense}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopThreeDates;
