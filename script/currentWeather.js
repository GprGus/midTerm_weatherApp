const latit = parseFloat(localStorage.getItem("latitude"));
const longi = parseFloat(localStorage.getItem("longitude"));

function currentWeather(latitude,longitude){
  const apiKeY = '6cb674453572835b5ade4f38d097ef0e';
  const apiUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeY}`;

  fetch(apiUrL)
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById('weather');
      const date = new Date(data.dt * 1000);
      const dateText = date.toLocaleDateString();
      const iconWeather = data.weather[0].icon;
      const city = localStorage.getItem("cityName");
      const tempWeather = Math.round(data.main.temp - 273.15);
      const fWeather = Math.round((data.main.temp - 273.15) * 9/5 + 32);
      const minWeather = Math.round(data.main.temp_min - 273.15);
      const maxWeather = Math.round(data.main.temp_max - 273.15);
      const fMinWeather = Math.round((data.main.temp_min - 273.15) * 9/5 + 32)
      const fMaxWeather = Math.round((data.main.temp_max - 273.15) * 9/5 + 32)
      const cloudsWeather = data.clouds.all;
      const windSpeedWeather = Math.round(data.wind.speed * 3.6);

      weatherDiv.innerHTML = "";

      const weatherItem = document.createElement("div");
      weatherItem.innerHTML = `
      <div class="frame">
        <div class="alignment">
          <div class="currentTitle">
            <h2>${city}</h2>
            <h3>${tempWeather}ºC</h3>
          </div>
          <i id="iconElementId" onclick="changeIcon(this)" class="fa-sharp fa-regular fa-star" style="color: #ffa50a;"></i>
        </div>
        <div class="ThourMain">
          <div class="mainContent" style="margin:10px;">
            <div class="dateIcon">
              <h2>${dateText}</h2>
              <img src="https://openweathermap.org/img/wn/${iconWeather}@4x.png">            
            </div>
            <div class="temp">
              <div class="generalDate">
                <p><i class="fa-solid fa-temperature-arrow-up"></i>&nbsp;${maxWeather}ºC</p>
                <p><i class="fa-solid fa-temperature-arrow-down"></i>&nbsp;${minWeather}ºC</p>
                <p><i class="fa-solid fa-cloud"></i>&nbsp;${cloudsWeather}%</p>
                <p><i class="fa-solid fa-wind"></i>&nbsp;${windSpeedWeather}Km/h</p>
              </div>
            </div>      
          </div>
        </div>
      </div>
      `;
      weatherDiv.appendChild(weatherItem);
    })                                                         
    .catch(error => {
      console.error('Error fetching data:', error);
  });
}


document.addEventListener("DOMContentLoaded", function() {
  restoreAppendedCities();
  
  var selectElement = document.getElementById("favorites-list");
  
  selectElement.addEventListener("change", function(event) {
    var selectedOption = event.target.options[event.target.selectedIndex];
    var selectedCity = selectedOption.value;
    var lat = selectedOption.getAttribute("data-lat");
    var lng = selectedOption.getAttribute("data-lng");

    localStorage.setItem("cityName", selectedCity);
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);

    const date = transportDate();
    
    dailyForecast(lat,lng);

    hourlyForecast(date,lat,lng);

    currentWeather2(lat,lng); 
  });
});

function changeIcon(x) {
  // Toggle the icon class
  x.classList.toggle("fa-solid");
 
   // Retrieve "cityName" from localStorage
  var cityName = localStorage.getItem("cityName");
  var lat = localStorage.getItem("latitude")
  var lng = localStorage.getItem("longitude")

  // Find the select element
  var selectElement = document.getElementById("favorites-list");

  // Check if the cityName is already in the select options
  var optionExists = false;
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === cityName) {
      optionExists = true;
      break;
    }
  }

  // If the option exists, remove it; otherwise, add it
  if (optionExists) {
    for (var i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].value === cityName) {
        selectElement.remove(i);
        break;
      }
    }

    // Remove cityName from localStorage
    var storedCities = JSON.parse(localStorage.getItem("storedCities"));
    storedCities = storedCities.filter(city => city !== cityName);
    localStorage.setItem("storedCities", JSON.stringify(storedCities));
  } else {
    // Append cityName as an option to the select element
    if (cityName) {
      var optionElement = document.createElement("option");
      optionElement.value = cityName;
      optionElement.text = cityName;
      optionElement.setAttribute("data-lat", lat);
      optionElement.setAttribute("data-lng", lng);
      selectElement.appendChild(optionElement);

      // Add cityName to localStorage
      var storedCities = JSON.parse(localStorage.getItem("storedCities")) || [];
      storedCities.push(cityName);
      localStorage.setItem("storedCities", JSON.stringify(storedCities));
    }
  }
}

// Restore the appended cities from localStorage on page load
function restoreAppendedCities() {
  var storedCities = JSON.parse(localStorage.getItem("storedCities")) || [];
  var selectElement = document.getElementById("favorites-list");

  for (var i = 0; i < storedCities.length; i++) {
    var optionElement = document.createElement("option");
    optionElement.value = storedCities[i];
    optionElement.text = storedCities[i];
    
    // Create hidden options for lat and lng values
    var latOption = document.createElement("option");
    latOption.value = storedCities[i] + "_lat";
    latOption.text = storedCities[i] + "_lat";
    latOption.style.display = "none";
    
    var lngOption = document.createElement("option");
    lngOption.value = storedCities[i] + "_lat";
    lngOption.text = storedCities[i] + "_lng";
    lngOption.style.display = "none";
    
    // Append options to select element
    selectElement.appendChild(optionElement);
    selectElement.appendChild(latOption);
    selectElement.appendChild(lngOption);
  }
}
