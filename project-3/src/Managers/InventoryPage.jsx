import React, { useEffect, useState, useContext } from 'react';
import { OrderContext } from './OrderContext';
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







function InventoryPage() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


  const [inventoryData, setData] = useState([]);
  const { orderData } = useContext(OrderContext);
  const { addRow } = useContext(OrderContext);
  const { deleteRow } = useContext(OrderContext);
  useEffect(() => {
    // Listen for SSE updates when the component mounts

    const eventSource = new EventSource('http://localhost:5001/api/events/inventory'); // URL to the SSE endpoint on the backend

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received SSE message:', message);

      // If the message contains the full employee list (on initial connection)
      if (Array.isArray(message)) {
        setData(message);  // Set the initial list of employees
      }
    };

    return () => {
      eventSource.close(); // Clean up when component is unmounted
    };

  }, []);

  const labels = inventoryData && inventoryData.length > 0
    ? [...new Set(inventoryData.map(row => row.ingredient_name))]
    : [];
  console.log(labels);

  const minimumQuantities = inventoryData && inventoryData.length > 0
    ? inventoryData.map(row => row.quantity_needed)
    : []; // Minimum quantities
  console.log(minimumQuantities);
  const currentQuantities = inventoryData && inventoryData.length > 0
    ? inventoryData.map(row => row.quantity)
    : []; // Current quantities


  // Data for the chart: only one dataset for minimum quantities
  const data = {
    labels,
    datasets: [
      {
        label: "Quantity Needed",
        data: minimumQuantities,
        backgroundColor: "rgba(75, 192, 192, 0.3)", // Light color for minimum quantity
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,

      },
      {
        label: "Current Quantity",
        data: currentQuantities,
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Darker color for current quantity
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,

      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to stretch based on container size
    scales: {
      x: {
        ticks: {
          maxRotation: 90,  // Rotate labels to 90 degrees (or less if necessary)
          minRotation: 45,  // Ensure they rotate but don't overlap
          font: {
            size: 12,  // Smaller font size to fit labels
          },

        },
        grid: {
          offset: true,
        },
        categoryPercentage: 1, // Tighten up the spacing between items
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    barPercentage: 1,
    datasets: {
      barThickness: 0.5, // Controls the thickness of the individual bars (you can adjust this value)
    },
  };

  const [activePopup, setActivePopup] = useState(null);


  const openPopup = (type) => {
    setActivePopup(type);

  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const [selectedOption, setSelectedOption] = useState('');



  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [quantity, setQuantity] = useState('');

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  function getUnitCost(name) {
    const row = inventoryData.find(ingredient => ingredient.ingredient_name === name);


    return row ? row.unit_cost : null;
  }

  const getTotalCost = () => {
    return orderData.reduce((sum, row) => sum + row.cost, 0);
  };



  const handleSubmit = () => {
    const cost = getUnitCost(selectedOption) * quantity;
    addRow({ name: selectedOption, quantity, cost });
    setQuantity('');
    setSelectedOption('');




    closePopup();

  };

  const handleOrderSubmit = () => {
    closePopup();
  };


  return (
    <div className="inventory-page-container">
      <h1 className="inventory-header"> Amount of Inventory Needed</h1>
      <div className="inventory-graph">
        <Bar data={data} options={options} />
      </div>
      <div className="inventory-buttons">
        <button className="inventoryButton" onClick={() => openPopup('add')}> Add to Order</button>
        {activePopup == 'add' && (
          <div className="popUp">
            <div className="popupContent">
              <div className="inventoryPopupHeader">
                <h2>Select an item and quantity</h2>
                <button className="inventoryX" onClick={closePopup}>&times;</button>


              </div>
              <label>
                Item:
                <select value={selectedOption} onChange={handleDropdownChange}>
                  <option value="">Select...</option> {/* Placeholder option */}
                  {labels.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Quantity:
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </label>

              <button className="addSubmit" onClick={handleSubmit}>Submit</button>


            </div>


          </div>



        )}
        <button className="inventoryButton" onClick={() => openPopup('view')}> View Order</button>
        {activePopup == 'view' && (

          <div className="popUp">
            <div className="viewPopupContent">
              <div className="viewPopupHeader">

                <button className="viewX" onClick={closePopup}>&times;</button>
              </div>
              <div className="orderTableContainer">
                <div className="orderTable-header">
                  <div className="orderTable-cell">Item</div>
                  <div className="orderTable-cell">Quantity</div>
                  <div className="orderTable-cell">Cost</div>
                  <div className="orderTable-cell">Edit Quantity</div>
                  <div className="orderTable-cell">Delete</div>

                </div>
                <div className="orderTable-body">
                  {orderData.length === 0 ? (
                    <div className="orderTable-row">
                      <div className="orderTable-cell" colSpan="3">No data available</div>
                    </div>
                  ) : (
                    orderData.map((row) => (
                      <div className="orderTable-row" key={row.name}>
                        <div className="orderTable-cell">{row.name}</div>
                        <div className="orderTable-cell">{row.quantity}</div>
                        <div className="orderTable-cell">{row.cost}</div>
                        <div className="orderTable-cell">
                          <button className="editButton">Edit</button>
                        </div>
                        <div className="orderTable-cell">
                          <button className="deleteButtonInv" onClick={() => deleteRow(row.name)}>Delete</button>
                        </div>


                      </div>
                    ))
                  )}
                </div>
              </div>
              <button className="orderSubmit" onClick={handleOrderSubmit}>Submit: ${getTotalCost()}</button>




            </div>






          </div>


        )}
      </div>

    </div>

  );
}


export default InventoryPage