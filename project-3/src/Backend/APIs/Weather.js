
export const fetchWeather = async () => {
    const apiKey = process.env.weatherApiKey;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=College Station&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        return data; // Return the full data for debugging
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};