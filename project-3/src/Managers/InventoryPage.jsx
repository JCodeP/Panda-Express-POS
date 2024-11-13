import React, {useEffect, useState} from 'react';
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
    const [activePopup, setActivePopup] = useState(null);
    
    
    const openPopup = (type) => {
      setActivePopup(type);

    };

    const closePopup = () => {
      setActivePopup(null);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const nameOptions = [...new Set(data.map((row) => row.name))];

    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };
    return (
        <div className="inventory-page-container">
            <h1 className="inventory-header"> Amount of Inventory Needed</h1>
            <div className="inventory-graph">
                <Bar data={chartData} options={options} />
            </div>
            <div className="inventory-buttons">
                <button onClick={() => openPopup('add')}> Add to Order</button>
                {activePopup == 'add'  && (
                  <div className="popUp">
                  <div className="popupContent">
                      <div className="popupHeader">
                          <h2>Select an item and quantity</h2>
                          <button className="x" onClick={closePopup}>&times;</button>


                      </div>
                      <label>
                          Item:
                          <select value={selectedOption} onChange={handleDropdownChange}>
                              <option value="">Select...</option> {/* Placeholder option */}
                              {nameOptions.map((name, index) => (
                                  <option key={index} value={name}>
                                      {name}
                                  </option>
                              ))}
                          </select>
                      </label>

                      <label>
                          Weekly Hours:
                          <input
                            type="text"
                            value={quantity}
                            onChange={handleQuantityChange}
                          />
                      </label>


                  </div>


              </div>    
                
                
                
              )}
                <button> View Order</button>
            </div>

        </div>

    );
}


export default InventoryPage