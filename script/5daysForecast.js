function handleClick(dateText) {
    const finalData = formatDate(dateText); 
    fetch3HoursForecast(finalData); 
}

function informacoesDoTempo(lat,lon){
    const apiKey = '6cb674453572835b5ade4f38d097ef0e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        const forecastDiv = document.getElementById('forecast');

        forecastDiv.innerHTML = "";

        forecast.forEach(item => {
            const date = new Date(item.dt*1000);
            const dateText = date.toLocaleDateString();
            const temp = item.main.temp;
            const finalTemp = Math.ceil(temp);
            const icon = item.weather[0].icon;
            // console.log(icon)
            const rain = (item.pop*100);
            const min = item.main.temp_min;
            const max = item.main.temp_max;
            const finalMin = Math.round(min);
            const finalMax = Math.ceil(max);
            const wind = item.wind.speed;
            const clouds = item.clouds.all;
            const forecastItem = document.createElement('div');
            forecastItem.innerHTML = `
            <div class="card" onclick="handleClick('${dateText}')">
                <div class="card-content" style="margin:10px;">
                    <h2>${dateText}</h2>
                    <div class="tempIcon">
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                        <p class="temp">${finalTemp}º</p>
                    </div>
                    <div class="minMaxTemp">
                        <p><i class="fa-solid fa-temperature-arrow-down"></i>&nbsp;${finalMin}º</p>
                        <p><i class="fa-solid fa-temperature-arrow-up"></i>&nbsp;${finalMax}º</p>
                    </div>
                    <div class="cloudWind">
                        <p><i class="fa-solid fa-cloud"></i>&nbsp;${clouds}%</p>
                        <p><i class="fa-solid fa-wind"></i>&nbsp;${Math.ceil(wind*3.6)}Km/h</p>
                    </div>
                    <div>
                    <p><i class="fa-solid fa-cloud-rain"></i>&nbsp;${rain}%</p>
                    </div>
                </div>
            </div>
            `;
            forecastDiv.appendChild(forecastItem);
        });
    }).catch(error => {console.error('Error fetching data:', error)});

}