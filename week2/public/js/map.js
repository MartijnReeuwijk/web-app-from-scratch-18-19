// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

// Change stings to numbers and change so i dont need to reurn an arry
var map, infoWindow;
function initMap(victim) {
  console.log(victim);
  var locationVictim = {
    lat: parseFloat(victim[0].latitude),
    lng: parseFloat(victim[0].longitude)
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: locationVictim,
    zoom: 19
  });
  var marker = new google.maps.Marker({
    position: locationVictim,
    map: map,
    title: parseFloat(victim[0].incident_key)
  });
  infoWindow = new google.maps.InfoWindow();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
