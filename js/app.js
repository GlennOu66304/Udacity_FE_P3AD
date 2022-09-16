var filterText = ko.observable("");

var map, inforWindow;

// source of data json format

var placesJson = [
  {
    title:"Alaska",
    position:{
    lat:61.3850,
    lng:-152.2683
    }
  },
  {
    title:"Alabama",
    position:{
    lat:32.7990,
    lng:-86.8073
    }
  },
  {
    title:"Arkansas",
    position:{
    lat:34.9513,

    lng:-92.3809
    }
  },
  {
    title:"Arizona",
    position:{
    lat:33.7712,
    lng:-111.3877
    }
  },
  {
    title:"California",
    position:{
    lat:36.1700,
    lng:-119.7462
    }
  },
  {
    title:"Colorado",
    position:{
    lat:39.0646,
    lng:-105.3272
    }
  },
  {
    title:"Connecticut",
    position:{
    lat:41.5834,
    lng:-72.7622
    }
  },
  {
    title:"Delaware",
    position:{
    lat:39.3498,
    lng:-75.5148
    }
  },
  {
    title:"Florida",
    position:{
    lat:27.8333,
    lng:-81.7170
  }
  },
  {
    title:"Georgia",
    position:{
    lat:32.9866,
    lng:-83.6487 }
  },
  {
    title:"Hawaii",
    position:{
    lat:21.1098,
    lng:-157.5311 }
  },
  {
    title:"Iowa",
    position:{
    lat:42.0046,
    lng:-93.2140 }
  },
  {
    title:"Idaho",
    position:{
    lat:44.2394,
    lng:-114.5103 }
  },
  {
    title:"Illinois",
    position:{
    lat:40.3363,
    lng:-89.0022 }
  },
  {
    title:"Indiana",
    position:{
    lat:39.8647,
    lng:-86.2604 }
  },
  {
    title:"Kansas",
    position:{
    lat:38.5111,
    lng:-96.8005 }
  },
  {
    title:"Kentucky",
    position:{
    lat:37.6690,
    lng:-84.6514 }
  },
  {
    title:"Louisiana",
    position:{
    lat:31.1801,
    lng:-91.8749 }
  },
  {
    title:"Massachusetts",
    position:{
    lat:42.2373,
    lng:-71.5314 }
  },
  {
    title:"Maryland",
    position:{
    lat:39.0724,
    lng:-76.7902 }
  },
  {
    title:"Maine",
    position:{
    lat:44.6074,
    lng:-69.3977 }
  },
  {
    title:"Michigan",
    position:{
    lat:43.3504,
    lng:-84.5603 }
  },
  {
    title:"Minnesota",
    position:{
    lat:45.7326,

    lng:-93.9196 }
  },
  {
    title:"Missouri",
    position:{
    lat:38.4623,
    lng:-92.3020 }
  },
  {
    title:"Mississipositionpositioni",
    position:{
    lat:32.7673,
    lng:-89.6812 }
  },
  {
    title:"Montana",
    position:{
    lat:46.9048,
    lng:-110.3261 }
  },
  {
    title:"North Carolina",
    position:{
    lat:35.6411,
    lng:-79.8431 }
  },
  {
    title:"North Dakota",
    position:{
    lat:47.5362,
    lng:-99.7930 }
  },
  {
    title:"Nebraska",
    position:{
    lat:41.1289,
    lng:-98.2883 }
  },
  {
    title:"New Hampositionshire",
    position:{
    lat:43.4108,
    lng:-71.5653 }
  },
  {
    title:"New Jersey",
    position:{
    lat:40.3140,
    lng:-74.5089 }
  },
  {
    title:"New Mexico",
    position:{
    lat:34.8375,
    lng:-106.2371 }
  },
  {
    title:"Nevada",
    position:{
    lat:38.4199,
    lng:-117.1219 }
  },
  {
    title:"New York",
    position:{
    lat:42.1497,
    lng:-74.9384 }
  },
  {
    title:"Ohio",
    position:{
    lat:40.3736,
    lng:-82.7755 }
    }
  ,
  {
    title:"Oklahoma",
    position:{
    lat:35.5376,
    lng:-96.9247 }
    }
,
  {
    title:"Oregon",
    position:{
    lat:44.5672,
    lng:-122.1269 }
    }
,
  {
    title:"Pennsylvania",
    position:{
    lat:40.5773,
    lng:-77.2640 }
    }
,
  {
    title:"Rhode Island",
    position:{
    lat:41.6772,
    lng:-71.5101 }
    }
,
  {
    title:"South Carolina",
    position:{
    lat:33.8191,
    lng:-80.9066 }
    }
 ,
  {
    title:"South Dakota",
    position:{
    lat:44.2853,
    lng:-99.4632 }
    }
,
  {
    title:"Tennessee",
    position:{
    lat:35.7449,
    lng:-86.7489 }
    }
 ,
  {
    title:"Texas",
    position:{
    lat:31.1060,
    lng:-97.6475 }
    }
  ,
  {
    title:"Utah",
    position:{
    lat:40.1135,
    lng:-111.8535 }
    }
,
  {
    title:"Virginia",
    position:{
    lat:37.7680,
    lng:-78.2057 }
    }
,
  {
    title:"Vermont",
    position:{
    lat:44.0407,
    lng:-72.7093 }
    }
 ,
  {
    title:"Washington",
    position:{
    lat:47.3917,
    lng:-121.5708 }
    }
 ,
  {
    title:"Wisconsin",
    position:{
    lat:44.2563,
    lng:-89.6385 }
    }
,

  {
    title:"West Virginia",
    position:{
    lat:38.4680,
    lng:-80.9696 }
    }
 ,
  {
    title:"Wyoming",
    positon: {
    lat:42.7475,
    lng:-107.2085
    },
    }
  ]
// marker data source

// console.log(placesJson);

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

