
export const fetchWeather = async () => {
    const apiKey = process.env.weatherApiKey;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=College Station&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.status}`);
        }
        const data = await response.json();
        
        const desiredData = extractInfo(data);
        console.log(desiredData);

        return desiredData;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

const extractInfo = (data) => {
    const {
        weather: [{ main: weatherMain, description }],
        main: { temp, feels_like, temp_min, temp_max },
        wind: { speed: windSpeed },
    } = data;

    const highlightedInfo = {
        weather: {
            summary: weatherMain,
            description: description,
        },
        temperature: {
            current: temp,
            feelsLike: feels_like,
            min: temp_min,
            max: temp_max,
        },
        wind: {
            speed: windSpeed
        },
    };

    return highlightedInfo;
};