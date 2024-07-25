const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    fetchWeather('Pune');

    $('#city-input-btn').click(function () {
        const cityName = $('#city-input').val();
        fetchWeather(cityName);
    });
});

/**
 * Fetches the weather data for the given city and displays it.
 * @param {string} cityName - Name of the city to fetch weather data for.
 */
function fetchWeather(cityName) {
    const weatherUrl = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
            console.error('Error fetching weather data:', error);
        });
}

/**
 * Displays the weather information on the webpage.
 * @param {object} data - Weather data from the API.
 */
function displayWeather(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}
