import express from 'express';
/**
 * @author Zachary Williams
 * 
 * The backend for the manager reports screen.
 */
// Create the router
const router = express.Router();

//database query that runs the report
router.get('/get-total-sales', async(req,res) => {
    const query = `SELECT 
        SUM(payment_amount) AS total_sales,
        SUM(CASE WHEN payment_type = 'card' THEN payment_amount ELSE 0 END) AS credit_sales,
        SUM(CASE WHEN payment_type = 'cash' THEN payment_amount ELSE 0 END) AS cash_sales,
        SUM(CASE WHEN payment_type = 'gift card' THEN payment_amount ELSE 0 END) AS gift_card_sales,
        COUNT(*) AS total_orders
        FROM orders
        WHERE DATE(curr_time) = $1;`

    //const query = `SELECT SUM(payment_amount) AS total_sales, SUM(CASE WHEN payment_type = 'credit' THEN payment_amount ELSE 0 END) AS credit_sales FROM orders WHERE DATE(curr_time) = $1`;
    const {date} = req.query;
    try{
        const result = await req.app.get('db').query(query, [date]);
        const totalSales = result.rows[0]?.total_sales || 0; // Safely extract the sum or default to 0
        const creditSales = result.rows[0]?.credit_sales || 0;
        const cashSales = result.rows[0]?.cash_sales || 0;
        const giftCardSales = result.rows[0]?.gift_card_sales || 0;
        const totalOrders = result.rows[0]?.total_orders || 0;
        res.status(200).json({ totalSales, creditSales, cashSales, giftCardSales, totalOrders });
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