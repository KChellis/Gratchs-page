// import {  } from "./backend.js"
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
console.log(process.env.MAPS_KEY);
const mapsapi = require('google-maps-api')(process.env.MAPS_KEY, ['places']);
let map;
let service;
let request;
mapsapi().then(function(maps) {
  let portland = new maps.LatLng(45.520816, -122.677638);

  map = new maps.Map(document.getElementById('maps'), {
      center: portland,
      zoom: 12
    });

  request = {
    location: portland,
    radius: '500',
    query: 'dog park'
  };
  let infowindow = new maps.InfoWindow();
  service = new maps.places.PlacesService(map);
  service.textSearch(request, callback);

  function callback(results, status) {
    if (status == maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        var marker = new maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });
        maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Rating: ' + place.rating + ' of 5 stars<br>' + place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    }
  }
});
$(function() {
  mapsapi;
});
