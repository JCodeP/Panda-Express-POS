import React, { useState } from 'react';
import './ManagerReports.css';

function ManagerReports() {
  // State to store form input and placeholder data
  const [date, setDate] = useState('');
  const [reportData, setReportData] = useState({
    totalSales: '$10,000',
    creditSales: '$4,000',
    cardSales: '$3,000',
    giftCardSales: '$3,000',
    totalOrders: 150,
  });

  const handleRunReport = () => {
    // Placeholder action for generating a report
    alert(`Running report for ${date || 'selected date'}`);
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
        <button onClick={handleRunReport}>Run Report</button>
      </div>

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
