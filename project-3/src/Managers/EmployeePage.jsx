import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeePageStyle.css';



function EmployeePage() {

    const [activePopup, setActivePopup] = useState(null);
    const navigate = useNavigate();

    const openPopup = (type) => {
        setActivePopup(type);
        initialize();
    };

    const closePopup = () => {
        setActivePopup(null);
    };




    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const wsURL = 'ws://localhost:5001';

    useEffect(() => {
        // Listen for SSE updates when the component mounts
        const eventSource = new EventSource('https://panda-webapp-deployment-3ro1.onrender.com/api/events'); // URL to the SSE endpoint on the backend

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
        setPositionError('');
        setNameSelectError('');
        setError('');
        setNameError('');
        setHoursError('');
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

    const [error, setError] = useState(null);

    const [hoursError, setHoursError] = useState(null);

    const [nameError, setNameError] = useState(null);

    const [positionError, setPositionError] = useState(null);

    const [nameSelectError, setNameSelectError] = useState(null);


    // Handler for text input changes
    const handleNameChange = (e) => {
        setNameInput(e.target.value);
        setNameError("");

    };

    const handleSalaryChange = (e) => {

        setSalaryInput(e.target.value);
        if (/^(?!0(\.0+)?$)0\d+/.test(e.target.value)) {
            setError("Please do not enter leading zeroes before decimal place");
            console.log("yesyes");
            return;
        }
        if (/^$/.test(e.target.value) || /^\d*\.?\d{0,2}$/.test(e.target.value)) { // Allows only numbers
            setError(""); // Clear error if valid
            console.log("yesno");
            return;

        }
        if (/^\d*\.\d{3,}(?=\d*[^0]$)/.test(e.target.value)) {
            setError("Cannot enter more than 2 decimal places");
            return;

        }
        else if (/[^0-9.]|(\..*\..*)/.test(e.target.value)) {
            setError("Please enter a valid number.");
        }
    };

    const handleHoursChange = (e) => {
        setWeeklyHoursInput(e.target.value);
        if (/^(?!0(\.0+)?$)0\d+/.test(e.target.value)) {
            setHoursError("Please do not enter leading zeroes");
            return;
        }
        if (/(\.\d+|\d+\.)/.test(e.target.value)) {
            setHoursError("Please enter whole numbers no decimals");
            return;
        }
        if (/[^0-9]/.test(e.target.value)) {
            setHoursError("Please enter a valid number.");
            return;

        }
        if (/^$/.test(e.target.value) || /[0-9]/.test(e.target.value)) {
            setHoursError('');
        }

    };

    // Handler for dropdown selection changes
    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
        if (e.target.value !== "") {
            setPositionError("");
        }
    };

    const handleEmployeeChange = (e) => {
        setEmployeeOption(e.target.value);
        if (nameSelectError !== "") {
            setNameSelectError("");
        }
    };

    const getNextId = () => {
        if (data.length === 0) return 1; // Start with 1 if the table is empty
        const maxId = Math.max(...data.map((emp) => emp.employee_id));
        return maxId + 1; // Increment the highest ID
    };

    const handleSubmit = () => {
        const id = getNextId();
        let salary = salaryInput;
        const [left, right] = salaryInput.split('.');
        console.log(isNaN(salary));
        if (salary.endsWith('.')) {
            setError("Number can't end with dot");
            return;
        }
        if (!right) {
            salary = `${left}.00`;

        }
        else if (right.length === 1) {
            salary = `${left}.${right}0`;

        }


        const addedData = { id, nameInput, selectedOption, salary, weeklyHoursInput };
        let salaryEmpty;
        let hoursEmpty;
        let nameEmpty;
        let positionEmpty;


        if (salaryInput.trim() === "") {
            setError("Please fill out box.");
            salaryEmpty = true;
        }
        if (weeklyHoursInput.trim() === "") {
            setHoursError("Please fill out box");
            hoursEmpty = true;
        }
        if (nameInput.trim() === "") {
            setNameError("Please fill out box");
            nameEmpty = true;
        }
        if (selectedOption.trim() === "") {
            setPositionError("Please select a role");
            positionEmpty = true;
        }
        if (salaryEmpty || hoursEmpty || nameEmpty || positionEmpty) {
            return;
        }
        if (error || hoursError || positionError || nameError) {
            return;
        } else {
            fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/addData', {
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

        }



    };

    const handleDeleteEmployee = (name) => {
        if (name === 'null') {
            name = ' ';
        }
        fetch(`https://panda-webapp-deployment-3ro1.onrender.com/api/delete/${name}`, {
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
        let salaryEmpty;
        let positionEmpty;
        let hoursEmpty;
        if (employeeOption.trim() === "") {
            positionEmpty = true;
            setNameSelectError("Please select a name");
        }
        if (attributeName === 'pay_rate') {
            let salary = salaryInput;
            const [left, right] = salaryInput.split('.');
            console.log(isNaN(salary));
            if (!right) {
                salary = `${left}.00`;

            }
            else if (right.length === 1) {
                salary = `${left}.${right}0`;
            }
            if (error) {
                return;
            } else if (salaryInput.trim() === "") {
                salaryEmpty = true;
                setError("Please fill out box");
            }
        } else if (attributeName === 'weekly_hours') {
            if (hoursError) {
                return;
            } else if (weeklyHoursInput.trim() === "") {
                hoursEmpty = true;
                setHoursError("Please fill out box");
            }
        }
        if (salaryEmpty || positionEmpty || hoursEmpty) {
            return;
        }
        fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/update-row', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, attributeName, newValue }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Row updated:', data);
            })
            .catch(error => console.error('Error updating row:', error));

        closePopup();

    };


    return (
        <div className="employeePageContainer">
            <div className='headerSection'>
                <button onClick={() => navigate('/managers')} className="manager-back">
                    Back to Manager Home
                </button>


                <h1 className="manager-page-header">Employee Management</h1>

            </div>
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
                            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
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
                            {positionError && <p style={{ color: "red" }}>{positionError}</p>}
                            <label>
                                Salary:
                                <input
                                    type="text"
                                    value={salaryInput}
                                    onChange={handleSalaryChange}
                                />
                            </label>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <label>
                                Weekly Hours:
                                <input
                                    type="text"
                                    value={weeklyHoursInput}
                                    onChange={handleHoursChange}
                                />
                            </label>
                            {hoursError && <p style={{ color: "red" }}>{hoursError}</p>}
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
                            {nameSelectError && <p style={{ color: "red" }}>{nameSelectError}</p>}
                            <label>
                                Salary:
                                <input
                                    type="text"
                                    value={salaryInput}
                                    onChange={handleSalaryChange}
                                />
                            </label>
                            {error && <p style={{ color: "red" }}>{error}</p>}
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
                            {nameSelectError && <p style={{ color: "red" }}>{nameSelectError}</p>}
                            <label>
                                Weekly Hours:
                                <input
                                    type="text"
                                    value={weeklyHoursInput}
                                    onChange={handleHoursChange}
                                />
                            </label>
                            {hoursError && <p style={{ color: "red" }}>{hoursError}</p>}
                            <button className="employeeSubmit" onClick={() => handleUpdate(employeeOption, 'weekly_hours', weeklyHoursInput)}>Submit</button>

                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}


export default EmployeePage;