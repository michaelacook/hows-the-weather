let unit = "metric";
let country;
let city;
const toggle = document.getElementById('toggle');
const getWeather = document.getElementById('get-weather');

// Fetch data
const getWeatherData = (city, countryCode) => {
    const key = "420a714be7f2e48ad0bbdbb97741730c";
    const url = `${protocol}//api.openweathermap.org/data/2.5/weather?q=
        ${city},${countryCode}&units=${unit}&appid=${key}`;
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                const weather = response.weather[0];
                createWeatherDiv(response);
            } else {
                displayError(request.status);
            }
        }
    }
}

getWeather.addEventListener('click', (e) => {
    getWeather.blur();
    country = document.getElementById('country').value.toLowerCase();
    city = document.getElementById('city').value;
    getWeatherData(city, country);
});

// Toggle metric/imperial
toggle.onchange = () => {
    toggle.checked ? unit = 'metric' : unit = 'imperial';
    if (city && country) {
        getWeatherData(city, country);
    }
};

// Prevent form submission
document.querySelector('form').addEventListener('submit', e => e.preventDefault());
