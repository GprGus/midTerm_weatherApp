const latit = '49.246292'; 
const longi = '-123.116226';
const apiKeY = '6cb674453572835b5ade4f38d097ef0e';
const apiUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&units=metric&lon=${longi}&appid=${apiKeY}`;

fetch(apiUrl).then(response => response.json).then(data => {
    const weather = data.filter(item => item.dt_txt.includes('12:00:00'));
    const weatherDiv = document.getElementById('weather');

    weather.forEach(item => {
        let date = new Date(`${item.dt*1000}`);
        const dateText = date.toLocaleDateString();
        const iconWeather = item.weather[0].icon;
        const tempWeather = item.main.temp;
        const minWeather = item.temp_min;
        const maxWeather = item.temp_max;
        const cloudsWeather = item.clouds.all;
        const windSpeedWeather = (item.wind.speed * 3.6)
        const popWeather = item.pop;

        const weatherItem = document.createElement("div");
        weatherItem.innerHTML = `
        <div class="3hourMain">
            <div class="mainContent" style="margin:10px;">
                <img src="https://openweathermap.org/img/wn/${iconWeather}@2x.png">
                <p>${tempWeather}º</p>
                <div class="generalDate">
                    <p>${dateText}</p>
                    <div class="details">
                        <p>&nbsp;${minWeather}º</p>
                        <p>&nbsp;${maxWeather}º</p>
                        <p>&nbsp;${cloudsWeather}%</p>
                        <p>&nbsp;${windSpeedWeather}Km/h</p>
                        <p>&nbsp;${popWeather}%</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        weatherDiv.appendChild(weatherItem);
    });
}).catch(error => {console.error('Error fetching data:', error)});