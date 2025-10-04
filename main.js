var map = L.map('map', {
    center: [40.4168, -3.7038],
    zoom: 5,
    zoomControl: false,       
    attributionControl: false,
    dragging: true,           
    scrollWheelZoom: true,    
    doubleClickZoom: false,   
    boxZoom: false,           
    keyboard: false           
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    attribution: '&copy; CARTO'
}).addTo(map);

var lugares = [
    { nombre: "Museo del Prado", lat: 40.4138, lng: -3.6921, info: "Arte clásico y moderno" },
    { nombre: "Parque del Retiro", lat: 40.4153, lng: -3.6845, info: "Parque urbano con estanque" },
    { nombre: "Puerta del Sol", lat: 40.4169, lng: -3.7038, info: "Centro de Madrid" }
];

lugares.forEach(function(lugar) {
    var marker = L.marker([lugar.lat, lugar.lng]).addTo(map);
    marker.bindPopup("<b>" + lugar.nombre + "</b><br>" + lugar.info);
});