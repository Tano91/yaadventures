import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
    return <ReactMapGL
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: -77.34052160484082,
        latitude: 18.13175421276142,
        zoom: 7.5
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/tano91/clq1hy4yw013h01p4csda7a54"
      mapboxAccessToken={process.env.mapbox_key}
    />;
  }
  export default Map