const fs = require("fs");

let tempdata = null;
const cara = '49.246292'; 
const mba = '-123.116226';
const apichave = '6cb674453572835b5ade4f38d097ef0e';
const apilink = `https://api.openweathermap.org/data/2.5/forecast?lat=${cara}&units=metric&lon=${mba}&appid=${apichave}`;

fetch(apilink).then(response => response.json()).then(data => {
    tempdata = data;
    tempdata = JSON.stringify(tempdata)
    
    fs.writeFile("currentWeather.json", tempdata, (error) => {
        if(error) {
            console.log("Error detected: ", error)
            throw error
        }
        console.log("file written sucessfully ")
    })
})
