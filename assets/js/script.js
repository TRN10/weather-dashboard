var locationName = document.querySelector("#location-name");
var submitButton = document.querySelector("#submit");


// Add event listener to submit search location
submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    //create var from submission
    var nameOfLocation = locationName.value.trim();

    //save to local storage
    localStorage.setItem("nameOfLocation", JSON.stringify(nameOfLocation));
    console.log(nameOfLocation);

    //render name of location searched on screen
    document.querySelector("#location").textContent = nameOfLocation;


});

// function created to see what data is returned from API

function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=df6dd1cd15022b8002c172b01cde8380&units=metric'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
}

getApi();