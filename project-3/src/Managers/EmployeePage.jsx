import React, { useEffect, useState } from 'react';
import './EmployeePageStyle.css';



function EmployeePage() {

    const [activePopup, setActivePopup] = useState(null);

    const openPopup = (type) => {
        setActivePopup(type);
        initialize();
    };

    const closePopup = () => {
        setActivePopup(null);
    };


    const sampleData = [
        { id: 1, name: 'Alice', age: 25, occupation: 'Engineer' },
        { id: 2, name: 'Bob', age: 30, occupation: 'Designer' },
        { id: 3, name: 'Charlie', age: 35, occupation: 'Teacher' },
        { id: 4, name: 'David', age: 40, occupation: 'Manager' },
        { id: 5, name: 'Eve', age: 22, occupation: 'Intern' },
        { id: 6, name: 'Frank', age: 28, occupation: 'Developer' },
        { id: 7, name: 'Grace', age: 32, occupation: 'Analyst' },
        { id: 8, name: 'Hannah', age: 29, occupation: 'Marketing' },
        { id: 9, name: 'Ivy', age: 31, occupation: 'Sales' },
        { id: 10, name: 'Jack', age: 26, occupation: 'Support' },
    ];
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const wsURL = 'ws://localhost:5001';
    
    useEffect(() => {
        // Listen for SSE updates when the component mounts
        const eventSource = new EventSource('http://localhost:5001/api/events'); // URL to the SSE endpoint on the backend
    
        eventSource.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log('Received SSE message:', message);
    
          // If the message contains the full employee list (on initial connection)
          if (Array.isArray(message)) {
            setData(message);  // Set the initial list of employees
          } else if (message.employee) {
            // If the message contains a new employee, add it to the list
            setData(prevEmployees => [...prevEmployees, message.employee]);
          } else if (message.deleteName) {
            // Remove the deleted employee from the table
            setData((prevEmployees) => prevEmployees.filter((emp) => emp.name !== message.deleteName));
          } else if (message.nameUpdated) {
            console.log('update condition worked');
            setData(prevData => prevData.map(row => (row.name === message.nameUpdated.name ? message.nameUpdated : row)));
          }
        };
    
        return () => {
          eventSource.close(); // Clean up when component is unmounted
        };
    }, []);


    const nameOptions = [...new Set(data.map((row) => row.name))];

    function initialize() {
        setNameInput('');
        setSelectedOption('');
        setSalaryInput('');
        setWeeklyHoursInput('');
        setEmployeeOption('');
    }


    const [nameInput, setNameInput] = useState('');

    const [salaryInput, setSalaryInput] = useState('');

    const [weeklyHoursInput, setWeeklyHoursInput] = useState('');
    
    // State to store the selected option from dropdown
    const [selectedOption, setSelectedOption] = useState('');

    const [employeeOption, setEmployeeOption] = useState('');

    // Handler for text input changes
    const handleNameChange = (e) => {
        setNameInput(e.target.value);
        
    };

    const handleSalaryChange = (e) => {
        setSalaryInput(e.target.value);
    };

    const handleHoursChange = (e) => {
        setWeeklyHoursInput(e.target.value);
    };

    // Handler for dropdown selection changes
    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleEmployeeChange = (e) => {
        setEmployeeOption(e.target.value);
    };

    const getNextId = () => {
        if (data.length === 0) return 1; // Start with 1 if the table is empty
        const maxId = Math.max(...data.map((emp) => emp.employee_id));
        return maxId + 1; // Increment the highest ID
    };

    const handleSubmit = () => {
        const id = getNextId();
        const addedData = {id, nameInput, selectedOption, salaryInput, weeklyHoursInput};

        fetch('http://localhost:5001/api/addData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedData),
          })
            .then((response) => response.json())
            .then((data) => {
                console.log('Employee added:', data);
                setNameInput('');
                setSelectedOption('');
                setSalaryInput('');
                setWeeklyHoursInput('');
            })
            .catch((error) => console.error('Error adding employee:', error));



        closePopup();

    };

    const handleDeleteEmployee = (name) => {
        if (name === 'null') {
            name = ' ';
        }
        fetch(`http://localhost:5001/api/delete/${name}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Employee deleted:', data);
            // Optimistic update handled by SSE
          })
          .catch((error) => console.error('Error deleting employee:', error));
    };
    const handleUpdate = (name, attributeName, newValue) => {
        fetch('http://localhost:5001/api/update-row', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, attributeName, newValue }),
        })
            .then(response => response.json())
            .then(data =>  {
                console.log('Row updated:', data);
            })
            .catch(error => console.error('Error updating row:', error));

        closePopup();

    };


    return (
        <div className="employeePageContainer">
            <h1 className="manager-page-header">Employee Management</h1>
            <div className="tableContainer">
                <div className="table-header">
                    <div className="table-cell">id</div>
                        <div className="table-cell">Name</div>
                        <div className="table-cell">Role</div>
                        <div className="table-cell">Salary</div>
                        <div className="table-cell">Weekly Hours</div>
                        <div className="table-cell">Actions</div>
                </div>
                <div className="table-body">
                    {data.length === 0 ? (
                        <div className="table-row">
                        <div className="table-cell" colSpan="3">No data available</div>
                        </div>
                    ) : (
                        data.map((row) => (
                            <div className="table-row" key={row.employee_id}>
                            <div className="table-cell">{row.employee_id}</div>
                            <div className="table-cell">{row.name}</div>
                            <div className="table-cell">{row.role}</div>
                            <div className="table-cell">{row.pay_rate}</div>
                            <div className="table-cell">{row.weekly_hours}</div>
                            <div className="table-cell">
                                <button className="deleteButton" onClick={() => handleDeleteEmployee(row.name)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="buttonContainer">
                <button onClick={() => openPopup('add')}> Add Employee</button>

                {activePopup == 'add' && (
                    <div className="employeePopUp">
                        <div className="employeePopupContent">
                            <div className="popupHeader">
                                <h2>Enter Employee Information</h2>
                                <button className="x" onClick={closePopup}>&times;</button>
                                


                            </div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                />
                            </label>
                            <label>
                                Position:
                                <select value={selectedOption} onChange={handleDropdownChange}>
                                    <option value="">Select an option</option>
                                    <option value="Cashier">Cashier</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Cook">Cook</option>
                                    <option value="Janitor">Janitor</option>
                                    
                                </select>
                            </label>
                            <label>
                                Salary:
                                <input
                                    type="text"
                                    value={salaryInput}
                                    onChange={handleSalaryChange}
                                />
                            </label>
                            <label>
                                Weekly Hours:
                                <input
                                    type="text"
                                    value={weeklyHoursInput}
                                    onChange={handleHoursChange}
                                />
                            </label>
                            <button className="employeeSubmit" onClick={handleSubmit}>Submit</button>
                            

                        </div>
                    </div>    
                )}
                

            
                <button onClick={() => openPopup('salary')}> Change Salary</button>


                {activePopup == 'salary' && (
                    <div className="employeePopUp">
                        <div className="employeePopupContent">
                            <div className="popupHeader">
                                <h2>Select an employee and new salary</h2>
                                <button className="x" onClick={closePopup}>&times;</button>
                            </div>
                            <label>
                                List of employee names:
                                <select value={employeeOption} onChange={handleEmployeeChange}>
                                    <option value="">Select...</option> {/* Placeholder option */}
                                    {nameOptions.map((name, index) => (
                                        <option key={index} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Salary:
                                <input
                                    type="text"
                                    value={salaryInput}
                                    onChange={handleSalaryChange}
                                />
                            </label>
                            <button className="employeeSubmit" onClick={() => handleUpdate(employeeOption, 'pay_rate', salaryInput)}>Submit</button>
                            
                        </div>
                    </div>    
                )}
                <button onClick={() => openPopup('hours')}> Change Weekly Hours</button>
                {activePopup == 'hours' && (
                    <div className="employeePopUp">
                        <div className="employeePopupContent">
                            <div className="popupHeader">
                                <h2>Select an employee and new hours</h2>
                                <button className="x" onClick={closePopup}>&times;</button>
                            </div>
                            <label>
                                List of employee names:
                                <select value={employeeOption} onChange={handleEmployeeChange}>
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
                                    value={weeklyHoursInput}
                                    onChange={handleHoursChange}
                                />
                            </label>
                            <button className="employeeSubmit" onClick={() => handleUpdate(employeeOption, 'weekly_hours', weeklyHoursInput)}>Submit</button>
                            
                        </div>
                    </div>    
                )}
            </div>
        </div>

    );
}


export default EmployeePage;