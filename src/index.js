function showWeather(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let condition = document.querySelector("#current-condition");
  condition.innerHTML = response.data.weather[0].main;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#currentIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  celciusTemp = response.data.main.temp;
  celciusSwitch.classList.add("active");
  fahrenheitSwitch.classList.remove("active");

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let parts = `hourly,minutely,alerts`;
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let unit = "metric";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${parts}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
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

function showTempCurrentLoc(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let condition = document.querySelector("#current-condition");
  condition.innerHTML = response.data.weather[0].main;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#currentIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  celciusSwitch.classList.add("active");
  fahrenheitSwitch.classList.remove("active");

  getForecast(response.data.coord);
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

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitSwitch.classList.add("active");
  celciusSwitch.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp * 1.8 + 32);
}

function showCelcius(event) {
  event.preventDefault();
  celciusSwitch.classList.add("active");
  fahrenheitSwitch.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let futureDate = date.getDate();
  let futureMonth = date.getMonth() + 1;
  return `${futureMonth}/${futureDate} (${days[day]})`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <h6 class="futureDate"> ${formatDate(day.dt)}</h6>
              <img src= "http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"/>
              <h5>
                <span class="max"><strong>${Math.round(
                  day.temp.max
                )}</strong></span> /
                <span class="min">${Math.round(day.temp.min)}° C</span>
              </h5>
              <h6>${day.weather[0].main}</h6>
            </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", searchCityWeather);

let currentLocation = document.querySelector("button.currentLoc");
currentLocation.addEventListener("click", findLocation);

let celciusSwitch = document.querySelector("#celcius");
celciusSwitch.addEventListener("click", showCelcius);

let fahrenheitSwitch = document.querySelector("#fahrenheit");
fahrenheitSwitch.addEventListener("click", showFahrenheit);

let celciusTemp = null;

searchCity("New York");
