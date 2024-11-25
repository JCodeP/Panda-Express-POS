export const fetchWeather = async (apiKey) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=College Station&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract only the necessary data
        const weatherInfo = {
            main: data.weather[0].main,
            description: data.weather[0].description,
        };

        return weatherInfo; // Return full weather data
    } catch (error) {
        console.error("Error fetching weather from OpenWeather API:", error.message);
        throw error;
    }
};