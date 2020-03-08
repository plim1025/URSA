let southWest = L.latLng(43, -124);
let northEast = L.latLng(43.4, -123.7);

var mymap = L.map('map',
        {
            maxBounds: L.latLngBounds(southWest, northEast)
        }
    )
    .setView([43.2, -124], 11);

mymap.options.minZoom = 7;

var wmsLayer = L.tileLayer.wms('https://imagery.oregonexplorer.info:443/arcgis/services/OSIP_2018/OSIP_2018_WM/ImageServer/WMSServer?', {
    layers: '0',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

const onEachFeature = (feature, layer) => {
  layer.on('click', function(e) {
          console.log(e);
          console.log(feature)
          
          let popup = document.getElementById('popup');
          popup.innerHTML = feature.id;
          popup.style.flex = '3';

          let parent = document.getElementById('body');
          parent.removeChild(parent.children[2]);
          parent.insertBefore(popup, parent.children[2]);
          const lat = e.latlng.lat;
          const lng = e.latlng.lng - 0.02;
          mymap.setView([lat, lng], 13);
      }
  )
}

L.geoJSON(geojsonFeature, {
  style: function(feature) {
      return {color: "#FFF"};
  },
  onEachFeature: onEachFeature
}).addTo(mymap);