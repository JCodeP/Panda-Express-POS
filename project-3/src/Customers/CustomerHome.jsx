import React, { useState, useEffect } from 'react';
import {Routes, Route, Outlet, Navigate} from "react-router-dom";
import Welcome from "./Welcome.jsx";
import Menu from "./Menu/Menu.jsx";
import Payment from "./Payment.jsx";
import OrderComplete from "./OrderComplete.jsx";

function CustomerHome() {
    //weather
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceModifier, setPriceModifier] = useState(1);

    useEffect(() => {
        console.log("CashierNavigator mounted");

        // Makes API call to weather api and calculates the price modifier
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

    // Calculates discount based on weather data
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


    //lang
    const [language, setLanguage] = useState("en");

    const changeLanguage = () => {
        if(language === "en") {
            setLanguage("es");
        }
        else {
            setLanguage("en");
        }
    }

    return (
        <>
            <Routes>
                <Route index element={<Navigate to="welcome" replace />} />
                <Route path = "welcome" element = {<Welcome language={language} changeLanguage={changeLanguage} />} />
                <Route path = "menu" element = {<Menu language={language} changeLanguage={changeLanguage} />} />
                <Route path = "payment" element = {<Payment language={language} changeLanguage={changeLanguage} priceModifier={priceModifier} />} />
                <Route path = "orderComplete" element = {<OrderComplete language={language} changeLanguage={changeLanguage} />} />
            </Routes>

            <Outlet />
        </>
        
    );
}

export default CustomerHome;