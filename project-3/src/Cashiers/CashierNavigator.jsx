import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import CashierHome from "./CashierHome";
import CashierSubmitScreen from "./CashierSubmitScreen";
import CashierComboScreen from "./CashierComboScreen";

import { fetchWeather } from "../Backend/APIs/Weather";

function CashierNavigator() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceModifier, setPriceModifier] = useState(1);

    useEffect(() => {
        console.log("CashierNavigator mounted");

        const fetchAndCalculate = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/weather");
                if (!response.ok) {
                    throw new Error(`Error fetching weather data: ${response.status}`);
                }

                const weather = await response.json();

                setWeatherData(weather);

                const modifier = calculatePriceModifier(weather);
                setPriceModifier(modifier);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                console.log("Loading state set to false");
            }
        };

        fetchAndCalculate();
    }, []);

    const calculatePriceModifier = (weather) => {
        const weatherSummary = weather.main.toLowerCase();
        const weatherDescription = weather.description.toLowerCase();

        if (weatherSummary.includes("rain") || weatherDescription.includes("rain")) {
            return 0.9; // 10% discount if it’s raining
        } else if (weatherSummary.includes("cloud") || weatherDescription.includes("cloud")
            || weatherSummary.includes("mist") || weatherDescription.includes("mist")) {
            return 0.95; // 5% discount if it’s cloudy or misty
        }

        return 1; // No discount or surcharge otherwise
    };

    return (
        <>
            <Routes>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<CashierHome priceModifier={priceModifier} />} />
                <Route path="combos" element={<CashierComboScreen priceModifier={priceModifier} />} />
                <Route path="submit" element={<CashierSubmitScreen priceModifier={priceModifier} />} />
            </Routes>

            <Outlet />
        </>
    )
}

export default CashierNavigator;