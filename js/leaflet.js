import * as api from "./api.js"
import * as models from "./models.js"

// Grupos de capas para controlar la visibilidad
let auroraGroup = L.layerGroup();
let issGroup = L.layerGroup();
let observatoryGroup = L.markerClusterGroup();
let meteorGroup = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
        return L.divIcon({
            html: `<div><span>${cluster.getChildCount()}</span></div>`,
            className: 'meteor-cluster', 
            iconSize: L.point(40, 40)
        });
    }
});

async function set_aurora_markers() {
    let locations_array = await api.fetch_auroras();
    locations_array.forEach(function(location) {
        var marker = L.marker([location.lat, location.long], {icon: models.green_icon});
        auroraGroup.addLayer(marker);

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
        var marker = L.marker([parseFloat(position.latitude), parseFloat(position.longitude)], {icon: models.iss_icon});
        issGroup.addLayer(marker);
    marker.bindPopup("<b>ISS</b><br>" + "International Space Station" + "<p><br>The Internation Space Station (ISS for short) is a station in orbit made possible by international effort, in which astronauts from all around the world commute for research purposes. Here's a list of the current ISS members on board: <br>"+ stringHtml + "</p>" + stringImage);
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

    // Crear markers de observatorios
    observatories.forEach(obs => {
        const lat = obs.geo_point_2d.lat;
        const lon = obs.geo_point_2d.lon;

        const marker = L.marker([lat, lon], { icon: models.observatory_icon })
            .bindPopup(`
                <div id="popup-observatory">
                <p id="tituloOb"><b>${obs.name}</b></p><br>
                <img src ="resources/img/observatory.jpg" alt="Observatory Image" id="observatory-image">
                <p>An observatory is a location used for observing terrestrial, marine, or celestial events. A place where humans can see what the naked eyes can't.</p>
                · Type: ${obs.type}<br>
                · Altitude: ${obs.altitude ?? 'Desconocida'} m<br>
                · Instruments: ${obs.instruments ?? 'N/A'}<br>
                </div>
              `);
        observatoryGroup.addLayer(marker);
    });
}

let meteors = []
async function fetch_meteors() {
    try {
        const response = await fetch('resources/data/meteors.json'); // tu ruta
        meteors = await response.json();
        console.log(meteors)
    } catch (err) {
        console.error("Error cargando observatorios:", err);
    }
}

async function init_meteors() {
    await fetch_meteors(); 

    // Crear markers de meteoros
    meteors.forEach(meteor => {
        const lat = meteor.lat;
        const lon = meteor.lon;

        const marker = L.marker([lat, lon], { icon: models.meteor_icon })
            .bindPopup(`
                <div id="popup-meteor">
                <p><b>${meteor.name}</b></p><br>
                <img src ="resources/img/meteor.jpg" alt="Meteor Image" id="meteor-image">
                <p>Place marked by storical meteorite landing record, when a meteoroid survives a trip through the atmosphere and hits the ground, it's called a meteorite.</p>
                · Mass: ${meteor.mass}gr<br>
                · Year: ${meteor.year ?? 'Desconocida'}<br>
                </div>
              `);
        meteorGroup.addLayer(marker);
    });
}

// Función para configurar los event listeners de los checkboxes
function setupCheckboxListeners() {
    // ISS checkbox
    const issCheckbox = document.getElementById('iss-checkbox');
    issCheckbox.addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(issGroup);
        } else {
            map.removeLayer(issGroup);
        }
    });
    
    // Aurora checkbox
    const auroraCheckbox = document.getElementById('aurora-checkbox');
    auroraCheckbox.addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(auroraGroup);
        } else {
            map.removeLayer(auroraGroup);
        }
    });
    
    // Observatory checkbox
    const observatoryCheckbox = document.getElementById('observatory-checkbox');
    observatoryCheckbox.addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(observatoryGroup);
        } else {
            map.removeLayer(observatoryGroup);
        }
    });
    
    // Meteor checkbox
    const meteorCheckbox = document.getElementById('meteor-checkbox');
    meteorCheckbox.addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(meteorGroup);
        } else {
            map.removeLayer(meteorGroup);
        }
    });
}

// Función para inicializar todo
async function initializeMap() {
    await init();
    await init_meteors();
    await set_aurora_markers();
    await set_iss_marker();
    
    // Agregar todos los grupos al mapa inicialmente (ya que los checkboxes están marcados por defecto)
    map.addLayer(issGroup);
    map.addLayer(auroraGroup);
    map.addLayer(observatoryGroup);
    map.addLayer(meteorGroup);
    
    // Configurar los event listeners
    setupCheckboxListeners();
}

// Llamar a la función de inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeMap);
