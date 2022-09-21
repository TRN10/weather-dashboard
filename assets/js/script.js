var locationName = document.querySelector("#location-name");
var submitButton = document.querySelector("#submit");
var todayContainer = document.getElementById('today');

var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
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
    var apiUrl = `${api}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sharedData(city, data);
            console.log(data);
            // }).catch(function (err) {
            //     // console.log(getWeather);
            //     // console.log(data);
            //     console.error(err);
        });

}

function sharedData(city, data) {
    currentWeather(city, data.current, data.timezone);
    forecastWeather(data.daily, data.timezone);
}
function currentWeather(city, weather, timezone) {
    var date = dayjs().tz(timezone).format('D/M/YYYY');

    var tempC = weather.temp;
    var humidity = weather.humidity;
    var windMph = weather.wind_speed;
    var uvi = weather.uvi;

    //pullotherdata
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
    windEl.textContent = `wind: ${windMph} km/h`;
    //add attributes for other elements

    cardTitle.textContent = `${city} (${date})`;
    cardTitle.append(weatherImage);
    cardBody.append(cardTitle, tempCEl, windEl, humidityEl)

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
    // todayContainer.innerHTML = "";
    todayContainer.append(card);
}
// forecastWeather to create, midnight to midgnight start to end date
// var for start and var for end for loop on daily forecast array, create function called forcast card and call out in for loop