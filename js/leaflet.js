import * as api from "./api.js"
import * as models from "./models.js"

async function set_aurora_markers() {
    let locations_array = await api.fetch_auroras();
    locations_array.forEach(function(location) {
        var marker = L.marker([location.lat, location.long], {icon: models.green_icon}).addTo(map);
        marker.bindPopup("<b>" + location.human_readable_name + "</b><br> KP: " + location.kp);
    })
}

async function set_iss_marker() {
    let position = await api.fetch_iss();
    var marker = L.marker([parseFloat(position.latitude), parseFloat(position.longitude)], {icon: models.green_icon}).addTo(map);
    marker.bindPopup("<b>ISS</b><br>" + "International Space Station");
}

var bounds = [
    [40.3, -3.8],
    [40.5, -3.6]
];

var map = L.map('map', {
    center: [40.4168, -3.7038],
    zoom: 3,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    minZoom: 3,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    attribution: '&copy; CARTO'
}).addTo(map);

set_aurora_markers()
set_iss_marker()