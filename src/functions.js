/* API docs: https://openweathermap.org/current#list */


// Get http and set protocol for api request
let protocol;
window.location.protocol === 'https:' ? protocol = 'https:'
    : protocol = 'http:';

// Format time in 12 hour time
const formatTime = (timeStamp) => {
    let hours;
    let minutes;
    let amPm;
    const unformatted = new Date(timeStamp * 1000);
    if (unformatted.getHours() === 0) {
        hours = 12;
    } else if (unformatted.getHours() < 12) {
        hours = unformatted.getHours();
    } else if (unformatted.getHours() > 12) {
        hours = unformatted.getHours() - 12;
    }
    unformatted.getMinutes() < 10 ? minutes = `0${unformatted.getMinutes()}`
        : minutes = unformatted.getMinutes();
    unformatted.getHours() > 11 ? amPm = 'pm'
        : amPm = 'am';
    return `${hours}:${minutes} ${amPm}`;
}

// Get data from api response and process for display
const processData = (response) => {
    let tempUnit;
    unit === 'metric' ? tempUnit = '℃' : tempUnit = '℉';
    const country = response.sys.country;
    const sunrise = formatTime(response.sys.sunrise);
    const sunset = formatTime(response.sys.sunset);
    const weather = response.weather[0];
    const iconSrc = `${protocol}//openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const icon = `<img src=${iconSrc} />`;
    const temperature = Math.round(response.main.temp);
    const feelsLike = Math.round(response.main.feels_like);
    const windSpeed = `${Math.round(response.wind.speed)}${unit == 'metric' ? " km/h" : " mph"}`;
    const humidity = `${response.main.humidity}%`;
    const description = `${weather.description.charAt(0).toUpperCase()}${weather.description.substring(1)}`;
    return {
        city: response.name,
        count: country,
        weatherIcon: icon,
        temp: temperature,
        tempUn: tempUnit,
        feels: feelsLike,
        wind: windSpeed,
        humid: humidity,
        descrip: description,
        rise: sunrise,
        set: sunset
    }
}

// Create display of weather data and append to DOM
const createWeatherDiv = (response) => {
    const data = processData(response);
    const div = document.createElement("DIV");
    div.className = 'col-lg-8 mx-auto text-white';
    div.style.lineHeight = "0.5";
    const content = `<div>
        <div class="d-inline-block mt-5">
        <h4 class="font-weight-bold p-0 m-0">${data.weatherIcon}${data.city},
        ${data.count} Weather</h4>
        </div>

        <div>
        <p class="ml-4 mt-4" id="temperature">${data.temp}</p>
        <div class="d-inline-block">
        <p style="margin-bottom:2px;" id="temp-unit">${data.tempUn}</p><br>
        <p class="ml-2">
        <small>Feels<br> like</small>
        <span style="font-size:1.3rem;" class="font-weight-bold ml-3">${data.feels}</span>
        </p>
        </div>

        <div style="display: block;">
        <h4 class="ml-3 mt-2">${data.descrip}</h4>
        </div>
        </div>

        <div style="line-height:1.5" class="col-lg-10 d-flex justify-content-between mt-3 text-light">
        <span>Wind Speed<br> ${data.wind}</span>
        <span>Humidity<br> ${data.humid}</span>
        <span>Sunrise<br> ${data.rise}</span>
        <span>Sunset<br> ${data.set}</span>
        </div>
    </div>`;
    div.innerHTML = content;
    document.getElementById('headline').style.display = "none";
    document.querySelector('#weather').innerHTML = "";
    document.getElementById('city').value = "";
    document.querySelector('#weather').appendChild(div);
}

// Display an error on bad search or server error. Accepts http status code as arg
const displayError = (httpStatus) => {
    let message;
    if (httpStatus >= 500) {
        message = 'There was a server-side error. Try again later.';
    } else if (httpStatus >= 400) {
        message = 'Oops! There was a problem with your search. Try again.';
    }
    const error = `<h3 class="text-white text-center" id="error">${message}</h3>`;
    document.getElementById('headline').style.display = "none";
    document.querySelector('#weather').innerHTML = "";
    document.getElementById('city').value = "";
    document.querySelector('#weather').innerHTML = error;
}
