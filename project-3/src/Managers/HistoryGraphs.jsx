import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './HistoryGraphs.css';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function HistoryGraphs() {
    // Placeholder data for testing
    const placeholderData = [
        { name: 'Orange Chicken', amount: 50 },
        { name: 'Chow Mein', amount: 30 },
        { name: 'White Rice', amount: 20 },
        { name: 'Egg Roll', amount: 15 },
        { name: 'Honey Walnut Shrimp', amount: 40 },
    ];

    // Prepare data for the bar chart
    const chartData = {
        labels: placeholderData.map(item => item.name),
        datasets: [
            {
                label: 'Amount Sold',
                data: placeholderData.map(item => item.amount),
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
                weight: 'bold'
            }
        ]
    };

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
                        size: 18,  // Larger font size for the Y-axis title
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
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Food Items',
                    font: {
                        size: 18,  // Larger font size for the X-axis title
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
                }
            }
        }
    };
    
    

    // State to hold values of the input boxes (date and time)
    const [dateTime1, setDateTime1] = useState('');
    const [dateTime2, setDateTime2] = useState('');

    // Handle change for the first date/time input
    const handleDateTimeChange1 = (e) => {
        setDateTime1(e.target.value);
    };

    // Handle change for the second date/time input
    const handleDateTimeChange2 = (e) => {
        setDateTime2(e.target.value);
    };

    return (
        <div className="history-graphs-container">
            <h1 className="history-graphs-title">Items Sold in Time Period</h1>
            <Bar data={chartData} options={options} />

            <div className="input-boxes">
                <div className="input-box-container">
                    <label htmlFor="datetime1" className="input-label">Select Start Date and Time</label>
                    <input
                        id="datetime1"
                        type="datetime-local"
                        value={dateTime1}
                        onChange={handleDateTimeChange1}
                        className="input-box"
                        placeholder="Enter Date and Time 1"
                    />
                </div>
                <div className="input-box-container">
                    <label htmlFor="datetime2" className="input-label">Select End Date and Time</label>
                    <input
                        id="datetime2"
                        type="datetime-local"
                        value={dateTime2}
                        onChange={handleDateTimeChange2}
                        className="input-box"
                        placeholder="Enter Date and Time 2"
                    />
                </div>
            </div>
        </div>
    );
}

export default HistoryGraphs;
