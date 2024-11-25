import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pkg from 'pg';

import employeeRoutes from './employeeRoutes.js';
import itemRoutes from './itemRoutes.js';

import { fetchWeather } from './APIs/Weather.js';
import menuRoutes from './menuRoutes.js';

const { Pool } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {rejectUnauthorized: false}
});

app.use('/api', employeeRoutes(connection));
app.use('/api', menuRoutes(connection));
app.use(itemRoutes(connection));


app.get('/api/data', async (req, res) => {
  try {
    const result = await connection.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err.message);
    res.status(500).json({ error: "Query Error", details: err.message });
  }
});



app.get('/api/weather', async (req, res) => {
  try {
    const weather = await fetchWeather(process.env.weatherApiKey); // This now calls OpenWeather API
    res.json(weather); // Send full weather data to the client
  } catch (err) {
    console.error('Error fetching weather from OpenWeather API:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather', details: err.message });
  }
});

const server = app.listen(port, () => {
  console.log("Express Server is online at Port: " + port);
});

process.on("SIGINT", async () => {
  console.log("Server is terminating");
  try {
    await connection.end();
    console.log("Terminated DB connection");
    server.close(() => {
      console.log("Server terminated.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
});