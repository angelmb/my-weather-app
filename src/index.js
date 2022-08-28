//feature 1 - display the current date and time using JavaScript: Tuesday 16:00
let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = today.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let dayOfWeek = days[today.getDay()];
let month = months[today.getMonth()];
let date = today.getDate();
let year = today.getFullYear();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${dayOfWeek} ${currentHour}:${currentMinute}`;

let currentDate = document.querySelector("h5.date");
currentDate.innerHTML = `${month} ${date}, ${year}`;

//plus-week 5 homework
//show current temperature of the searched city:

function showWeather(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "be37b089d21bbdabe2267ee66857682c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}
function searchCityWeather(event) {
  event.preventDefault();
  let searchTerm = document.querySelector("#search-input");
  let city = searchTerm.value;
  searchCity(city);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", searchCityWeather);

//plus-week 5 homework bonus
//show current temperature of current location:
function showTempCurrentLoc(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function fetchCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be37b089d21bbdabe2267ee66857682c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTempCurrentLoc);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(fetchCoords);
}
let currentLocation = document.querySelector("button.currentLoc");
currentLocation.addEventListener("click", findLocation);

searchCity("New York");

//feature 3 - Display the fake temperature of the city in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//function showCelcius(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#current-temp");
//currentTemp.innerHTML = 18;
//}

//function showFahrenheit(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#current-temp");
//currentTemp.innerHTML = Math.round(18 * 1.8 + 32);
//}

//let celciusSwitch = document.querySelector("#celcius");
//celciusSwitch.addEventListener("click", showCelcius);

//let fahrenheitSwitch = document.querySelector("#fahrenheit");
//fahrenheitSwitch.addEventListener("click", showFahrenheit);
