import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom"
import './location.css'

function Location() {
  const [status, setStatus] = useState("Locating...");
  const [map, setMap] = useState(null);
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  const geoFindMe = () => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLatLng({ lat: latitude, lng: longitude });
      setStatus("");
    }
    function error() {
      setStatus("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    geoFindMe();
  }, []);

  useEffect(() => {
    if (latLng.lat && latLng.lng) {
      const mapInstance = L.map('map').setView([latLng.lat, latLng.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);
      L.marker([latLng.lat, latLng.lng]).addTo(mapInstance);
      setMap(mapInstance);
    }
  }, [latLng]);

  return (
    <div>
      <div className='background-location'>
      <Link to="/"><button>Return Home</button></Link>
      <div id="map" style={{ height: '85vh', width: '95%' }}></div>
      <p id="status">{status}</p>
      </div>
    </div>
  );
}

export default Location;

/*

The location is not 100% accurate its off by 100 to 200 ft

*/ 