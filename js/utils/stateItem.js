var inputKeyword = ko.observable("");
// do not change self function to arrow function, will cause the constructor error
function stateItemProperty(stateItem) {

  var self = this;
  self.title = stateItem.title;
  self.position = stateItem.position;
  self.InUS = stateItem.InUS;
  self.marker = stateItem.marker;
  self.markerContent="marker content"

  // check if the input keyword is in the data
  self.InUS = ko.computed(() => {
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

  // marker click content
  google.maps.event.addListener(self.marker, "click", () => {
  //  marker coontent, you can get from the top value, but it needs to be the string
  
    infoWindow.setContent(self.markerContent);

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
