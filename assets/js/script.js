var submitEl = document.querySelector("#submit");
var locationName = document.querySelector("#location-name");

function submitResponse(event) {
    event.preventDefault();
    document.querySelector("#location").textContent = locationName;


}

// Add event listener to submit search location
submitEl.addEventListener("click", submitResponse);