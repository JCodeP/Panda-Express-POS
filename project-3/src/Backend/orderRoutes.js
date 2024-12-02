import express from 'express';

const router = express.Router();

const orderRoutes = (pool) => {
    router.post('/process-order', async (req, res) => {
        const {totalCost, paymentType} = req.body;
        const currentTime = new Date().toISOString();
        try {
            const employeeId = Math.floor(Math.random() * 4) + 1;
            const maxQuery = await pool.query('SELECT MAX(order_id) AS max_id FROM orders');
            const maxId = maxQuery.rows[0].max_id || 0; 
            const orderId = maxId + 1;
            const query = `
                INSERT INTO orders (order_id, curr_time, employee_id, payment_amount, payment_type)
                VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `;
            const data = await pool.query(query, [orderId, currentTime, employeeId, totalCost, paymentType]);
            if (data.rows.length > 0) {
                res.status(200).json({message: "Success", order: data.rows[0],});
            } else {
                res.status(500).send({error: "Error inserting data"});
            }
        } catch (err) {
            res.status(500).send({error: "Error handling order", details: err.message});
        }
    });
    return router;
};

export default orderRoutes;
