import React, { useState } from 'react';
import './ManagerReports.css';

function ManagerReports() {
  // State to store form input and report data
  const [date, setDate] = useState('');
  const [reportData, setReportData] = useState({
    totalSales: '$0',
    creditSales: '$0', // Placeholder for future extension
    cardSales: '$0',   // Placeholder for future extension
    giftCardSales: '$0', // Placeholder for future extension
    totalOrders: 0,    // Placeholder for future extension
  });
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(null); // Error state

  const handleRunReport = async () => {
    if (!date) {
      alert('Please select a date to run the report.');
      return;
    }

    setLoading(true); // Set loading state
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5001/api/get-total-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReportData((prev) => ({
        ...prev,
        totalSales: `$${data.totalSales}`, // Update only the totalSales field
      }));
    } catch (err) {
      console.error('Error fetching report data:', err);
      setError('Failed to fetch the report. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="manager-reports">
      <h1>Manager Reports</h1>
      <div className="report-form">
        <label htmlFor="date-input">Select Date:</label>
        <input
          id="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleRunReport} disabled={loading}>
          {loading ? 'Loading...' : 'Run Report'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="report-summary">
        <h2>Report Summary</h2>
        <div className="report-item">
          <span>Total Sales:</span> <span>{reportData.totalSales}</span>
        </div>
        <div className="report-item">
          <span>Sales Paid with Credit:</span> <span>{reportData.creditSales}</span>
        </div>
        <div className="report-item">
          <span>Sales Paid with Card:</span> <span>{reportData.cardSales}</span>
        </div>
        <div className="report-item">
          <span>Sales Paid with Gift Card:</span> <span>{reportData.giftCardSales}</span>
        </div>
        <div className="report-item">
          <span>Total Number of Orders:</span> <span>{reportData.totalOrders}</span>
        </div>
      </div>
    </div>
  );
}

export default ManagerReports;
