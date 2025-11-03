async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        // 1. Get latitude & longitude from city name
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultDiv.innerHTML = "City not found!";
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Fetch weather data using lat & lon
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const { temperature, windspeed } = weatherData.current_weather;

        // 3. Show results
        resultDiv.innerHTML = `
            <p><strong>${name}, ${country}</strong></p>
            <p>🌡 Temperature: ${temperature}°C</p>
            <p>💨 Wind Speed: ${windspeed} km/h</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Error fetching data.";
        console.error(error);
    }
}
