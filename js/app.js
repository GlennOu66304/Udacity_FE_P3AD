var filterText = ko.observable("");

var map, inforWindow;

// initialize the map function
function start() {
  // render the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: placesJson[2].position,
    zoom: 5,
  });

  infoWindow = new google.maps.InfoWindow();

  //   knockout function binding here
  ko.applyBindings(new viewModel());
}

function googleError() {
  alert("google map wrong!");
}