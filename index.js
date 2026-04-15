document.addEventListener("DOMContentLoaded", function () {
  const weatherApi = "https://api.weather.gov/alerts/active?area=";

  const btnFetch = document.getElementById("fetch-alerts");
  const alertDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  btnFetch.addEventListener("click", () => {
    const input = document.getElementById("state-input");
    const stateTxt = input.value;

    if (stateTxt === stateTxt.toUpperCase() && stateTxt.length === 2) {
      fetchWeatherAlerts(stateTxt);
      input.value = "";
    } else {
      displayError("Invalid Input");
    }
  });

  function fetchWeatherAlerts(state) {
    fetch(weatherApi + state)
      .then((response) => response.json())
      .then((data) => displayAlerts(data))
      .catch((error) => displayError(error));
  }

  function displayAlerts(data) {
    errorDiv.innerHTML = "";
    errorDiv.classList.add("hidden");

    alertDiv.innerHTML = "";

    const count = data.features.length;

    const header = document.createElement("h3");
    header.textContent = `Weather Alerts: ${count}`;
    alertDiv.append(header);

    data.features.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.properties.headline;
      alertDiv.append(p);
    });
  }

  function displayError(message) {
    alertDiv.innerHTML = "";

    errorDiv.classList.remove("hidden");

    if (typeof message === "string") {
      errorDiv.innerText = message;
    } else {
      errorDiv.innerText = message.message;
    }
  }
});
