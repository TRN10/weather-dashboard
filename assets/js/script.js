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

    //render name of location searched on screen and capitalise first letter
    document.querySelector("#location").textContent = nameOfLocation[0].toUpperCase() + nameOfLocation.substring(1);

    function getApi() {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + nameOfLocation + '&appid=df6dd1cd15022b8002c172b01cde8380&units=metric';

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
    }

    getApi();

    //document.querySelector("#location-name").textContent = " ";

});


