import express from 'express';
/**
 * @author Zachary Williams
 * 
 * The backend for the items sold screen.
 */
// Create the router
const router = express.Router();

// Define the POST route for /get-sales-data
router.post('/get-sales-data', async (req, res) => {
    console.log('Received POST request for /get-sales-data');
    const { startDateTime, endDateTime } = req.body;
    if (!startDateTime || !endDateTime) {
        return res.status(400).json({ message: 'Start and end date-times are required' });
    }
    try {
        // Use the 'connection' object to query the database
        //const result = await req.app.get('db').query('SELECT food_name, COUNT(*) AS amount_sold FROM food GROUP BY food_name ORDER BY food_name;');
        const values = [startDateTime, endDateTime];
        const query = `SELECT f.food_name, COUNT(*) AS amount_sold FROM orders o JOIN meal_options mo ON o.order_id = mo.order_id JOIN food f ON mo.meal_id = f.meal_id WHERE o.curr_time BETWEEN $1 AND $2 GROUP BY f.food_id, f.food_name ORDER BY f.food_id;`;
        const result = await req.app.get('db').query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching sales data: ', err);
        res.status(500).json({ message: 'Error fetching sales data', error: err.message });
    }
});

// Export the function that takes 'connection' as argument
export default (connection) => {
    return (req, res, next) => {
        // Store connection on the app object
        req.app.set('db', connection);
        return router(req, res, next); // Pass request and response to the router
    };
};
