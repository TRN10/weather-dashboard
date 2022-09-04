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

    //display name of location searched on screen
    document.querySelector("#location").textContent = nameOfLocation;
});



