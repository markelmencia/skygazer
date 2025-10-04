import * as api from "./api.js"
import * as models from "./models.js"

async function set_aurora_markers() {
    let locations_array = await api.fetch_auroras();
    locations_array.forEach(function(location) {
        var marker = L.marker([location.lat, location.long], {icon: models.green_icon}).addTo(map);

            marker.bindPopup(`
                <div id="popup-aurora">
                <img src ="resources/img/aurora.webp" alt="Aurora Image" id="aurora-image">
                <div id="auroraDescripcion">
                <p>An aurora is a natural light display in Earth's sky. These lights emerge from harsh differences in the speed of solar wind when it makes contact with the Earth's magnetosphere, rendering beautiful light shows in the northern night sky. 
                <p><b>· ${location.human_readable_name}</b> </p>
                <p>· KP: ${location.kp}</p>
                <p>· LAT: ${location.lat} </p>
                <p>· LON: ${location.long} </p>
                </div>
                </div>
                `);
        });
}

async function genListAstronauts() {
    try {
        const res = await fetch('https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json');
        const data = await res.json();

        // Array con todos los astronautas
        const astronauts = data.people;

        // Crear la lista HTML
        let listHTML = `<ul>`;
        for (let i = 0; i < astronauts.length; i++) {
            const a = astronauts[i];
            listHTML += `<li><b>${a.name}</b> (${a.agency}) - ${a.position}</li>`;
        }
        listHTML += '</ul>';

        return listHTML;

    } catch (err) {
        console.error(err);
        return "<p>Error al cargar los astronautas.</p>";
    }
}

async function set_iss_marker() {
    let stringHtml = await genListAstronauts();
    let stringImage = "<div align= 'center'><img src='resources/img/issImage.jpg'/></div>";
    let position = await api.fetch_iss();
        var marker = L.marker([parseFloat(position.latitude), parseFloat(position.longitude)], {icon: models.iss_icon}).addTo(map);
    marker.bindPopup(`
    <div id="popup-iss">
        <b>ISS</b><br>
        International Space Station
        <p>${stringHtml}</p>
        ${stringImage}
    </div>
    `);
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

let observatories = []; // variable global para guardar los datos


async function fetch_observatories() {
    try {
        const response = await fetch('resources/data/astronomical.json'); // tu ruta
        observatories = await response.json();
        console.log("Observatorios cargados:", observatories.length);
    } catch (err) {
        console.error("Error cargando observatorios:", err);
    }
}

async function init() {
    await fetch_observatories(); 

    // Crear un grupo de clusters
    const markers = L.markerClusterGroup();
    observatories.forEach(obs => {
        const lat = obs.geo_point_2d.lat;
        const lon = obs.geo_point_2d.lon;

        const marker = L.marker([lat, lon], { icon: models.observatory_icon })
            .bindPopup(`
                <div id="popup-observatory">
                <p id="tituloOb"><b>${obs.name}</b></p><br>
                <img src ="resources/img/observatory.jpg" alt="Observatory Image" id="observatory-image">
                <p>An observatory is a location used for observing terrestrial, marine, or celestial events. A place where humans can see what the naked eyes can't.</p>
                · Tipo: ${obs.type}<br>
                · Altitud: ${obs.altitude ?? 'Desconocida'} m<br>
                · Instrumentos: ${obs.instruments ?? 'N/A'}<br>
                </div>
              `);
        markers.addLayer(marker);
    });
    map.addLayer(markers);
}

init();
set_aurora_markers();
set_iss_marker();
