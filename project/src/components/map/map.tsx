import { Offer } from '../../types/offer';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type MapProps = {
  offers: Offer[];
  selectedOfferId: number | undefined;
}
const defaultCustomIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({offers, selectedOfferId}: MapProps) {
  const offer = offers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, offer);

  useEffect(() => {
    if (map) {
      offers.forEach(
        (it) => L.marker(
          [it.location.latitude, it.location.longitude],
          {icon: (it.id === selectedOfferId)
            ? currentCustomIcon
            : defaultCustomIcon})
          .addTo(map));
    }
  }, [map, offers, selectedOfferId]);


  return <div style={{height: '660px'}} ref={mapRef}></div>;
}

export default Map;
