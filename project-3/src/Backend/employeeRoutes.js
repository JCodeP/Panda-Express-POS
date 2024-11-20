import express from 'express';

const router = express.Router();  // Express router to handle routes

// This function will be called from the main file with the pool instance
const employeeRoutes = (pool) => {

  // POST endpoint to add a new employee
    let clients = [];
    router.get('/events', async (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

  // Send the initial list of employees to the client
        try {
            const result = await pool.query('SELECT * FROM employees ORDER BY employee_id;');
            console.log('sending data');
            res.write(`data: ${JSON.stringify(result.rows)}\n\n`);
        } catch (err) {
            console.error('Error fetching data from database:', err);
            res.write(`data: ${JSON.stringify({ message: 'Error fetching employee data' })}\n\n`);
        }

    // Add the new client to the list
        clients.push(res);

    // Remove the client when the connection is closed
        req.on('close', () => {
            clients = clients.filter(pool => pool !== res);
        });
    });


  


    const broadcastNewEmployee = (newEmployee) => {
        // Broadcast the new employee to all connected clients
        clients.forEach(client =>
            client.write(`data: ${JSON.stringify({ message: 'New employee added', employee: newEmployee })}\n\n`)
        );
    };

    const broadcastDelete = (delName) => {
        clients.forEach(client =>
            client.write(`data: ${JSON.stringify({ message: 'employee deleted: ', deleteName: delName })}\n\n`)
        );
    }
  
    router.post('/addData', async (req, res) => {
        console.log("recieved data:", req.body);
        const { id, nameInput, selectedOption, salaryInput, weeklyHoursInput } = req.body;
  
        // Insert data into PostgreSQL
        const query = 'INSERT INTO employees (employee_id, name, role, pay_rate, weekly_hours) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        try {
            const result = await pool.query(query, [id, nameInput, selectedOption, salaryInput, weeklyHoursInput ]);
  
            broadcastNewEmployee(result.rows[0]);
            res.status(201).json({
            message: 'Data added successfully',
            data: result.rows[0],
        });
        } catch (err) {
            console.error('Error executing query', err.stack);
            res.status(500).json({
            message: 'Error adding data',
            error: err.message,
            });
        }
    });

    // DELETE endpoint to remove an employee by ID
    router.delete('/delete/:name', async (req, res) => {
        const { name } = req.params;
        console.log(req.params);
  
        if (!name) {
            return res.status(400).send({ error: 'name is required' });
        }
  
        const query = 'DELETE FROM employees WHERE name = $1 RETURNING *';
        try {

            const result = await pool.query(query, [name]);
  
            if (result.rowCount === 0) {
                return res.status(404).send({ error: 'Employee not found' });
            }
  
      // Notify all SSE clients about the deleted employee
            
            broadcastDelete(name);
  
            res.status(200).json({ success: true, data: result.rows[0] });
        } catch (err) {
            console.error('Error executing query', err.stack);
            res.status(500).json({ error: 'Unable to delete employee' });
        }
    });
  


    // Optionally, you can define other routes here, like GET, PUT, DELETE

    return router;  // Return the router with all defined routes
};

// Export the function that sets up the routes
export default employeeRoutes;
