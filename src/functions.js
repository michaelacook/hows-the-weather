/* API docs: https://openweathermap.org/current#list */

const formatTime = (response) => {
    const sunriseTime = new Date(response.sys.sunrise*1000);
    const sunsetTime = new Date(response.sys.sunset*1000);
    let sunrise;
    let sunset;
    let sunriseMinutes;
    let sunriseHours;

    if (sunriseTime.getHours() === 0) {
        sunriseHours = '12';
    } else if (sunriseTime.getHours() < 12) {
        sunriseHours = sunriseTime.getHours();
    } else if (sunriseTime.getHours() === 12) {
        sunriseHours = '12';
    } else if (sunriseTime.getHours() > 12) {
        sunriseHours = `${sunriseTime.getHours() - 12}`;
    }
    sunriseTime.getMinutes() < 10 ? sunriseMinutes = `0${sunriseTime.getMinutes()}`
        : sunriseMinutes = sunriseTime.getMinutes();

    if (sunriseTime < 12) {
        sunrise = `${sunriseHours}:${sunriseMinutes} am`;
    } else {
        sunrise = `${sunriseHours}:${sunriseMinutes} pm`;
    }
    if (sunsetTime.getHours() === 0) {
        sunsetHours = '12';
    } else if (sunsetTime.getHours() < 12) {
        sunsetHours = sunsetTime.getHours();
    } else if (sunsetTime.getHours() === 12) {
        sunsetHours = '12';
    } else if (sunsetTime.getHours() > 12) {
        sunsetHours = `${sunsetTime.getHours() - 12}`;
    }
    sunsetTime.getMinutes() < 10 ? sunsetMinutes = `0${sunsetTime.getMinutes()}`
        : sunsetMinutes = sunsetTime.getMinutes();

    if (sunriseTime.getHours() < 12) {
        sunrise = `${sunriseHours}:${sunriseMinutes} am`;
    } else {
        sunrise = `${sunriseHours}:${sunriseMinutes} pm`;
    }
    if (sunsetTime.getHours() < 12) {
        sunset = `${sunsetHours}:${sunsetMinutes} am`;
    } else {
        sunset = `${sunsetHours}:${sunsetMinutes} pm`;
    }
    return {
        rise: sunrise,
        set: sunset
    }
}

const processData = (response) => {
    let tempUnit;
    unit === 'metric' ? tempUnit = '℃' : tempUnit = '℉';
    const country = response.sys.country;
    const riseSet = formatTime(response);
    const weather = response.weather[0];
    const iconSrc = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const icon = `<img src=${iconSrc} />`;
    const temperature = Math.round(response.main.temp);
    const feelsLike = Math.round(response.main.feels_like);
    const windSpeed = `${response.wind.speed}${unit == 'metric' ? " km/h" : " mph"}`;
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
        rise: riseSet.rise,
        set: riseSet.set
    }
}

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
            <p class="ml-4 mt-5" id="temperature">${data.temp}</p>
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

        <div style="line-height:1.5" class="col-10 d-flex justify-content-between mt-3 text-light">
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
