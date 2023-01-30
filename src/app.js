function setbackground(hour) {
  backgroundElment = document.querySelector("#background");
  parisLinkColorElement = document.querySelector("#paris");
  londonLinkColorElement = document.querySelector("#london");
  newYorkLinkColorElement = document.querySelector("#new-York");
  celsiusLinkColorElement = document.querySelector("#celsius-temp");
  fahrenheitLinkColorElement = document.querySelector("#fahrenheit");
  unitsLinkColorElement = document.querySelector("#colorChange");
  if (hour < 12 && hour >= 6) {
    backgroundElment.classList.add("morning");
  } else if (hour < 18 && hour >= 12) {
    backgroundElment.classList.add("afternoon");
  } else if (hour < 24 && hour >= 18) {
    backgroundElment.classList.add("evening");
  } else {
    backgroundElment.classList.add("night");
    parisLinkColorElement.classList.remove("linkDescription");
    parisLinkColorElement.classList.add("citiesNightMode");
    londonLinkColorElement.classList.remove("linkDescription");
    londonLinkColorElement.classList.add("citiesNightMode");
    newYorkLinkColorElement.classList.remove("linkDescription");
    newYorkLinkColorElement.classList.add("citiesNightMode");
    celsiusLinkColorElement.classList.remove("templink");
    celsiusLinkColorElement.classList.add("templinkNight");
    fahrenheitLinkColorElement.classList.remove("templink");
    fahrenheitLinkColorElement.classList.add("templinkNight");
    unitsLinkColorElement.classList.remove("colorChange");
    unitsLinkColorElement.classList.add("colorChangeNight");
  }
}
function currentDate(timestamp) {
  let date = new Date(timestamp * 1000);
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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let fullDate = `${day}, ${month} ${todayDate}, ${hour}:${minute}`;
  let current = document.querySelector("#date-id");
  current.innerHTML = fullDate;
  setbackground(hour);
}

function getUpcomingDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function getUpcomingHours(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let upcomingHour = `${hour}:00`;
  return upcomingHour;
}

