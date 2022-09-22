var locationName = document.querySelector("#location-name");
var submitButton = document.querySelector("#submit");
var todayContainer = document.getElementById('today');
var forecastContainer = document.getElementById('forecast');
var forecastEl = document.getElementById('forecast-heading');

var apiKey = "2a2c6d77334d26a9c34ac000ab9a9fe8";
var api = "https://api.openweathermap.org";

// Add timezone plugins to day.js

dayjs.extend(window.dayjs_plugin_utc);

dayjs.extend(window.dayjs_plugin_timezone);



// Add event listener to submit search location
submitButton.addEventListener("click", function (event) {
    if (!locationName.value) {
        return;
    }
    event.preventDefault();


    //create var from submission
    var nameOfLocation = locationName.value.trim();

    //save to local storage
    localStorage.setItem("nameOfLocation", JSON.stringify(nameOfLocation));
    console.log(nameOfLocation);


    getCity(nameOfLocation);

    //document.querySelector("#location-name").textContent = " ";
    locationName.value = "";
});

// function to obtain lat and long of search location
function getCity(nameOfLocation) {
    var requestUrl = `${api}/geo/1.0/direct?q=${nameOfLocation}&limit=5&appid=${apiKey}`;
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert('unknown location');
            } else {
                console.log(data)
                getWeather(data[0])

            }

        }).catch(function (err) {

            console.error(err);
        });

}

function getWeather(location) {
    var { lat, lon } = location;
    var city = location.name;
    console.log(location);
    var apiUrl = `${api}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sharedData(city, data);
            console.log(data);
        }).catch(function (err) {

            console.error(err);
        });

}

//function to share data between current and forecast weather
function sharedData(city, data) {
    currentWeather(city, data.current, data.timezone);
    forecastWeather(data.daily, data.timezone);

}


function currentWeather(city, weather, timezone) {
    var date = dayjs().tz(timezone).format('D/M/YYYY');

    var tempC = weather.temp;
    var humidity = weather.humidity;
    var windKph = weather.wind_speed;
    var uvi = weather.uvi;

    // get weather icons
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;

    var card = document.createElement('div')
    var cardBody = document.createElement('div')
    var cardTitle = document.createElement('h2')
    var tempCEl = document.createElement('p')
    var windEl = document.createElement('p')
    var humidityEl = document.createElement('p')
    var uvEl = document.createElement('p')
    var uvIBadge = document.createElement('button')
    var weatherImage = document.createElement('img')
    card.setAttribute('class', 'card')
    cardBody.setAttribute('class', 'card-body')
    card.append(cardBody)

    tempCEl.setAttribute('class', "card-text")
    windEl.setAttribute('class', "card-text")
    humidityEl.setAttribute('class', "card-text")
    weatherImage.setAttribute('src', iconUrl)
    weatherImage.setAttribute('alt', iconDescription)
    weatherImage.setAttribute('class', "weather-img")
    tempCEl.textContent = `current temp: ${tempC} °C`;
    humidityEl.textContent = `humidity: ${humidity}%`;
    windEl.textContent = `wind: ${windKph} km/h`;

    //add attributes for other elements

    cardTitle.textContent = `${city} (${date})`;
    cardTitle.append(weatherImage);
    cardBody.append(cardTitle, tempCEl, windEl, humidityEl)

    // uv index colour change according to uv level

    uvEl.textContent = 'uv index: ';
    uvIBadge.classList.add('btn', 'btn-sm');
    if (uvi < 3) {
        uvIBadge.classList.add('btn-success');
    } else if (uvi < 7) {
        uvIBadge.classList.add('btn-warning');

    } else {
        uvIBadge.classList.add('btn-danger');
    }
    uvIBadge.textContent = uvi;
    uvEl.append(uvIBadge);
    cardBody.append(uvEl);
    todayContainer.innerHTML = "";
    todayContainer.append(card);
}
// forecastWeather to create, midnight to midgnight start to end date
// var for start and var for end for loop on daily forecast array, create function called forecast card and call out in for loop

function forecastWeather(daily, timezone) {
    console.log(daily);
    // create time zone for forecast

    var startDay = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
    var endDay = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

    // var forecastRow = document.createElement('div');
    // var forecastCol = document.createElement('div');
    // var heading = document.createElement('h4');

    // forecastRow.setAttribute('class', 'row');
    // forecastCol.setAttribute('class', 'col-12');
    // heading.classList.add('row-white');
    // heading.textContent = '5 day forecast';
    // forecastCol.append(heading);
    // forecastRow.append(forecastCol);


    forecastContainer.innerHTML = "";

    // forecastContainer.append(forecastRow);

    for (let i = 0; i < daily.length; i++) {
        if (daily[i].dt >= startDay && daily[i].dt < endDay) {
            forecastCard(daily[i], timezone);
        }
    }
}

// function to create and render 5 day forecast

function forecastCard(forecast, timeZone) {
    console.log(forecast,)

    var unixTs = forecast.dt;
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var tempC = forecast.temp.day;
    var { humidity } = forecast;
    var windkph = forecast.wind_speed;
    var col = document.createElement("div");
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");

    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
    col.setAttribute("class", "col-md-2       ");
    col.classList.add("5-day-card");
    card.setAttribute("class", "card bg-white h-100 text-black");
    cardBody.setAttribute("class", "card-body p-2");
    cardTitle.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    cardTitle.textContent = dayjs.unix(unixTs).tz(timeZone).format("D/M/YYYY'");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    tempEl.textContent = `Temp: ${tempC}°C`;
    windEl.textContent = `Wind: ${windkph} km/h`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    forecastContainer.append(col);
    forecastEl.classList.remove('hide');
}