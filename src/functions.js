/* API docs: https://openweathermap.org/current#list */

const createWeatherDiv = (response) => {
    let tempUnit;
    unit === 'metric' ? tempUnit = '℃' : tempUnit = '℉';
    const weather = response.weather[0];
    const iconSrc = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const icon = `<img src=${iconSrc} />`;
    const temperature = Math.round(response.main.temp);
    const feelsLike = Math.round(response.main.feels_like);
    const windSpeed = `${response.wind.speed}${unit == 'metric' ? " km/h" : " mph"}`;
    const humidity = `${response.main.humidity}%`;
    const description = `${weather.description.charAt(0).toUpperCase()}${weather.description.substring(1)}`;
    const sunrise = `${new Date(response.sys.sunrise*1000).getHours()}:${new Date(response.sys.sunrise*1000).getMinutes()}`;
    const sunset = `${new Date(response.sys.sunset*1000).getHours()}:${new Date(response.sys.sunrise*1000).getMinutes()}`;
    const div = document.createElement("DIV");
    div.className = 'col-lg-8 mx-auto text-white';
    div.style.lineHeight = "0.5";

    const content = `
        <div>
            <div class="d-inline-block mt-5">
                <h4 class="font-weight-bold p-0 m-0">${icon}${response.name},
                ${response.sys.country} Weather</h4>
            </div>
            <div>
                <p class="ml-4 mt-5" id="temperature">${temperature}</p>
                <div class="d-inline-block">
                    <p style="margin-bottom:2px;" id="temp-unit">${tempUnit}</p><br>
                    <p class="ml-2">
                        <small>Feels<br> like</small>
                        <span style="font-size:1.3rem;" class="font-weight-bold ml-3">${feelsLike}</span>
                    </p>
                </div>

                <div style="display: block;">
                    <h5 class="ml-3 mt-2">${description}</h5>
                </div>
            </div>

            <div style="line-height:1.5" class="col-10 d-flex justify-content-between mt-3 text-light">
                <span>Wind Speed<br> ${windSpeed}</span>
                <span>Humidity<br> ${humidity}</span>
                <span>Sunrise<br> ${sunrise}</span>
                <span>Sunset<br> ${sunset}</span>
            </div>
        </div>`;
    div.innerHTML = content;
    document.getElementById('title').style.display = "none";
    document.querySelector('#weather').innerHTML = "";
    document.getElementById('city').value = "";
    document.querySelector('#weather').appendChild(div);
}
