// Initialize the Google Places Autocomplete
const cityInput = document.getElementById('cityInput');
const autocomplete = new google.maps.places.Autocomplete(cityInput, {
  types: ['(cities)'],
  componentRestrictions: { country: 'us' } // Optionally restrict to a specific country
});

autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();
    if (place && place.types.includes('locality')) {
      console.log('Selected city:', place.name);
    }
  });
  