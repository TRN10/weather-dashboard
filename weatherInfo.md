First, look at the api and its documentation.  You have to sign up and you will be issued an api key.  Understand the api and how to pull and what data you might be pulling.

Test the api link in your vs code. Confirm you are pulling.


Dont forget to define global variables.  If you find you need to declare the same variables in functions -- make them global, then you are keeping your code dry and effecient.

# Flow of functions

1. Input box - city is entered, submit button is pressed
2. value of input is declared
3. Coordinates thru api (geo) is retreived
4. Weather of city location is then retreived
5. Current forecast is rendered
6. 5-Day forecast is rendered onto individual cards

Create a search history and get weather -- 
1. Input value is also sent to localstorage setIten
2. localstorage getItem is called independently, and if anything in LS, will be iterated and buttons will be made
3. When a search history button is clicked, the value of the button is then sent to #3 above to get locate the coordinates of the city

## What do the functions need to do?

Bootstrap is reviewing code already written and reusing it or customizing it. Find what you need in Bootstrap v4.5 and copy the code(this is provided for you to do this)

##  Pseduo code your HTML -- define what you want to go where....you will be creating "empty divs" in which you will append created elements, such as a card.  But you will need to layout your bootstrap grid in html

1. HTML landing page -- what do you need to have on this?  And in bootstrap grid format?
2. How many rows?
3. How many columns - and what is going into those columns?

## Bootstrap Grid - containing of div, or even elements but your classes will be bootstrap language/code
    Container
        Row
            Column (define the size- no matter the amount of columns within the row -- they must all add up as a total, to 12)
                insert your content -- more bootstrap(like a card or a form) or other


## Pseudo code your script

As you define values and data -- you will carry that thru the functions in order to continue to pull the data along and then break into the levels of the api to define what you need.  you will need to review the api and its levels -- it is an object array.  Array as it has indexes(list), object as it has key pair values.  Also utilize console.log() to see what you are pulling or defining as your data.



In order to kick off the app -- what do you need to have once the user enters a city?  a button -- and the app will execute to the first function

Function 1 - this function should validate the value of the input. Next function: define the coordinates of the value. 

continuing from the search input
Function 2 - this function should use the api to pull the coordinates of the city (hint....geo). Next function: define the api data - weather.And also can add another function to set up local storage.

Function 3 - this function should use the api to pull the weather data. Next function: define both current and forecast.

Function 4 - this function is very helpful, in the fact you are passing thru specific data info to then pass to the two functions that are only being called out.  Next functions - calling out current and forecast.

if weather data is being generated for any given day in a 24 hr period of a start to end -- you need to define that.  JS has two types of date/time libraries -- google fu.

Function 5a - this function should be passing thru the data needed to generate this card - Current Weather.  Review the demo to see what data you need. Remember data is being passed from func to func all the way from the fetch functions -- but in review of the api -- current is only needed for this card. No Next...after this

Function 5b - this function should be passing thru the data needed for forecast from api and to only iterate thru for the 5 day forecast. Next function will generate the cards from the iteration.

Function 6 - this function should be an individual card defined by the data being defined and pulled to display on a card.  As the iteration is done, each card should generate. No Next...

Search History???
from function 2 -- 
Function 7 - this function sets up local storage setItem.  If you are compiling a list of searches -- what do you need?. Next function will pull from local storage and initialize independently.

Function 8 - this function iterates what is pull from local storage and generate buttons.

What do you need to do to kick off the buttons?

Function 9 - this function is kicked off when the search history buttons are clicked, it validates the value of the button as a (hint) e.target which is defined as the original input is defined and validated.  Next function will get the coordinates of the city/location.

End of the app!!! Happy Coding!!!

Review the module - review class activities and class module project.  This challenge is a compilation of Module 1 - Module 6.  Hint - in rendering the current, forecast and buttons, this is done dynamically from Javascript.
