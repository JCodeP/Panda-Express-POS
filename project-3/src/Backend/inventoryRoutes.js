import express from 'express';


const router = express.Router(); 



const inventoryRoutes = (pool) => {

    let clients = [];

    const broadcastAddOrder = (newOrder) => {
        // Broadcast the new employee to all connected clients
        clients.forEach(client =>
            client.write(`data: ${JSON.stringify({ message: 'New order submitted', addOrder: newOrder })}\n\n`)
        );
    };
    router.get('/events/inventory', async (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

  // Send the initial list of employees to the client
        try {
            const result = await pool.query('SELECT ingredient_name, quantity, unit_cost, quantity_needed FROM inventory order by ingredient_id;');
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
    router.post('/add-inventory', async (req, res) => {
        const updateArray = req.body; // Array sent from the frontend
    
        if (!Array.isArray(updateArray)) {
            return res.status(400).send('Invalid data format');
        }
    
        try {
            // Start a transaction
            await pool.query('BEGIN');
        
            // Loop through the updated data and update the quantity
            const updateQueries = updateArray.map(item => {
              const { name, quantity } = item;
              const query = `
                UPDATE inventory 
                SET quantity = quantity + $1 
                WHERE ingredient_name = $2
              `;
              return pool.query(query, [quantity, name]);
            });
        
            // Wait for all update queries to complete
            await Promise.all(updateQueries);
            
            // Commit the transaction
            await pool.query('COMMIT');

            const result = await pool.query('SELECT ingredient_name, quantity, unit_cost, quantity_needed FROM inventory ORDER BY ingredient_id');

            broadcastAddOrder(result.rows);
            
            // Send response
            res.status(200).json({ message: 'Quantity updated successfully' });
          } catch (err) {
            // Rollback the transaction in case of error
            await pool.query('ROLLBACK');
            console.error('Error updating quantities:', err);
            res.status(500).json({ error: err.message });
          }
    });






    return router;

};





export default inventoryRoutes;