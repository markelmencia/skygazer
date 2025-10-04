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

var greenIcon = L.icon({
    iconUrl: 'data/sun.webp',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    attribution: '&copy; CARTO'
}).addTo(map);
