// --- Task 2: Simulate Geolocation ---
function getUserLocation() {
    const isLocationAvailable = Math.random() > 0.2; // 80% chance of success
    if (!isLocationAvailable) {
        throw new Error("Failed to detect location. Geolocation data is unavailable.");
    }
    // Return a fixed location for simulation
    return {
        latitude: 30.7333,
        longitude: 76.7794
    };
}

// --- Task 1: Generate Weather Forecast ---
function generateWeatherForecast(city, latitude, longitude) {
    if (typeof city !== 'string' || city.trim() === "") {
        throw new Error("Invalid city name. Please provide a valid city.");
    }

    const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const forecast = [];
    const currentDate = new Date();

    for (let i = 0; i < 3; i++) {
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const temperature = Math.floor(Math.random() * 35); // 0-34°C
        const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const humidity = Math.floor(Math.random() * 100); // 0-99%

        forecast.push({
            date: `${month}/${day}/${year}`,
            temperature,
            condition,
            humidity,
            latitude,
            longitude
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return forecast;
}

// --- Task 3 & 4: Handle errors and display ---
function displayForecast(city) {
    try {
        const location = getUserLocation(); // May throw geolocation error
        const forecastData = generateWeatherForecast(city, location.latitude, location.longitude);

        // Clear previous results
        const container = document.getElementById('forecast-container');
        container.innerHTML = '';

        // Display forecast
        forecastData.forEach(day => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.innerHTML = `
                <div><strong>Date:</strong> ${day.date}</div>
                <div><strong>Temp:</strong> ${day.temperature} °C</div>
                <div><strong>Condition:</strong> ${day.condition}</div>
                <div><strong>Humidity:</strong> ${day.humidity}%</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        // Display error message
        const container = document.getElementById('forecast-container');
        container.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.error(error.message);
    }
}

// --- Event listener ---
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    displayForecast(city);
});
