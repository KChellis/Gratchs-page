


let map;
let service;
let infowindow;

function initialize() {
  let portland = new google.maps.LatLng(45.520816, -122.677638);

  map = new google.maps.Map(document.getElementById('map'), {
      center: portland,
      zoom: 15
    });

  let request = {
    location: portland,
    radius: '500',
    query: 'dog park'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      let place = results[i];
      createMarker(results[i]);
    }
  }
}
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");
    $.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_KEY}&libraries=places`).then(function(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }).fail(function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  });
});
