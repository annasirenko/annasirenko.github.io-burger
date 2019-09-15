// Карта

ymaps.ready(init);

var placemarks = [ 
  {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
      balloonContent: [
          '<div class="map__balloon">',
          '<img class="map__burger-img" src="./img/drops.png" alt="Бургер"/>',
          'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
          '</div>'
      ]
  },
  {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
      balloonContent: [
          '<div class="map__balloon">',
          '<img class="map__burger-img" src="./img/drops.png" alt="Бургер/>',
          'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
          '</div>'
      ]
  },
  {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
      balloonContent: [
          '<div class="map__balloon">',
          '<img class="map__burger-img" src="./img/drops.png" alt="Бургер"/>',
          'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
          '</div>'
      ]
  }
],
  geoObjects= [];

function init() {
  var map = new ymaps.Map('map', {
      center: [59.94, 30.32],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
  });

  for (var i = 0; i < placemarks.length; i++) {
          geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
          {
              hintContent: placemarks[i].hintContent,
              balloonContent: placemarks[i].balloonContent.join('')
          },
          {
              iconLayout: 'default#image',
              iconImageHref: './img/map-marker.png',
              iconImageSize: [46, 57],
              iconImageOffset: [-23, -57],
              
          });
  }

  var clusterer = new ymaps.Clusterer({
      clusterIcons: [
          {
              href: './img/drops.png',
              size: [100, 100],
              offset: [-50, -50]
          }
      ],
      clusterIconContentLayout: null
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);
}
// function initMap() {

//   var opt = {
//     center = {lat: 59.896453, lng:30.424174 },
//     zoom:10,
//   }

//   var map = new google.maps.Map(
//     document.getElementById('map'), opt);
// }
