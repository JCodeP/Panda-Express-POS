import express from 'express';
/**
 * @author Zachary Williams
 * 
 * The backend for the manage menu screen.
 */
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

//database query to add a side
router.post('/add-side', async (req, res) => {
    const query = 'INSERT INTO side (side_id, item_name, is_prem, image, alt_text) SELECT COALESCE(MAX(side_id),0) + 1, $1, False, $2, $3 FROM side RETURNING *;';
    const { item_name, image, alt_text } = req.body; // Destructure item_name from the request body

    if (!item_name) {
        return res.status(400).json({ message: 'item_name is required' }); // Handle missing item_name
    }
    const value = [item_name, image, alt_text];
    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly inserted side item
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding side', error: err.message });
    }
});

//database query to add an entree
router.post('/add-entree', async (req, res) => {
    const query = `
        INSERT INTO entree (entree_id, item_name, is_prem, image, alt_text)
        SELECT COALESCE(MAX(entree_id), 0) + 1, $1, False, $2, $3
        FROM entree
        RETURNING *;
    `;

    const { item_name, image, alt_text } = req.body; // Destructure item_name from the request body

    if (!item_name) {
        return res.status(400).json({ message: 'item_name is required' }); // Handle missing item_name
    }

    const value = [item_name, image, alt_text];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding entree', error: err.message });
    }
});

//database query to add a drink
router.post('/add-drink', async (req, res) => {
    const query = `
        INSERT INTO drink (drink_id, item_name, price, image, alt_text)
        SELECT COALESCE(MAX(drink_id), 0) + 1, $1, $2, $3, $4
        FROM drink
        RETURNING *;
    `;

    const { item_name, price, image, alt_text } = req.body; // Destructure item_name from the request body

    if (!item_name || !price) {
        return res.status(400).json({ message: 'Please fill out all required fields' }); // Handle missing item_name
    }

    const value = [item_name, price, image, alt_text];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding drink', error: err.message });
    }
});

//database query to add a menu item for cashier to use
router.post('/add-menu-item', async(req, res) =>{
    const query = `INSERT INTO MENU (id, item_name, price, category) SELECT COALESCE(MAX(id), 0) + 1, $1, $2, $3 FROM menu RETURNING *;`
    const {item_name, price, category} = req.body;
    const value = [item_name, price, category];
    try{
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]);
    } catch(err){
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding menu item', error: err.message });
    }
});

//database query to add an appetizer
router.post('/add-appetizer', async (req, res) => {
    const query = `
        INSERT INTO appetizer (app_id, item_name, price, image, alt_text)
        SELECT COALESCE(MAX(app_id), 0) + 1, $1, $2, $3, $4
        FROM appetizer
        RETURNING *;
    `;

    const { item_name, price, image, alt_text } = req.body; // Destructure item_name from the request body

    if (!item_name || !price) {
        return res.status(400).json({ message: 'Please fill out all required fields' }); // Handle missing item_name
    }

    const value = [item_name, price, image, alt_text];

    try {
        const result = await req.app.get('db').query(query, value);
        res.status(200).json(result.rows[0]); // Return the newly added row
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: 'Error adding appetizer', error: err.message });
    }
});

//database query to delete an item
router.delete('/delete-item', async (req, res) => {
    const { item_name } = req.body;

    if (!item_name) {
        return res.status(400).json({ message: 'Item_name is required' });
    }

    try {
        const db = req.app.get('db');

        let result = await db.query('DELETE FROM menu WHERE item_name = $1 RETURNING *;', [item_name]);

        // Check and delete from `entree`
        result = await db.query('DELETE FROM entree WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item deleted from entree', deletedItem: result.rows[0] });
        }

        // Check and delete from `side`
        result = await db.query('DELETE FROM side WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item deleted from side', deletedItem: result.rows[0] });
        }

        result = await db.query('DELETE FROM drink WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item deleted from drink', deletedItem: result.rows[0] });
        }

        result = await db.query('DELETE FROM appetizer WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item deleted from appetizer', deletedItem: result.rows[0] });
        }


        // Item not found in either table
        res.status(404).json({ message: 'Item not found in either table' });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
});

//database query to change an items premium status
router.post('/change-premium', async(req, res) => {
    const {item_name} = req.body;
    try {
        const db = req.app.get('db');

        // Check from `entree`
        let result = await db.query('UPDATE entree SET is_prem = NOT is_prem WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item changed from entree', deletedItem: result.rows[0] });
        }

        // Check from `side`
        result = await db.query('UPDATE side SET is_prem = NOT is_prem WHERE item_name = $1 RETURNING *;', [item_name]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item changed from side', deletedItem: result.rows[0] });
        }

        // Item not found in either table
        res.status(404).json({ message: 'Item not found in either table' });

    } catch(err){
        console.error('Error changing premium:', err);
        res.status(500).json({ message: 'Error changing premium', error: err.message });
    }

});

//database query to change the price of an item
router.post('/change-price', async(req, res) => {
    const{item_name, price} = req.body;
    const values = [item_name, price];
    try{
        const db = req.app.get('db');
        let result = await db.query('UPDATE menu SET price = $2 WHERE item_name = $1',values);
        result = await db.query('UPDATE drink SET price = $2 WHERE item_name = $1 RETURNING *;', values);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item changed from drink', deletedItem: result.rows[0] });
        }

        result = await db.query('UPDATE appetizer SET price = $2 WHERE item_name = $1 RETURNING *;', values);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Item changed from appetizer', deletedItem: result.rows[0] });
        }

        res.status(404).json({ message: 'Item not found in either table' });

    } catch(err){
        console.error('Error changing price:', err);
        res.status(500).json({ message: 'Error changing price', error: err.message });
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
