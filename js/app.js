var filterText = ko.observable("");
var map,infoWindow;
var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newst&api-key=e0b93df3888e46909bf05877841c3512&q=";


var  placesData = [

  {positon: {lat: 40.705665,lng: -74.017231},
    title: 'The Ritz-Carlton New York'
  },

  {
  position: {lat: 40.758870,lng: -73.986231},
  title: 'New York Marriott Marquis'
},

{
  position: {lat: 40.752222,lng:  -73.976310},
      title: 'W New York '
},  

  { position: {lat: 40.73649,lng: -73.988175},
    title: 'W New York '
  }, 

  { position: {lat:40.756599,lng:-73.988859},
    title: 'Hilton Times Square'
  }
];

var Place = function(data) {
  var self = this;
  this.title = data.title;
  this.position = data.position;

  this.visible = ko.computed(function(){
    var re = filterText().toLowerCase();
    var placeName = self.title.toLowerCase();
    return (placeName.indexOf(re) != -1)
  });

this.marker = new google.maps.Maker({
position: self.position,
title:self.title,
animation: google.maps.Animation.DROP
});

google.maps.event.addListener(self.marker,"click",function(){

  infoWindow.setContent(self.title);
  infoWindow.open(map,self.marker)

if(self.marker.getAnimation() != null) {
  self.marker.setAnimation(null);
}
else{
  self.marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){
    self.marker.setAnimation(null);
  },2000);
}

$.ajax({
  url: apiUrl + self.title,
  dataType:"json",
timeout:5000

}).done(function(data){
infoWindow.setContent(data.response.docs[0].snippet);
inforWindow.open(map,self.marker,)
}).fail(function(){
  alert("纽约时报错了");
});

});

var viewModel = function() {
  var self = this;
  this.placesList = [];

  placesData.forEach(function(place) {
    self.placesList.push(new Place(place))
  });

this.placesList.forEach(function(place){
  place.marker.setMap(map,place.position);
});

this.filteredList = ko.computed(function(){
  var result = [];
  self.placesList.forEach(function(place){
    if(place.visible()){
      result.push(place);
      place.marker.setMap(map,place.position);
    }
    else{
place.marker.setMap(null);
    }
  });
  return result
});

this.listClick = function(place){
  google.maps.event.trigger(place.marker,"click");
}
}
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
  ko.applyBindings(new viewModel());

};

