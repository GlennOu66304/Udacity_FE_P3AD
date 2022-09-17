
var filterText = ko.observable("");
// do not change this function to arrow function, will cause the constructor error
var Markers = function (data) {
    var self = this;
    this.title = data.title;
    this.position = data.position;
  
    this.visible = ko.computed(() => {
      var re = filterText().toLowerCase();
      var placeName = self.title.toLowerCase();
      return placeName.indexOf(re) != -1;
    });
  
    this.marker = new google.maps.Marker({
      position: self.position,
      title: self.title,
      animation: google.maps.Animation.DROP,
    });
  
    google.maps.event.addListener(self.marker, "click", () => {
      infoWindow.setContent(self.title);
      infoWindow.open(map, self.marker);
  
      if (self.marker.getAnimation() != null) {
        self.marker.setAnimation(null);
      } else {
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
          self.marker.setAnimation(null);
        }, 2000);
      }
      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url +=
        "?" +
        $.param({
          "api-key": "e0b93df3888e46909bf05877841c3512",
        });
      $.ajax({
        url: url,
        method: "GET",
      })
        .done(function (result) {
          infoWindow.setContent(result.response.docs[0].snippet);
        })
        .fail(function (err) {
          throw err;
        });
    });
  };
  

// knouck out js function use
var viewModel = function () {
    this.isShowSidebar = ko.observable(true);
    //   close or open the side bar

    // set state value
    this.toggleSidebar = function () {
      var x = document.getElementById("drawer");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    };
  
    //   inilized dropdonw data list
    var self = this;
    this.placesList = [];
  
    // push the makers to the map, use the markers function here
    placesJson.forEach((place) => {
      // push the makers to the map, use the markers function here
      self.placesList.push(new Markers(place));
      // console.log(this.placesList)
    });
  
    // set marker function
    this.placesList.forEach((place) => {
      place.marker.setMap(map, place.position);
    });
  
    // search result list display
    this.filteredList = ko.computed(() => {
      var result = [];
      self.placesList.forEach((place) => {
        if (place.visible()) {
          result.push(place);
          // console.log(result)
          place.marker.setMap(map, place.position);
        } else {
          place.marker.setMap(null);
        }
      });
  
      return result;
    });
  
    //  show or close the marker display
    this.listClick = function (place) {
      google.maps.event.trigger(place.marker, "click");
    };
  };

 