import express from 'express';

// Create the router
const router = express.Router();

// Define the POST route for /get-sales-data
router.post('/get-sales-data', async (req, res) => {
    try {
        // Use the 'connection' object to query the database
        const result = await req.app.get('db').query('SELECT food_name, COUNT(*) AS amount_sold FROM food GROUP BY food_name ORDER BY food_name;');
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
