import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const [inventoryData, setData] = useState([]);
  const { orderData } = useContext(OrderContext);
  const { addRow } = useContext(OrderContext);
  const { deleteRow } = useContext(OrderContext);
  const { editRow } = useContext(OrderContext);
  const { updateRowCost } = useContext(OrderContext);
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


  function initialize() {
    setFoodSelectError(null);
    setQuantityError(null);
  }


  const openPopup = (type) => {
    setActivePopup(type);
    initialize();

  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [foodSelectError, setFoodSelectError] = useState(null);



  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "") {
      setFoodSelectError("");
    }
  };

  const [quantity, setQuantity] = useState('');

  const [quantityError, setQuantityError] = useState(null);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    if (/^(?!0(\.0+)?$)0\d+/.test(event.target.value)) {
      setQuantityError("Please do not enter leading zeroes");
      return;
    } 
    if (/(\.\d+|\d+\.)/.test(event.target.value)) {
      setQuantityError("Please enter whole numbers no decimals");
      return;
    }
    if (/[^0-9]/.test(event.target.value)) {
      setQuantityError("Please enter a valid number.");
      return;
      
    }
    if (/^$/.test(event.target.value) || /[0-9]/.test(event.target.value)) {
      setQuantityError('');
    }
  };

  const handleTableChange = (index, type, value) => {
    if (/^(?!0(\.0+)?$)0\d+/.test(value)) {
      console.log("hello");
      
      return;
    } 
    if (/(\.\d+|\d+\.)/.test(value)) {
      console.log("hello");
      return;
    }
    if (/[^0-9]/.test(value)) {
      console.log("hello");
      return;
      
    }
    editRow(index, type, value);
    

  };

  

  function getUnitCost(name) {
    const row = inventoryData.find(ingredient => ingredient.ingredient_name === name);


    return row ? row.unit_cost : null;
  }

  const getTotalCost = () => {
    const total = orderData.reduce((sum, row) => sum + row.cost, 0);
    console.log(parseFloat(total.toFixed(2)));
    return total.toFixed(2);
  };



  const handleSubmit = () => {
    const cost = getUnitCost(selectedOption) * quantity;
    let selectEmpty = false;
    let quantityEmpty = false;
    console.log(selectedOption);
    if (selectedOption.trim() === "") {
      setFoodSelectError("Please select an item");
      selectEmpty = true;
    }
    if (quantity.trim() === "") {
      setQuantityError("Please fill out box");
      quantityEmpty = true;
    }



    if (selectEmpty || foodSelectError || quantityEmpty || quantityError) {
      return;
    }


    addRow({ name: selectedOption, quantity, cost });
    setQuantity('');
    setSelectedOption('');
    closePopup();

  };

  const handleOrderSubmit = () => {
    closePopup();
  };

  const [editId, setEditId] = useState(null);


  const handleEditClick = (index) => {
    setEditId(index);
  }

  const handleSaveClick = (name, index, quantity) => {
    setEditId(null);
    updateRowCost(index, getUnitCost(name) * quantity);
  }

  

  


  return (
    <div className="inventory-page-container">
      <div className='inventoryHeaderSection'>
                <button onClick={() => navigate('/managers')} className="manager-back">
                    Back to Manager Home
                </button>
                
               
                <h1 className="inventory-header"> Amount of Inventory Needed</h1>
                
      </div>
      
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
              {foodSelectError && <p style={{ color: "red" }}>{foodSelectError}</p>}

              <label>
                Quantity:
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </label>
              {quantityError && <p style={{ color: "red" }}>{quantityError}</p>}

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
                    orderData.map((row, index) => (
                      <div className="orderTable-row" key={`${row.name}-${index}`}>
                        <div className="orderTable-cell">{row.name}</div>
                        <div className="orderTable-cell">
                          {editId === index ? (
                            <input
                              type="text"
                              value={row.quantity}
                              onChange={(e) => 
                                editRow(index, "quantity", e.target.value)
                              }
                            />
                          ) : (
                            row.quantity
                          )} 
                        </div>
                        <div className="orderTable-cell">{row.cost}</div>
                        <div className="orderTable-cell">
                          {editId === index ? (
                            <button className="editButton" onClick={() => handleSaveClick(row.name, index, row.quantity)}>Save</button>

                          ) : (
                            <button className="editButton" onClick={() => handleEditClick(index)}>Edit</button>

                          )}
                        </div>
                        <div className="orderTable-cell">
                          <button className="deleteButtonInv" onClick={() => deleteRow(index)}>Delete</button>
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