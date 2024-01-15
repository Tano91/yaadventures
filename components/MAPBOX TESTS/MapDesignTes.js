import { useState, useLayoutEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

export default function MapForm() {
 const [pageIsMounted, setPageIsMounted] = useState(false);
 const [pins, setPins] = useState([]);
 const mbxClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY });
 let currentMarker;
 const mapRef = useRef(); // Use useRef to create a mutable reference object

 useLayoutEffect(() => {
 setPageIsMounted(true);

 // Clear the contents of the map container
 document.getElementById('my-map').innerHTML = '';

 mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

 mapRef.current = new mapboxgl.Map({ // Assign the map object to mapRef.current
 container: 'my-map',
 style: 'mapbox://styles/mapbox/streets-v11',
 center: [-77.2975, 18.1096], // Set the starting location here
 zoom: 7, // Set the initial zoom level here
 });

 }, []);

 async function searchPlace(placeName) {
 try {
 const response = await mbxClient.forwardGeocode({
 query: placeName,
 autocomplete: false,
 limit: 1,
 }).send();

 if (response && response.body && response.body.features && response.body.features.length > 0) {
 const feature = response.body.features[0];
 const coordinates = feature.geometry.coordinates;

 // Always remove the current marker if it exists
 if (currentMarker) {
 currentMarker.remove();
 }

 // Create a new marker
 currentMarker = new mapboxgl.Marker()
 .setLngLat(coordinates)
 .addTo(mapRef.current);

 // Update the pins array
 setPins((prevPins) => {
 prevPins.forEach((pin) => pin.remove());
 return [currentMarker];
 });
 }
 } catch (error) {
 console.error('Error searching place:', error);
 }
 }

 return (
 <div>
 <div id="my-map" style={{ height: 500, width: 500 }} />
 <form onSubmit={(event) => {
 event.preventDefault();
 searchPlace(event.target.elements.placeName.value);
 }}>
 <input type="text" name="placeName" placeholder="Enter a place name" />
 <button type="submit">Search</button>
 </form>
 </div>
 );
}
