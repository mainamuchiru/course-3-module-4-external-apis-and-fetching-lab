document.addEventListener("DOMContentLoaded", function (event) {
  // your code here

  // index.js
  const weatherApi = "https://api.weather.gov/alerts/active?area=";

  const btnFetch = document.getElementById("fetch-alerts");
  const alertDiv = document.getElementById("alerts-display");
  const errortDiv = document.getElementById("error-message");
  // Your code here!

  btnFetch.addEventListener("click", () => {
    // console.log(toString(stateTxt))
    const stateTxt = document.getElementById("state-input").value;
    console.log(stateTxt);
    fetchWeatherAlerts(stateTxt);
  });

  function fetchWeatherAlerts(state) {
    fetch(weatherApi + `${state}`)
      .then((response) => response.json())
      .then(
        (data) => displayAlerts(data),
        // console.log(data)
      )
      .catch(
        (error) => displayError(error),
        // console.log(error.message));
      );
  }

  function displayAlerts(data) {
    const liElement = document.createElement("li")
    // const pItem = document.createElement("p")
    // const headerTitle = document.createElement("h1")
    //  alertDiv.innerHTML = headerTitle.textContent(data.title)
    alertDiv.innerHTML = `<h3> ${data.title} <h3>`;
    // headerTitle.textContent(data.title)
    // liElement.append(headerTitle)

    // console.log(data.title);
    for (let i = 0; i < data.features.length; i++) {
      const headlineInfo = data.features[i].properties.headline;
      const pItem = document.createElement("p")
        pItem.textContent = headlineInfo
        liElement.append(pItem)
        alertDiv.append(headlineInfo)
    //   alertDiv.innerHTML = `<li> ${headlineInfo} <li>`;
    //   alertDiv.append(`${headlineInfo}`)
    }
  }

  function displayError(error) {
    errortDiv.innerHTML = error.message
  }

  
});
