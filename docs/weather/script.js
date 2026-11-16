
console.log("----- Day 19: Weather Dashboard -----");

// ===================================
// 1. IMPORT API FUNCTIONS
// ===================================

import {
  searchCity,
  getCurrentWeather
} from "./api.js";

// ===================================
// 2. SELECT HTML ELEMENTS
// ===================================

const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const locationButton = document.querySelector("#location-button");

const statusMessage = document.querySelector("#status");
const weatherResult = document.querySelector("#weather-result");

const locationName = document.querySelector("#location-name");
const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weather-description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");

// ===================================
// 3. APPLICATION STATE
// ===================================

let latestRequestId = 0;

// ===================================
// 4. WEATHER CODE DESCRIPTIONS
// ===================================

const WEATHER_CODES = {
  0: { description: "Clear sky", icon: "☀️" },
  1: { description: "Mainly clear", icon: "🌤️" },
  2: { description: "Partly cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },

  45: { description: "Fog", icon: "🌫️" },
  48: { description: "Depositing rime fog", icon: "🌫️" },

  51: { description: "Light drizzle", icon: "🌦️" },
  53: { description: "Moderate drizzle", icon: "🌦️" },
  55: { description: "Dense drizzle", icon: "🌧️" },

  56: { description: "Light freezing drizzle", icon: "🌧️" },
  57: { description: "Dense freezing drizzle", icon: "🌧️" },

  61: { description: "Slight rain", icon: "🌦️" },
  63: { description: "Moderate rain", icon: "🌧️" },
  65: { description: "Heavy rain", icon: "🌧️" },

  66: { description: "Light freezing rain", icon: "🌧️" },
  67: { description: "Heavy freezing rain", icon: "🌧️" },

  71: { description: "Slight snowfall", icon: "❄️" },
  73: { description: "Moderate snowfall", icon: "❄️" },
  75: { description: "Heavy snowfall", icon: "❄️" },
  77: { description: "Snow grains", icon: "❄️" },

  80: { description: "Slight rain showers", icon: "🌦️" },
  81: { description: "Moderate rain showers", icon: "🌧️" },
  82: { description: "Violent rain showers", icon: "⛈️" },

  85: { description: "Slight snow showers", icon: "🌨️" },
  86: { description: "Heavy snow showers", icon: "🌨️" },

  95: { description: "Thunderstorm", icon: "⛈️" },
  96: {
    description: "Thunderstorm with slight hail",
    icon: "⛈️"
  },
  97: { description: "Heavy thunderstorm", icon: "⛈️" },
  99: {
    description: "Thunderstorm with heavy hail",
    icon: "⛈️"
  }
};

// ===================================
// 5. GET WEATHER CONDITION
// ===================================

function getWeatherCondition(code, isDay) {

  const condition = WEATHER_CODES[code];

  if (!condition) {
    return {
      description: "Weather condition unavailable",
      icon: "🌡️"
    };
  }

  if (!isDay && [0, 1, 2].includes(code)) {
    return {
      description: condition.description,
      icon: "🌙"
    };
  }

  return condition;
}

// ===================================
// 6. DISPLAY WEATHER
// ===================================

function renderWeather(location, weather) {

  const condition = getWeatherCondition(
    weather.weatherCode,
    weather.isDay
  );

  locationName.textContent = location.country
    ? `${location.name}, ${location.country}`
    : location.name;

  weatherIcon.textContent = condition.icon;

  temperature.textContent =
    `${Math.round(weather.temperature)}°C`;

  weatherDescription.textContent =
    condition.description;

  humidity.textContent =
    `${weather.humidity}%`;

  windSpeed.textContent =
    `${weather.windSpeed} km/h`;

  weatherResult.hidden = false;
}

// ===================================
// 7. SHOW STATUS MESSAGE
// ===================================

function showStatus(message, color) {

  statusMessage.textContent = message;

  statusMessage.style.color = color;
}

// ===================================
// 8. GET BROWSER LOCATION
// ===================================

function getBrowserLocation() {

  return new Promise(function(resolve, reject) {

    if (!navigator.geolocation) {

      reject(
        new Error(
          "Your browser does not support location access."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(

      function(position) {

        resolve({
          name: "Your Location",
          country: "",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

      },

      function(error) {

        if (error.code === 1) {

          reject(
            new Error(
              "Location permission denied. Search by city instead."
            )
          );

        } else if (error.code === 2) {

          reject(
            new Error(
              "Your location is unavailable. Search by city instead."
            )
          );

        } else if (error.code === 3) {

          reject(
            new Error(
              "Location request timed out. Please try again."
            )
          );

        } else {

          reject(
            new Error(
              "Unable to access your location."
            )
          );

        }

      },

      {
        enableHighAccuracy: false,
        timeout: 12000,
        maximumAge: 60000
      }

    );

  });

}

// ===================================
// 9. LOAD WEATHER
// ===================================

async function loadWeather(locationPromise, label) {

  const requestId = ++latestRequestId;

  showStatus(
    `⏳ Loading weather for ${label}...`,
    "#fbbf24"
  );

  weatherResult.hidden = true;

  searchButton.textContent = "🔄 Searching...";
  locationButton.textContent = "📍 Finding Weather...";

  weatherForm.setAttribute("aria-busy", "true");

  try {

    // Get the location.
    const location = await locationPromise;

    if (requestId !== latestRequestId) {
      return;
    }

    // Get current weather.
    const weather = await getCurrentWeather(
      location.latitude,
      location.longitude
    );

    if (requestId !== latestRequestId) {
      return;
    }

    // Display weather on the webpage.
    renderWeather(location, weather);

    showStatus(
      "✅ Weather loaded successfully!",
      "#22c55e"
    );

  } catch (error) {

    if (requestId !== latestRequestId) {
      return;
    }

    weatherResult.hidden = true;

    console.error(
      "Weather search issue:",
      error.message
    );

    if (
      error.message ===
      "City not found. Try another name."
    ) {

      showStatus(
        "🔎 No matching city found. Try another name.",
        "#fbbf24"
      );

    } else {

      showStatus(
        `❌ ${error.message}`,
        "#fb7185"
      );

    }

  } finally {

    if (requestId === latestRequestId) {

      searchButton.textContent = "🔍 Search";
      locationButton.textContent = "📍 Use My Location";

      weatherForm.setAttribute("aria-busy", "false");

      console.log("Latest weather request finished!");
    }

  }
}

// ===================================
// 10. HANDLE CITY SEARCH
// ===================================

weatherForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const cityName = cityInput.value.trim();

  if (cityName.length < 2 || cityName.length > 100) {

    latestRequestId++;

    showStatus(
      "❌ Enter a city name between 2 and 100 characters.",
      "#fb7185"
    );

    weatherResult.hidden = true;

    searchButton.textContent = "🔍 Search";
    locationButton.textContent = "📍 Use My Location";

    weatherForm.setAttribute("aria-busy", "false");

    return;
  }

  loadWeather(
    searchCity(cityName),
    cityName
  );

});

// ===================================
// 11. HANDLE LOCATION BUTTON
// ===================================

locationButton.addEventListener("click", function() {

  if (!window.isSecureContext) {

    latestRequestId++;

    weatherResult.hidden = true;

    searchButton.textContent = "🔍 Search";
    locationButton.textContent = "📍 Use My Location";

    weatherForm.setAttribute("aria-busy", "false");

    showStatus(
      "❌ Location requires HTTPS or localhost. Search by city instead.",
      "#fb7185"
    );

    return;
  }

  loadWeather(
    getBrowserLocation(),
    "your location"
  );

});

// ===================================
// 12. WEATHER CODE TESTS
// ===================================

console.assert(
  getWeatherCondition(3, true).description === "Overcast",
  "Code 3 should mean Overcast."
);

console.assert(
  getWeatherCondition(65, true).description === "Heavy rain",
  "Code 65 should mean Heavy rain."
);

console.assert(
  getWeatherCondition(0, false).icon === "🌙",
  "Clear nighttime weather should show a moon."
);

console.assert(
  getWeatherCondition(999, true).icon === "🌡️",
  "Unknown weather codes should use a fallback icon."
);

console.log("Weather condition checks completed!");

// ===================================
// 13. INITIAL MESSAGE
// ===================================

showStatus(
  "Enter a city and click Search.",
  "#94a3b8"
);

console.log("Weather Dashboard is ready!");

// ===================================
// 14. DAY 19 JAVASCRIPT CHALLENGE
// ===================================

// NEW: Fetch a city's temperature and
// return it as a readable message.

async function getCityTemperature(cityName) {

  try {

    // STEP 1: Find the city.
    const location = await searchCity(cityName);

    // STEP 2: Fetch weather using coordinates.
    const weather = await getCurrentWeather(
      location.latitude,
      location.longitude
    );

    // STEP 3: Round the temperature.
    const roundedTemperature = Math.round(
      weather.temperature
    );

    // STEP 4: Return a readable message.
    return `${location.name}: ${roundedTemperature}°C`;

  } catch (error) {

    // STEP 5: Handle API or city errors.
    return `Error: ${error.message}`;

  }

}

// ===================================
// 15. TEST THE NEW FUNCTION
// ===================================

// Test with a real city.
getCityTemperature("Colombo").then(console.log);

// Test with an invalid city.
getCityTemperature("xyznotarealcity123").then(console.log);
