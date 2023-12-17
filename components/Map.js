import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getCenter } from 'geolib';

function Map({allListings}) {

    const [selectedLocation, setSelectedLocation] = useState({})

    // transform/map results object to {latitide, longitude } object

    const coordinates = allListings.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)
    //are listing coordinates accurate?

    return <ReactMapGL
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 7.5
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/tano91/clq1hy4yw013h01p4csda7a54"
      mapboxAccessToken={process.env.mapbox_key}
    >
        {allListings.map(result => (
            <div key={result.index}>
                <Marker
                    longitude = {result.long}
                    latitude = {result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p 
                    role='img'
                    onClick={() => setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce'
                    aria-label='push-pin'
                    >📌</p>
                </Marker> 
                {/* Pupup shows if we click on marker */}

                {selectedLocation.long === result.long ? (
                    <Popup 
                    onClose={()=> setSelectedLocation({})}
                    closeOnClick={true}
                    longitude={result.long}
                    latitude={result.lat}
                    >
                        {result.title}
                    </Popup>
                ):(
                    false
                )}
            </div>
        ))}

    </ReactMapGL>;
  }
  export default Map

// Jamaica coords: longitude: 
// -77.34052160484082,
// latitude: 18.13175421276142,
// zoom: 7.5
