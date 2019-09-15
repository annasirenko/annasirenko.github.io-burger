// Карта
function initMap() {

  var opt = {
    center = {lat: 59.896453, lng:30.424174 },
    zoom:10,
  }

  var map = new google.maps.Map(
    document.getElementById('map'), opt);
}
