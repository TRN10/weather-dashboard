# weather-dashboard
Coding Bootcamp week 06 challenge

Weather dashboard is an application which uses an API to draw weather information from openweathermap.org website and render the results dynamically into a user interface. Entering a search location and clicking submit or pressing enter will initialise a function which retrieves the latitude and longitude of the location entered in the search field. These coordinates are then used to obtain the current weather of the location which is dynamically added to the HTML using JavaScript. The application also shows the UV index for the location in a coloured box which will change colour according to the current UV index. Green indicates a low UV indes, yellow moderate and red is high. The application will also display a 5 day forecast for the location searched.

This challenge focused on the use of third-party APIs, using fetch commands, and dynamically rendering the results into the DOM using JavaScript. In this challenge I learned how data that is fetched using an API is carried through the functions that follow. I also used day.js for the first time. I underestimated the amount of work required to make the previous searches card populate with buttons dynamically rendered from the search history using local storage, so unfortunately the 'previous searches' part of the application is not functional.

Following are screenshots of the application:

![weather-dashboard-screenshot](assets/images/weather-dashboard-screenshot.png)
![weather-dashboard-screenshot](assets/images/weather-dashboard-screenshot-2.png)

This is a link to the deployed application:

https://trn10.github.io/weather-dashboard/

