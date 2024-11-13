import React, { useEffect, useState } from 'react';
import './EmployeePageStyle.css';
import './ManagerHome.css';



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
    
    useEffect(() => {
        // Set to sampleData to see the table with data
        setData(sampleData); // You can set it to [] to test with no data
    }, []);

    const nameOptions = [...new Set(sampleData.map((row) => row.name))];

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
    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    };

    const handleSalaryChange = (event) => {
        setSalaryInput(event.target.value);
    };

    const handleHoursChange = (event) => {
        setWeeklyHoursInput(event.target.value);
    };

    // Handler for dropdown selection changes
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setEmployeeOption(event.target.value);
    };

    return (
        <div className="employeePageContainer">
            <h1 className="manager-page-header">Employee Management</h1>
            <div className="tableContainer">
                <div className="table-header">
                    <div className="table-cell">Name</div>
                        <div className="table-cell">Position</div>
                        <div className="table-cell">Salary</div>
                        <div className="table-cell">Weekly Hours</div>
                </div>
                <div className="table-body">
                    {data.length === 0 ? (
                        <div className="table-row">
                        <div className="table-cell" colSpan="3">No data available</div>
                        </div>
                    ) : (
                        data.map((row) => (
                            <div className="table-row" key={row.id}>
                            <div className="table-cell">{row.id}</div>
                            <div className="table-cell">{row.name}</div>
                            <div className="table-cell">{row.email}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="buttonContainer">
                <button onClick={() => openPopup('add')}> Add Employee</button>

                {activePopup == 'add' && (
                    <div className="popUp">
                        <div className="popupContent">
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
                                    <option value="cashier">Cashier</option>
                                    <option value="manager">Manager</option>
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

                        </div>
                    </div>    
                )}
                <button onClick={() => openPopup('delete')}> Delete Employee</button>

                {activePopup == 'delete' && (
                    <div className="popUp">
                        <div className="popupContent">
                            <div className="popupHeader">
                                <h2>Select an employee to delete</h2>
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


                        </div>


                    </div>    
                
                
                
                )}
                

            
                <button onClick={() => openPopup('salary')}> Change Salary</button>
                {activePopup == 'salary' && (
                    <div className="popUp">
                        <div className="popupContent">
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
                                Weekly Hours:
                                <input
                                    type="text"
                                    value={weeklyHoursInput}
                                    onChange={handleHoursChange}
                                />
                            </label>
                            
                        </div>
                    </div>    
                )}
                <button onClick={() => openPopup('hours')}> Change Weekly Hours</button>
                {activePopup == 'hours' && (
                    <div className="popUp">
                        <div className="popupContent">
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
                                Salary:
                                <input
                                    type="text"
                                    value={salaryInput}
                                    onChange={handleSalaryChange}
                                />
                            </label>
                            
                        </div>
                    </div>    
                )}
            </div>
        </div>

    );
}


export default EmployeePage;