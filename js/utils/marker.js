var inputKeyword = ko.observable("");
// do not change self function to arrow function, will cause the constructor error
function Markers(markerItem) {
  // console.log(markerItem)
  var self = this;
  self.title = markerItem.title;
  self.position = markerItem.position;
  // console.log(self.position)

  // when you fileter the sidebar options text or click it, the marker in side bar will up
  self.visible = ko.computed(() => {
    // convert the input keyword to toLowerCase
    var lowerCaseInputKeywords = inputKeyword().toLowerCase();
    // console.log(lowerCaseInputKeywords)
    //  conver the 54 states into the lovwerCase
    var lowerCaseplaceName = self.title.toLowerCase();
    // console.log(placeName)
    // let x = placeName.indexOf(inputKeywords)
    // console.log(x)
    // return a boolean value, only when the indexOf value is -1, means no result come out
    // The indexOf() method returns -1 if the value is not found.
    // https://www.w3schools.com/jsref/jsref_indexof.asp

    return lowerCaseplaceName.indexOf(lowerCaseInputKeywords) != -1;
  });

  self.marker = new google.maps.Marker({
    position: self.position,
    title: self.title,
    animation: google.maps.Animation.DROP,
  });

  // marker content
  google.maps.event.addListener(self.marker, "click", () => {
    //  console.log(self.markerProperty)
    infoWindow.setContent(self.title);
    infoWindow.open(map, self.marker);

    // marker animation effect
    if (self.marker.getAnimation() != null) {
      self.marker.setAnimation(null);
    } else {
      // marker shake logic here, it will shake 2 seconds
      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        self.marker.setAnimation(null);
      }, 2000);
    }
  });
}