function getWeather(response) {
  let city = response.data.city;
  let country = response.data.country;
  let description = response.data.condition.description;
  temperatureControl = response.data.temperature.current;
  let temperature = Math.round(temperatureControl);
  let realFeel = Math.round(response.data.temperature.feels_like);
  feelsLikeControl = response.data.temperature.feels_like;
  let humidity = response.data.temperature.humidity;
  let pressure = response.data.temperature.pressure;
  let windSpeed = Math.round(response.data.wind.speed);
  let windDegree = Math.round(response.data.wind.degree);
  let icon = response.data.condition.icon;
  let iconUrl = response.data.condition.icon_url;
  timeControl = response.data.time;
  longitudeControl = response.data.coordinates.longitude;
  latitudeControl = response.data.coordinates.latitude;
  getLocation(longitudeControl, latitudeControl);
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
  currentDate(timeControl);
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

function showHourlyForecast(response) {
  let showHourlyForecastElement = document.querySelector("#hourrly-forecast");
  let upcomingHours = response.data.hourly.time;
  let hourlyForecastHTML = `<div class="row">`;
  console.log(timeControl);
  let result = null;
  for (let i = 0; i < upcomingHours.length; i++) {
    if (upcomingHours[i] > timeControl) {
      result = i;
      console.log(result);
      break;
    }
  }
  newResult = result + 6;
  console.log(newResult);

  upcomingHours.forEach(function hourlyForecast(upcomingHours, index) {
    if (upcomingHours > timeControl && index < newResult) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `  <div class="col">
    <div class="hourly-forecast-degree">-3°C</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png"
      alt="Mist Day"
      width="42"
    />
    <div class="hourly-forecast-time"> ${getUpcomingHours(upcomingHours)} </div>
  </div>`;
    }
  });

  //console.log(response.data);
  //console.log(response.data.hourly.time);
  //console.log(response.data.hourly.temperature_120m);

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  showHourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function showDailyForecast(response) {
  let showDailyForecastElement = document.querySelector("#daily-forecast");
  let upcomingDays = response.data.daily;
  let dailyForecastHTML = `<div class="row">`;
  upcomingDays.forEach(function dailyForecast(upcomingDays, index) {
    if (index > 0) {
      dailyForecastHTML =
        dailyForecastHTML +
        `<div class="col">
            <div class="daily-forecast-day">${getUpcomingDay(
              upcomingDays.time
            )}</div>
            <img
              src=${upcomingDays.condition.icon_url}
              alt=${upcomingDays.condition.description}
              width="48"
            />
            <div class="daily-forecasst-minandmax" id="daily-forecasst-minandmax">
              <span class="daily-forecast-min">${Math.round(
                upcomingDays.temperature.minimum
              )}°</span>
              <span class="daily-forecast-max">${Math.round(
                upcomingDays.temperature.maximum
              )}°</span>
            </div>
          </div>`;
    }
  });
  dailyForecastHTML = dailyForecastHTML + `</div>`;
  showDailyForecastElement.innerHTML = dailyForecastHTML;
  currentMinimumElement = document.querySelector("#current-min-temp");
  currentMinimumControl = response.data.daily[0].temperature.minimum;
  currentMinimumElement.innerHTML = Math.round(currentMinimumControl);
  currentMaximumElement = document.querySelector("#current-max-temp");
  currentMaximumControl = response.data.daily[0].temperature.maximum;
  currentMaximumElement.innerHTML = Math.round(currentMaximumControl);
}

function catchhourlyData() {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeControl}&longitude=${longitudeControl}&hourly=weathercode,windspeed_120m,winddirection_120m,temperature_120m&timeformat=unixtime`;
  axios.get(url).then(showHourlyForecast);
}

function minimunMaximumFahrenheitTurn() {
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitudeControl}&lon=${longitudeControl}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showDailyForecast);
}

function minimunMaximumCelsisTurn() {
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitudeControl}&lon=${longitudeControl}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showDailyForecast);
}

function getLocation(longitude, latitude) {
  let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showDailyForecast);
  catchhourlyData();
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
    let currentLongitude = position.coords.longitude;
    let currentLaitude = position.coords.latitude;
    let apiKey = "32f40ea24c4bbf27t7cf439de1do4214";
    let unit = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${currentLongitude}&lat=${currentLaitude}&key=${apiKey}&units=${unit}
`;
    axios.get(apiUrl).then(getWeather);
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
  let TemperatureNumber = document.querySelector("#celsius");
  celsiustemp.classList.remove("deactive");
  fahrenheitTemperature.classList.add("deactive");
  let fahrenheit = Math.round((temperatureControl * 9) / 5 + 32);
  TemperatureNumber.innerHTML = fahrenheit;
  let feelsLike = document.querySelector("#feels");
  let fahrenheitFeelsLike = Math.round((feelsLikeControl * 9) / 5 + 32);
  feelsLike.innerHTML = fahrenheitFeelsLike;
  let feelsLikeDegree = document.querySelector("#feels-like-degree");
  feelsLikeDegree.innerHTML = "°F";
  let currentMinimumUnitElement = document.querySelector("#current-min");
  currentMinimumUnitElement.innerHTML = "°F";
  let currentMaximumUnitElement = document.querySelector("#current-max");
  currentMaximumUnitElement.innerHTML = "°F";
  minimunMaximumFahrenheitTurn();
}

function turnToCelsius(event) {
  event.preventDefault();
  celsiustemp.classList.add("deactive");
  fahrenheitTemperature.classList.remove("deactive");
  let TemperatureNumber = document.querySelector("#celsius");
  let celsiusElement = Math.round(temperatureControl);
  TemperatureNumber.innerHTML = celsiusElement;
  let feelsLike = document.querySelector("#feels");
  let fahrenheitFeelsLike = Math.round(feelsLikeControl);
  feelsLike.innerHTML = fahrenheitFeelsLike;
  let feelsLikeDegree = document.querySelector("#feels-like-degree");
  feelsLikeDegree.innerHTML = "°C";
  let currentMinimumUnitElement = document.querySelector("#current-min");
  currentMinimumUnitElement.innerHTML = "°C";
  let currentMaximumUnitElement = document.querySelector("#current-max");
  currentMaximumUnitElement.innerHTML = "°C";
  minimunMaximumCelsisTurn();
}

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", turnToFahrenheit);

let celsiustemp = document.querySelector("#celsius-temp");
celsiustemp.addEventListener("click", turnToCelsius);

let temperatureControl = null;
let feelsLikeControl = null;
let currentMinimumControl = null;
let currentMaximumControl = null;
let longitudeControl = null;
let latitudeControl = null;
let timeControl = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let locationElement = document.querySelector("#currentLocation");
locationElement.addEventListener("click", checkLocation);

let parisLink = document.querySelector("#paris");
parisLink.addEventListener("click", searchParis);

let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", searchLondon);

let newYorkLink = document.querySelector("#new-York");
newYorkLink.addEventListener("click", searchNewYork);

searchDefaultCity("Tehran");
