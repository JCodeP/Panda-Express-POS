
export const fetchWeather = async () => {
    try {
        const response = await fetch("http://localhost:5001/api/weather");
        if (!response.ok) {
            throw new Error(`Error fetching weather data from backend: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather from backend:", error);
        throw error;
    }
};