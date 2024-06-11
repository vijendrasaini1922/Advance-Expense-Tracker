import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Last30DaysExpensesLineChart({ last30DatesExpenses }) {
  const data = {
    labels: last30DatesExpenses.map((dateExpense) => dateExpense.date),
    datasets: [
      {
        label: 'Total Expense',
        data: last30DatesExpenses.map((dateExpense) => dateExpense.total_expense),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 30 Days Expenses',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Expense',
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg text-gray-700 font-bold mb-2">Last 30 Days Expenses</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default Last30DaysExpensesLineChart;
