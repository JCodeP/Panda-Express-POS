import express from 'express';
/**
 * @author Zachary Williams
 * 
 * The backend for the menu.
 */
// Create the router
const router = express.Router();

//database query to get all the entrees from the database
router.get('/get-entree-context', async(req, res) =>{
    try{
        const query = "SELECT * FROM entree";
        const result = await req.app.get('db').query(query);
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching entrees: ', err);
        res.status(500).json({ message: 'Error fetching entrees', error: err.message });
    }
});

//database query to get all the sides from the database
router.get('/get-side-context', async(req, res) =>{
    try{
        const query = "SELECT * FROM side";
        const result = await req.app.get('db').query(query);
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching sides: ', err);
        res.status(500).json({ message: 'Error fetching sides', error: err.message });
    }
});

//database query to get all the drinks from the database
router.get('/get-drink-context', async(req, res) =>{
    try{
        const query = "SELECT * FROM drink";
        const result = await req.app.get('db').query(query);
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching drinks: ', err);
        res.status(500).json({ message: 'Error fetching drinks', error: err.message });
    }
});

//database query to get all the appetizers from the database
router.get('/get-appetizer-context', async(req, res) =>{
    try{
        const query = "SELECT * FROM appetizer";
        const result = await req.app.get('db').query(query);
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching appetizers: ', err);
        res.status(500).json({ message: 'Error fetching appetizers', error: err.message });
    }
});

//database query to get all the menu items from the database for cashier to use
router.get('/get-menu-context', async(req, res) =>{
    try{
        const query = `SELECT * FROM menu;`
        const result = await req.app.get('db').query(query);
        res.json(result.rows);
    }catch(err){
        console.error('Error fetching menu: ', err);
        res.status(500).json({ message: 'Error fetching menu', error: err.message });
    }
});

export default (connection) => {
    return (req, res, next) => {
        // Store connection on the app object
        req.app.set('db', connection);
        return router(req, res, next); // Pass request and response to the router
    };
};