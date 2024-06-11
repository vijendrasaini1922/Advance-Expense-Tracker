import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoricalPieChart({ categoricalSums }) {
  const data = {
    labels: categoricalSums.map((category) => category.category),
    datasets: [
      {
        data: categoricalSums.map((category) => category.sum),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
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
        text: 'Expenses by Category',
      },
    },
  };

  return (
    <div className="w-full bg-white p-6 m-8 p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl text-gray-800 font-semibold mb-4">Expenses by Category</h3>
      <div className="flex justify-center items-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoricalPieChart;
