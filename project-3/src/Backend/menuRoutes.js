import express from 'express';

// Create the router
const router = express.Router();

// Define the GET route for /get-food-data
router.get('/get-food-data', async (req, res) => {
    const query = 'SELECT item_name, is_prem FROM entree UNION ALL SELECT item_name, is_prem FROM side;';
    try {
        const result = await req.app.get('db').query(query); // Use the connection stored in app
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error fetching food data', error: err.message });
    }
});

// Define the GET route for /get-menu-data
router.get('/get-menu-data', async (req, res) => {
    const query = 'SELECT item_name, price FROM combo UNION ALL SELECT item_name, price FROM drink UNION ALL SELECT item_name, price FROM appetizer;';
    try {
        const result = await req.app.get('db').query(query); // Use the connection stored in app
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error fetching menu data', error: err.message });
    }
});

router.post('/add-food-item', async (req, res) =>{
    console.log('add food item request sent');
});

// Export the function that takes 'connection' as argument
export default (connection) => {
    return (req, res, next) => {
        // Store connection on the app object
        req.app.set('db', connection);
        return router(req, res, next);  // Continue to the next middleware or route handler
    };
};
