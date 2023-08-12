const fs = require("fs");

let tempdata = null;
const latit = '49.246292'; 
const longi = '-123.116226';
const apiKeY = '6cb674453572835b5ade4f38d097ef0e';
const apiUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&units=metric&lon=${longi}&appid=${apiKeY}`;

fetch(apiUrL).then(response => response.json()).then(data => {
    tempdata = data;
    // console.log(data)
    tempdata = JSON.stringify(tempdata)
    
    fs.writeFile("currentWeather.json", tempdata, (error) => {
        if(error) {
            console.log("Error detected: ", error)
            throw error
        }
        console.log("file written sucessfully ")
    })
})
