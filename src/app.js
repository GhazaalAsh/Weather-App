function currentDate(today) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Oct",
    "Dec",
  ];
  let day = days[today.getDay()];
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getUTCFullYear();
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let fullDate = `${day}, ${month} ${date}, ${hour}:${minute}`;
  let current = document.querySelector("#date");
  current.innerHTML = fullDate;
}

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let country = response.data.sys.country;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let city = response.data.name;
  let realFeel = Math.round(response.data.main.feels_like);
  let minimumTemperature = Math.round(response.data.main.temp_min);
  let maximumTemperature = Math.round(response.data.main.temp_max);
  let windDegree = response.data.wind.deg;
  let pressure = response.data.main.pressure;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city},`;
  let celsiusTemperature = document.querySelector("#celsius");
  celsiusTemperature.innerHTML = temperature;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = windSpeed;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let realFeelElement = document.querySelector("#feels");
  realFeelElement.innerHTML = realFeel;
  let minimumTemperatureElement = document.querySelector("#min-temp");
  minimumTemperatureElement.innerHTML = minimumTemperature;
  let maximumTemperatureElement = document.querySelector("#max-temp");
  maximumTemperatureElement.innerHTML = maximumTemperature;
  let windDegreeElement = document.querySelector("#wind-degree");
  windDegreeElement.innerHTML = calculateWindDegree(windDegree);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = pressure;
}

function calculateWindDegree(windDegree) {
  if (windDegree <= 23 || windDegree >= 337) {
    return "N";
  } else if (windDegree >= 24 && windDegree <= 68) {
    return "NE";
  } else if (windDegree >= 69 && windDegree <= 113) {
    return "E";
  } else if (windDegree >= 114 && windDegree <= 158) {
    return "SE";
  } else if (windDegree >= 159 && windDegree <= 203) {
    return "S";
  } else if (windDegree >= 204 && windDegree <= 248) {
    return "SW";
  } else if (windDegree >= 249 && windDegree <= 293) {
    return "W";
  } else {
    return "NW";
  }
}
function searchDefaultCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchParis(event) {
  event.preventDefault();
  city = "Paris";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchLondon(event) {
  event.preventDefault();
  city = "London";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchNewYork(event) {
  event.preventDefault();
  city = "New York";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function checkLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
  function getPosition(position) {
    let longitudeElement = position.coords.longitude;
    let latitudeElement = position.coords.latitude;
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeElement}&lon=${longitudeElement}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(getWeather);
  }
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let input = document.querySelector("#search-input");
  let apikey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=${unit}`;

  axios.get(url).then(getWeather);
}

function turnToFahrenheit(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#celsius");
  const text = celsiusTemperature.textContent;
  let celtemp = +text;
  let fahrenheit = Math.round(celtemp * 1.8 + 32);
  celsiusTemperature.innerHTML = fahrenheit;
  let units = document.querySelector("#units");
  units.innerHTML = `<span class="fahrenheit">
  °F|<a href="" class="fahrenheit">°C</a>
</span>`;
}

function turnToCelsius(event) {
  event.preventDefault();
  let fartemp = document.querySelector("#fahrenheit");
  const textfar = fartemp.textContent;
  let farhtemp = +textfar;
  let celsius = Math.round(((farhtemp - 321) * 5) / 9);
  fartemp.innerHTML = celsius;
  let units = document.querySelector("#units");
  units.innerHTML = `<span class="fahrenheit">
  <a href="" class="fahrenheit">°C</a>|<a href="" class="fahrenheit">°F</a>
</span>`;
}

currentDate(new Date());

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let locationElement = document.querySelector("#currentLocation");
locationElement.addEventListener("click", checkLocation);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", turnToFahrenheit);

let celsiustemp = document.querySelector("#celsius-temp");
celsiustemp.addEventListener("click", turnToCelsius);

let parisLink = document.querySelector("#paris");
parisLink.addEventListener("click", searchParis);

let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", searchLondon);

let newYorkLink = document.querySelector("#new-York");
newYorkLink.addEventListener("click", searchNewYork);

searchDefaultCity("Tehran");
