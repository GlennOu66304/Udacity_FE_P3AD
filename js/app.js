// do not put those two text in the function body
// Why isn't this an instance of map of google.maps.Map? InvalidValueError: setMap: not an instance of Map;
// https://stackoverflow.com/questions/33641663/why-isnt-this-an-instance-of-map-of-google-maps-map-invalidvalueerror-setmap
var map, inforWindow
function start() {
  // do not change this function to arrow function, will cause the constructor error

  // knouck out js function use
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: placesJson[2].position,
    zoom: 5,
  });
  infoWindow = new google.maps.InfoWindow();
  ko.applyBindings(new viewModel());
}



function googleError() {
  alert("google map wrong!");
}
