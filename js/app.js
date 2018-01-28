var filterText = ko.observable("");
var map, inforWindow;

var placesData = [

    {
        positon: {
            lat: 25.025338,
            lng: 121.579771
        },
        title: '象山自然步道'
    },

    {
        position: {
            lat: 24.220837,
            lng: 121.693100
        },
        title: '花蓮清水斷崖'
    },

    {
        position: {
            lat: 24.721554,
            lng: 120.901959
        },
        title: '佛光山'
    },

    {
        position: {
            lat: 22.610289,
            lng: 120.301898
        },
        title: '高雄市立圖書館總館'
    },

    {
        position: {
            lat: 25.020343,
            lng: 120.301898
        },
        title: '國立臺灣大學'
    }
];

var Place = function(data) {
    var self = this;
    this.title = data.title;
    this.position = data.position;


    this.visible = ko.computed(function() {
        var re = filterText().toLowerCase();
        var placeName = self.title.toLowerCase();
        return (placeName.indexOf(re) != -1)
    });

    this.marker = new google.maps.Marker({
        position: self.position,
        title: self.title,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(self.marker, "click", function() {

        infoWindow.setContent(self.title);
        infoWindow.open(map, self.marker)


        if (self.marker.getAnimation() != null) {
            self.marker.setAnimation(null);
        } else {
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.marker.setAnimation(null);
            }, 2000);
        }
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "e0b93df3888e46909bf05877841c3512"
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            infoWindow.setContent(result.response.docs[0].snippet);
        }).fail(function(err) {
            throw err;
        });


    });

}


var viewModel = function() {
     this.isShowSidebar = ko.observable(true);
 this.toggleSidebar = function(){
  var x = document.getElementById("drawer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }   
 }
    var self = this;
    this.placesList = [];

    placesData.forEach(function(place) {
        self.placesList.push(new Place(place))
    });

    this.placesList.forEach(function(place) {
        place.marker.setMap(map, place.position);
    });


    this.filteredList = ko.computed(function() {
        var result = [];
        self.placesList.forEach(function(place) {
            if (place.visible()) {
                result.push(place)
                place.marker.setMap(map, place.position);
            } else {
                place.marker.setMap(null);
            }
        });
        return result

    });
    this.listClick = function(place) {
        google.maps.event.trigger(place.marker, "click");
    }
}

function start() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: placesData[2].position,
        zoom: 8
    });
    infoWindow = new google.maps.InfoWindow();
    ko.applyBindings(new viewModel());
}

function googleError() {
    alert("google map wrong!")
};