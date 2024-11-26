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

router.post('/add-side', async (req, res) => {
    const query = 'INSERT INTO side (side_id, item_name, is_prem, image) SELECT COALESCE(MAX(side_id),0) + 1, $1, False, NULL FROM side RETURNING *;';
    const { item_name } = req.body; // Destructure item_name from the request body

    if (!item_name) {
        return res.status(400).json({ message: 'item_name is required' }); // Handle missing item_name
    }
    const value = [item_name];
    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly inserted side item
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding side', error: err.message });
    }
});


router.post('/add-entree', async (req, res) => {
    const query = `
        INSERT INTO entree (entree_id, item_name, is_prem, image)
        SELECT COALESCE(MAX(entree_id), 0) + 1, $1, False, NULL
        FROM entree
        RETURNING *;
    `;

    const { item_name } = req.body; // Destructure item_name from the request body

    if (!item_name) {
        return res.status(400).json({ message: 'item_name is required' }); // Handle missing item_name
    }

    const value = [item_name];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding entree', error: err.message });
    }
});

router.delete('/delete-entree', async (req, res) => {
    const query = 'DELETE FROM entree WHERE item_name = $1 RETURNING *;';
    const {item_name} = req.body;

    if(!item_name) {
        return res.status(400).json({message: 'item_name is required'});
    }

    const value = [item_name];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error deleting entree', error: err.message });
    }
});

router.delete('/delete-side', async (req, res) => {
    const query = 'DELETE FROM side WHERE item_name = $1 RETURNING *;';
    const {item_name} = req.body;

    if(!item_name) {
        return res.status(400).json({message: 'item_name is required'});
    }

    const value = [item_name];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error deleting entree', error: err.message });
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
