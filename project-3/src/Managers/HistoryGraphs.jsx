import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './HistoryGraphs.css';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function HistoryGraphs() {
    const navigate = useNavigate(); // Hook for navigation

    // State to store chart data
    const [chartData, setChartData] = useState(null);

    // State to store start and end date-time
    const [startDateTime, setStartDateTime] = useState('2024-01-01T00:00');
    const [endDateTime, setEndDateTime] = useState('2024-12-31T23:59');

    // Fetch initial data when component mounts
    useEffect(() => {
        fetch('http://localhost:5001/get-sales-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDateTime: '2024-01-01T00:00', // No filtering by default
                endDateTime: '2024-12-31T23:59',
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = {
                    labels: data.map((item) => item.food_name),
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

    // Handle submit button to fetch filtered data
    const handleSubmit = () => {
        fetch('http://localhost:5001/get-sales-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDateTime,
                endDateTime,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = {
                    labels: data.map((item) => item.food_name),
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
                console.error('Error fetching filtered data:', error);
            });
    };

    // Chart options
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
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 0,
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
            {/* Back Button */}
            <button onClick={() => navigate('/managers')} className="back-button">
                Back to Manager Home
            </button>

            <h1 className="history-graphs-title">Items Sold in Time Period</h1>

            {/* Display the bar chart */}
            {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}

            {/* Input boxes and submit button */}
            <div className="input-boxes">
                <div className="input-box-container">
                    <label htmlFor="datetime1" className="input-label">Select Start Date and Time</label>
                    <input
                        id="datetime1"
                        type="datetime-local"
                        className="input-box"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                    />
                </div>
                <div className="input-box-container">
                    <label htmlFor="datetime2" className="input-label">Select End Date and Time</label>
                    <input
                        id="datetime2"
                        type="datetime-local"
                        className="input-box"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                    />
                </div>
            </div>

            <div className="submit-button-container">
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
}

export default HistoryGraphs;
