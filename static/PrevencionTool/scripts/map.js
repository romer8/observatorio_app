// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([37.75, -122.23], 10);

L.esri.basemapLayer('Topographic').addTo(map);
