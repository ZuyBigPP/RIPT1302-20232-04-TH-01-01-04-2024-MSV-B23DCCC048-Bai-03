function fetchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const cities = cityInput.split(',').map(city => city.trim());

    if (cities.length === 0) {
        alert('Please enter at least one city.');
        return;
    }

    const apiKey = "4ae04986f307408ba4222015240104";
    const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey;

    const promises = cities.map(city => {
        const url = `${apiUrl}&q=${encodeURIComponent(city)}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching weather data for', city, ':', error);
                return null;
            });
    });

    Promise.all(promises)
        .then(data => {
            displayWeatherData(data);
        });
}

function displayWeatherData(weatherData) {
    const weatherInfoContainer = document.querySelector('.weather-info-container');
    weatherInfoContainer.innerHTML = ''; // Clear previous results

    weatherData.forEach(data => {
        if (data !== null) {
            const location = data.location.name + ', ' + data.location.country;
            const temperature = 'Temperature: ' + data.current.temp_c + '°C';
            const condition = 'Condition: ' + data.current.condition.text;
            const humidity = 'Humidity: ' + data.current.humidity + '%';
            const wind = 'Wind: ' + data.current.wind_kph + ' km/h';

            const weatherInfo = document.createElement('div');
            weatherInfo.classList.add('weather-info');

            weatherInfo.innerHTML = `
                <h2>Weather in ${location}:</h2>
                <p>${temperature}</p>
                <p>${condition}</p>
                <p>${humidity}</p>
                <p>${wind}</p>
            `;

            weatherInfoContainer.appendChild(weatherInfo);
        }
    });
}
