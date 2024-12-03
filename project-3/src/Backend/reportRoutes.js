import express from 'express';

// Create the router
const router = express.Router();

router.get('/get-total-sales', async(req,res) => {
    const query = 'SELECT SUM(payment_amount) FROM orders WHERE DATE(curr_time) = $1';
    const {date} = req.body;
    try{
        const result = await req.app.get('db').query(query, [date]);
        const totalSales = result.rows[0]?.total_sales || 0; // Safely extract the sum or default to 0
        res.status(200).json({ totalSales });
    } catch(err){
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error fetching order data', error: err.message });
    }
});

// Export the function that takes 'connection' as argument
export default (connection) => {
    return (req, res, next) => {
        // Store connection on the app object
        req.app.set('db', connection);
        return router(req, res, next);  // Continue to the next middleware or route handler
    };
};