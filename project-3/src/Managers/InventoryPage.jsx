import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './InventoryPageStyle.css';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = [
  { name: 'Item 1', current: 40, max: 100 },
  { name: 'Item 2', current: 60, max: 100 },
  { name: 'Item 3', current: 30, max: 100 },
  { name: 'Item 4', current: 80, max: 100 },
  
];

const chartData = {
  labels: data.map((item) => item.name), // Set the labels (Item names)
  datasets: [
    {
      label: 'Current Quantity',
      data: data.map((item) => item.current), // Current value for each item
      backgroundColor: '#82ca9d', // Color for current quantity
      stack: 'stack1',
    },
    {
      label: 'Max Quantity',
      data: data.map((item) => item.max - item.current), // Difference between max and current (the rest of the bar)
      backgroundColor: '#ddd', // Color for remaining portion
      stack: 'stack1',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
            size: '17em',

            },
        },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const current = context.raw;
          const max = data[context.dataIndex].max;
          return `${context.dataset.label}: ${current} / ${max}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true, // Stack the bars
      ticks: {
        font: {
            size: '15em',
        },
      },
    },
    y: {
      stacked: true, // Stack the bars
      ticks: {
        font: {
          size: '20em', // Increase the font size of the Y-axis labels (numbers on the left)
        },
      },
    },
  },
};




function InventoryPage() {
    return (
        <div className="inventory-page-container">
            <h1 className="inventory-header"> Amount of Inventory Needed</h1>
            <div className="inventory-graph">
                <Bar data={chartData} options={options} />
            </div>
            <div className="inventory-buttons">
                <button> Add to Order</button>
                <button> View Order</button>
            </div>

        </div>

    );
}


export default InventoryPage