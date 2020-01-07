var unit = "metric";
const toggle = document.getElementById('toggle');

const getWeatherData = (city, countryCode) => {
    const key = "420a714be7f2e48ad0bbdbb97741730c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${key}&units=${unit}`;
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.responseText);
            const weather = response.weather[0];
            createWeatherDiv(response);
            // changeBackground(weather);
            console.log(response);
        }
    }
}

document.getElementById('get-weather').addEventListener('click', (e) => {
    let country = document.getElementById('country').value.toLowerCase();
    let city = document.getElementById('city').value;
    getWeatherData(city, country)
});

// Toggle metric/imperial
toggle.onchange = () => {
    toggle.checked ? unit = 'metric' : unit = 'imperial';
};
