
# Day 19 - Weather Dashboard 🌤️

## Project Overview

A responsive Weather Dashboard built using HTML, CSS,
and JavaScript.

Users can search for a city to view current weather
conditions or optionally use their browser location.

This project is part of my 87-Day AI + Full-Stack
Developer Roadmap.

## Features

- Search for cities around the world
- Display current temperature in Celsius
- Display humidity and wind speed
- Show weather descriptions and icons
- Detect day and night for selected weather icons
- Display loading, success, and error messages
- Handle unknown cities and invalid input
- Handle HTTP and network errors
- Ignore outdated API responses during rapid searches
- Optionally retrieve weather using browser geolocation
- Handle location permission denial and timeout
- Responsive layout for mobile and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript ES Modules
- Fetch API
- Async/Await
- Promises
- Browser Geolocation API
- Open-Meteo APIs

## APIs

### Geocoding API

Used to find a city's latitude and longitude.

https://geocoding-api.open-meteo.com/v1/search

### Weather Forecast API

Used to retrieve current weather information.

https://api.open-meteo.com/v1/forecast

The project uses Open-Meteo's public API endpoints.

## Project Structure

day-19/
    index.html
    style.css
    api.js
    script.js
    README.md

## How to Run

1. Open the project folder in VS Code.
2. Open index.html using Live Server.
3. Enter a city name.
4. Click Search.
5. View the current weather information.

Alternatively, click "Use My Location" and grant
browser permission if you want location-based weather.

Geolocation normally requires HTTPS or localhost.

## JavaScript Architecture

### api.js

Responsible for:
- Searching for city coordinates
- Requesting current weather
- Checking HTTP responses
- Validating API data
- Returning normalized data

### script.js

Responsible for:
- Handling user interactions
- Updating the DOM
- Displaying weather conditions
- Showing loading and error messages
- Managing the latest request ID
- Handling optional browser geolocation

## Error Handling

The application handles:

1. Invalid city names
2. Cities with no search results
3. HTTP API failures
4. Unexpected API data
5. Network failures
6. Outdated API responses
7. Geolocation permission denial
8. Geolocation timeout and unavailable location

## Testing

Manual tests include:

- Search for Colombo
- Search for London
- Search for Tokyo
- Search for an unknown city
- Submit invalid city input
- Search again after an error
- Start multiple searches quickly
- Test an intentionally broken weather API URL
- Restore the API URL and confirm recovery
- Test the browser location button

JavaScript console assertions also check selected
weather-code descriptions and icons.

## Important Configuration

In api.js:

const TEST_WEATHER_ERROR = false;

Keep this value set to false for normal usage.

Setting it to true intentionally uses an invalid
weather endpoint for HTTP error testing.

## Privacy

The location feature is optional.

If permission is granted, browser-provided coordinates
are sent to the weather API to retrieve weather data.

Users can continue searching by city without granting
location permission.

## What I Learned

- How async/await works with Promises
- How to make API requests using fetch()
- How to check response.ok
- How to handle errors using try/catch/finally
- How to separate API logic from DOM rendering
- How to use JavaScript objects as lookup tables
- How to manage loading, success, and error states
- How to prevent outdated requests from updating the UI
- How to work with browser geolocation permissions

## Roadmap Progress

Day 19 of 87 - JavaScript + Browser APIs + Mini Apps
