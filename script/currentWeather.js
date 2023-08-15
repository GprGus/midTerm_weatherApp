const latit = '49.246292';
const longi = '-123.116226';

const apiKeY = '6cb674453572835b5ade4f38d097ef0e';
const apiUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longi}&appid=${apiKeY}`;

fetch(apiUrL)
  .then(response => response.json())
  .then(data => {
    const weatherDiv = document.getElementById('weather');
    const date = new Date(data.dt * 1000);
    const dateText = date.toLocaleDateString();
    const iconWeather = data.weather[0].icon;
    const tempWeather = Math.round(data.main.temp - 273.15);
    const fWeather = Math.round((data.main.temp - 273.15) * 9/5 + 32);
    const minWeather = Math.round(data.main.temp_min - 273.15);
    const maxWeather = Math.round(data.main.temp_max - 273.15);
    const fMinWeather = Math.round((data.main.temp_min - 273.15) * 9/5 + 32)
    const fMaxWeather = Math.round((data.main.temp_max - 273.15) * 9/5 + 32)

    const cloudsWeather = data.clouds.all;
    const windSpeedWeather = Math.round(data.wind.speed * 3.6);

    const weatherItem = document.createElement("div");
    weatherItem.innerHTML = `
    <div class="ThourMain">
      <div class="mainContent" style="margin:10px;">
        <div class="dateIcon">
          <h2>${dateText}</h2>
          <img src="https://openweathermap.org/img/wn/${iconWeather}@4x.png">            
        </div>
        <div class="temp">
          <h2>${fWeather}ºF / ${tempWeather}ºC</h2> 
          <div class="generalDate">
          <p><i class="fa-solid fa-temperature-arrow-up"></i>&nbsp;${fMaxWeather}ºF / ${maxWeather}ºC</p>
          <p><i class="fa-solid fa-temperature-arrow-down"></i>&nbsp;${fMinWeather}ºF / ${minWeather}ºC</p>
            <p><i class="fa-solid fa-cloud"></i>&nbsp;${cloudsWeather}%</p>
            <p><i class="fa-solid fa-wind"></i>&nbsp;${windSpeedWeather}Km/h</p>
            <input type="checkbox" id="myCheck" onclick="favorites()">
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
