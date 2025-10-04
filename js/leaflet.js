import * as api from "./api.js"
import * as models from "./models.js"

async function set_aurora_markers() {
    let locations_array = await api.fetch_auroras();
    locations_array.forEach(function(location) {
        var marker = L.marker([location.lat, location.long], {icon: models.green_icon}).addTo(map);

            marker.bindPopup(`
                <div id="aurora-popup">
                <img src ="resources/img/aurora.webp" alt="Aurora Image" id="aurora-image">
                <div id="auroraDescripcion">
                <p>An aurora is a natural light display in Earth's sky, predominantly observed in high-latitude regions around the Arctic and Antarctic. </p>
                <p>Auroras are the result of disturbances in the Earth's magnetosphere caused by enhanced speeds of solar wind from coronal holes and coronal mass ejections. These disturbances alter the trajectories of charged particles in the magnetospheric plasma.
                <p><b>${location.human_readable_name}</b> </p>
                <p>KP: ${location.kp}</p>
                <p>LAT: ${location.lat} </p>
                <p>LON: ${location.long} </p>
                </div>
                </div>
                `);
        });
}

async function set_iss_marker() {
    let position = await api.fetch_iss();
        var marker = L.marker([parseFloat(position.latitude), parseFloat(position.longitude)], {icon: models.iss_icon}).addTo(map);
    marker.bindPopup("<b>ISS</b><br>" + "International Space Station");
}

async function set_eclipse_marker() {
    
}

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
    worldCopyJump: true,
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    attribution: '&copy; CARTO'
}).addTo(map);

set_aurora_markers()
set_iss_marker()
