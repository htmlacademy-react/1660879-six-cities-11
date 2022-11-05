import { Offer } from '../../types/offer';
import { useRef } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
}

function Map({offers}: MapProps) {
  const cityLocation = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export default Map;
