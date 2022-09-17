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
  
