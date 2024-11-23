import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './HistoryGraphs.css';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function HistoryGraphs() {
    // State to store fetched data
    const [chartData, setChartData] = useState(null);

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        fetch('http://localhost:5001/get-sales-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = {
                    labels: data.map((item) => item.food_name),  // Ensure you're using the correct key
                    datasets: [
                        {
                            label: 'Amount Sold',
                            data: data.map((item) => item.amount_sold),
                            backgroundColor: 'black',
                            borderColor: 'black',
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity Sold',
                    font: {
                        size: 18,
                        weight: 'bold',
                        family: 'Arial',
                    },
                },
                ticks: {
                    font: {
                        size: Math.max(10, 1.4 * (window.innerWidth / 100)),
                        weight: 'bold',
                        family: 'Arial',
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Food Items',
                    font: {
                        size: 18,
                        weight: 'bold',
                        family: 'Arial',
                    },
                },
                ticks: {
                    font: {
                        size: Math.max(10, 1.4 * (window.innerWidth / 100)),
                        weight: 'bold',
                        family: 'Arial',
                    },
                },
            },
        },
    };

    return (
        <div className="history-graphs-container">
            <h1 className="history-graphs-title">Items Sold in Time Period</h1>
            
            {/* Display the bar chart */}
            {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}

            {/* Buttons (non-functional for now) */}
            <div className="input-boxes">
                <div className="input-box-container">
                    <label htmlFor="datetime1" className="input-label">Select Start Date and Time</label>
                    <input
                        id="datetime1"
                        type="datetime-local"
                        className="input-box"
                        placeholder="Enter Date and Time 1"
                    />
                </div>
                <div className="input-box-container">
                    <label htmlFor="datetime2" className="input-label">Select End Date and Time</label>
                    <input
                        id="datetime2"
                        type="datetime-local"
                        className="input-box"
                        placeholder="Enter Date and Time 2"
                    />
                </div>
            </div>
        </div>
    );
}

export default HistoryGraphs;
