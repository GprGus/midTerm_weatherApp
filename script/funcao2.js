// const latit2 = parseFloat(localStorage.getItem("latitude"));
// const longi2 = parseFloat(localStorage.getItem("longitude"));

function currentWeather2(latitude,longitude){
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
        <div class="currentTitle">
          <h2>${city}</h2>
          &nbsp;&nbsp;<i id="iconElementId" onclick="changeIcon(this)" class="fa-sharp fa-solid fa-star" style="color: #ffa50a;"></i>
        </div>
        <h2>${tempWeather}ºC</h2>
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