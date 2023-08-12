const lati = '49.246292'; 
const long = '-123.116226';
const ApiKey = '6cb674453572835b5ade4f38d097ef0e';
const ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&units=metric&lon=${long}&appid=${ApiKey}`;

fetch(apiUrl)
.then(response => response.json)
.then(data => {
    const aa = data.list.weather.icon;
    console.log(aa);
});