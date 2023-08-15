// const latit = '49.246292'; 
// const longi = '-123.116226'; 

function informacoesDoTempo(latit,longi){

  const apiKeY = '6cb674453572835b5ade4f38d097ef0e';
  const apiUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&units=metric&lon=${longi}&appid=${apiKeY}`;

  fetch(apiUrL)
.then(response => response.json())
.then(data => {
  const weatherDiv = document.getElementById('weather');
  const date = new Date(data.dt * 1000);
  const dateText = date.toLocaleDateString();
  const iconWeather = data.weather[0].icon;
  const tempWeather = data.main.temp;
  const minWeather = data.main.temp_min;
  const maxWeather = data.main.temp_max;
  const cloudsWeather = data.clouds.all;
  const windSpeedWeather = data.wind.speed * 3.6;
  const popWeather = data.pop;

  const weatherItem = document.createElement("div");
  weatherItem.innerHTML = `
  <div class="3hourMain">
      <div class="mainContent" style="margin:10px;">
          <img src="https://openweathermap.org/img/wn/${iconWeather}.png">
          <p>${tempWeather}º</p>
          <div class="generalDate">
              <p>${dateText}</p>
              <div class="details">
                  <p>&nbsp;${minWeather}º</p>
                  <p>&nbsp;${maxWeather}º</p>
                  <p>&nbsp;${cloudsWeather}%</p>
                  <p>&nbsp;${windSpeedWeather.toFixed(2)} Km/h</p>
                  <p>&nbsp;${popWeather}%</p>
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






