function transportDate(){
  
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate());  // Pagar a data do dia seguinte
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // O mês em Javascript é indexado de 0 a 11
  let ano = dataAtual.getFullYear();
  if (dia < 10) { dia = '0' + dia; }
  if (mes < 10) { mes = '0' + mes; }
  return `${ano}-${mes}-${dia}`;

}

if ("geolocation" in navigator && !localStorage.getItem("geolocationDone_")) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);

      // get the date
      const date = transportDate();

      // load currentWeather
      currentWeather(latitude,longitude);

      // load 5 days forecast
      dailyForecast(latitude,longitude);

      // load 3 hours forecast
      hourlyForecast(date,latitude,longitude);

      // Use the OpenStreetMap Nominatim API for reverse geocoding
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
          localStorage.setItem("cityName", city);
          localStorage.setItem("geolocationDone", true); // Set the flag to indicate geolocation is done
        })
        .catch(error => {
          console.error('Error getting city:', error);
        });


    },
    function(error) {
      console.error('Error getting location:', error.message);
    }
  );
} else {
  console.error('Geolocation is not available');
}
