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
  let city = response.data.city;
  let country = response.data.country;
  let description = response.data.condition.description;
  let temperature = Math.round(response.data.temperature.current);
  let realFeel = Math.round(response.data.temperature.feels_like);
  let humidity = response.data.temperature.humidity;
  let pressure = response.data.temperature.pressure;
  let windSpeed = Math.round(response.data.wind.speed);
  let windDegree = Math.round(response.data.wind.degree);
  let icon = response.data.condition.icon;
  let iconUrl = response.data.condition.icon_url;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city},`;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let temperatureElement = document.querySelector("#celsius");
  temperatureElement.innerHTML = temperature;
  let realFeelElement = document.querySelector("#feels");
  realFeelElement.innerHTML = realFeel;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = pressure;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = windSpeed;
  let windDegreeElement = document.querySelector("#wind-degree");
  windDegreeElement.innerHTML = calculateWindDegree(windDegree);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", icon);
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
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function searchParis(event) {
  event.preventDefault();
  city = "Paris";
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function searchLondon(event) {
  event.preventDefault();
  city = "London";
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function searchNewYork(event) {
  event.preventDefault();
  city = "New York";
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function checkLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
  function getPosition(position) {
    let longitudeElement = position.coords.longitude;
    let latitudeElement = position.coords.latitude;
    let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
    let unit = "metric";
    let apiUrl = `api.shecodes.io/weather/v1/current?lon=${longitudeElement}&lat=${latitudeElement}&key=${apiKey}&units=${unit}
`;
    https: axios.get(apiUrl).then(getWeather);
  }
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let apikey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${input.value}&key=${apikey}&units=${unit}`;
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
