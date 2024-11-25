import express from 'express';


const router = express.Router(); 



const inventoryRoutes = (pool) => {

    let clients = [];
    router.get('/events', async (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

  // Send the initial list of employees to the client
        try {
            const result = await pool.query('SELECT ingredient_name, quantity, unit_cost, quantity_needed FROM inventory;');
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






    return router;

};





export default inventoryRoutes;