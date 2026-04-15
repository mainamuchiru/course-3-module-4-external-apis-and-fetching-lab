document.addEventListener("DOMContentLoaded", function (event) {
  // your code here

  // index.js
  const weatherApi = "https://api.weather.gov/alerts/active?area=";

  const btnFetch = document.getElementById("fetch-alerts");
  const alertDiv = document.getElementById("alerts-display");
  const errortDiv = document.getElementById("error-message");
  // Your code here!

  btnFetch.addEventListener("click", () => {
    //errortDiv = ""
    const stateTxt = document.getElementById("state-input").value;
    if(stateTxt == stateTxt.toUpperCase() && stateTxt.length === 2) {
    console.log(stateTxt);
    fetchWeatherAlerts(stateTxt);
  }else {
    
    console.log("Error detected")
    displayError("Invalid Input")
  }
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
    errortDiv.innerHTML = ""
    alertDiv.innerHTML = ""
    const liElement = document.createElement("li");
    const headerTitle = document.createElement("h3")
    headerTitle.textContent = data.title
    alertDiv.append(headerTitle)
    alertDiv.innerHTML = `<h3> ${data.title} <h3>`;
    for (let i = 0; i < data.features.length; i++) {
      const headlineInfo = data.features[i].properties.headline;
      const pItem = document.createElement("p");
      pItem.textContent = headlineInfo;
      alertDiv.append(pItem);
    }
  }

  function displayError(errormsg) {
    console.log(`${errormsg}`)
    alertDiv.innerHTML = ""
    
    // errortDiv.innerText = errormsg
    // errortDiv.setVisibility = visible
    const errItem = document.createElement("p");
    errItem.textContent = errormsg
    errortDiv.append(errItem)
  }
});
