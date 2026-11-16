
console.log("----- Day 19: Weather API Module -----");

// ===================================
// 1. API SETTINGS
// ===================================

// STEP 9: Set to true to test an API error.
// After testing, change it to false.

const TEST_WEATHER_ERROR = false;


// Geocoding API - finds city coordinates.
const GEO_API_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

// Weather API - fetches real weather.
const WEATHER_API_URL = TEST_WEATHER_ERROR
  ? "https://api.open-meteo.com/v1/not-a-real-endpoint"
  : "https://api.open-meteo.com/v1/forecast";

// ===================================
// 2. SEARCH FOR A CITY
// ===================================

export async function searchCity(cityName) {

  const city = cityName.trim();

  // Validate city name.
  if (city.length < 2 || city.length > 100) {
    throw new Error(
      "Please enter a city name between 2 and 100 characters."
    );
  }

  // Build the geocoding URL.
  const url = new URL(GEO_API_URL);

  url.searchParams.set("name", city);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  // Fetch city coordinates.
  const response = await fetch(url);

  // Handle HTTP errors.
  if (!response.ok) {
    throw new Error(
      `Location search failed: HTTP ${response.status}`
    );
  }

  // Convert JSON response to JavaScript data.
  const data = await response.json();

  // Handle cities that cannot be found.
  if (
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error(
      "City not found. Try another name."
    );
  }

  const location = data.results[0];

  // Validate coordinates.
  if (
    !Number.isFinite(location.latitude) ||
    !Number.isFinite(location.longitude)
  ) {
    throw new Error("Invalid location data.");
  }

  // Return useful city information.
  return {
    name: location.name,
    country: location.country ?? "",
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone ?? "auto"
  };
}

// ===================================
// 3. FETCH CURRENT WEATHER
// ===================================

export async function getCurrentWeather(
  latitude,
  longitude
) {

  // Validate coordinates.
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Invalid weather coordinates.");
  }

  // Build weather API URL.
  const url = new URL(WEATHER_API_URL);

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "weather_code",
      "is_day"
    ].join(",")
  );

  url.searchParams.set("timezone", "auto");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("wind_speed_unit", "kmh");

  console.log("Fetching current weather...");

  // Fetch weather data.
  const response = await fetch(url);

  console.log(
    "Weather API HTTP status:",
    response.status
  );

  // Detect HTTP errors.
  if (!response.ok) {
    throw new Error(
      `Weather request failed: HTTP ${response.status}`
    );
  }

  // Parse JSON.
  const data = await response.json();

  const current = data.current;

  // Validate weather data.
  if (
    !current ||
    !Number.isFinite(current.temperature_2m) ||
    !Number.isFinite(current.relative_humidity_2m) ||
    !Number.isFinite(current.wind_speed_10m) ||
    !Number.isFinite(current.weather_code) ||
    ![0, 1].includes(current.is_day)
  ) {
    throw new Error("Invalid weather data received.");
  }

  // Return normalized weather information.
  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1
  };
}
