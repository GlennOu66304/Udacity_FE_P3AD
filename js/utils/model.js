// do not change this function to arrow function, will cause the constructor error

// knouck out js function use
function viewModel() {
  var self = this;
  this.placesList = [];
  // push the makers to the map, use the markers function here
  let placesList = placesJson.forEach((place) => {
    // push the makers to the map, use the markers function here
    self.placesList.push(new markerProperty(place));
    console.log(this.placesList)
  });

  // search result list display
  self.searchResult = ko.computed(() => {
    var searchResult = [];
    self.placesList.forEach((stateItem) => {
      if (stateItem.InData()) {
        searchResult.push(stateItem);
        // console.log(result)
        stateItem.marker.setMap(map, stateItem.position);
      } else {
        stateItem.marker.setMap(null);
      }
    });

    return searchResult;
  });

  // when you click the search result list item, it will show the marker in the map
  this.listClick = function (place) {
    google.maps.event.trigger(place.marker, "click");
  };
}
