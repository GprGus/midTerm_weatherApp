function formatDate(str) {
    const parts = str.split('/'); // Split the input string by "/"
    const year = parts[2];
    const month = parts[0].padStart(2, '0'); // Ensure 2-digit month format
    const day = parts[1].padStart(2, '0'); // Ensure 2-digit day format
    
    return `${year}-${month}-${day}`;
  }

const latitu = '49.246292'; 
const longit = '-123.116226';
const apiKEY = '6cb674453572835b5ade4f38d097ef0e';
const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitu}&units=metric&lon=${longit}&appid=${apiKEY}`;
function fetch3HoursForecast(date) {
    console.log(date)
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const hourlyForecast = data.list.filter(item => item.dt_txt.includes(date));
        const hourlyForecastDiv = document.getElementById('hourlyForecast');
        hourlyForecastDiv.innerHTML = ``;
        hourlyForecast.forEach(item => {
            const dAte = new Date(item.dt*1000.015);
            const DateText = dAte.toLocaleDateString();
            const TemP = Math.round(item.main.temp);
            const MiN = Math.round(item.main.temp_min);
            const MaX = Math.ceil(item.main.temp_max);
            const ClouD = item.clouds.all;
            const hourlyForecastItem = document.createElement('div');
            hourlyForecastItem.innerHTML = `
            <div class="section">
                <div class="section-content">
                    <p style="text-align:center;margin-bottom:-10px;">${DateText}</p>
                    <div class="details1">
                        <p>${TemP}º</p>
                        <p style="margin-left:10px;"><i class="fa-solid fa-cloud"></i>&nbsp;${ClouD}</p>
                    </div>
                    <div class="details2">
                        <p><i class="fa-solid fa-temperature-arrow-down"></i>&nbsp;${MiN}</p>
                        <p style="margin-left:10px;"><i class="fa-solid fa-temperature-arrow-up"></i>&nbsp;${MaX}</p>
                    </div>
                </div>
            </div>
            `;
            hourlyForecastDiv.appendChild(hourlyForecastItem);
        });
    }).catch(error => {console.error('Error fetching data:', error)});
}