document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const response = await fetch(`/weather?city=${city}`);
      if (!response.ok) throw new Error("City not found");

      const weatherData = await response.json();
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  function displayWeatherData(weatherData) {
    const { name } = weatherData;
    const { temp } = weatherData.main;
    const { description } = weatherData.weather[0];

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${temp}°C`;
    descriptionDisplay.textContent = `Condition: ${description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
