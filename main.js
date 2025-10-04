import './style.css';
import * as Cesium from 'cesium';
window.Cesium = Cesium;

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

import OLCesium from 'ol-cesium';

const map = new Map({
target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    view: new View({
        center: fromLonLat([0, 0]),
        zoom: 4
    })
});

const ol3d = new OLCesium({map: map});
ol3d.setEnabled(true);