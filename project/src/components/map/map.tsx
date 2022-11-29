import { Offer } from '../../types/offer';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppSelector } from '../../hooks';
import { getSelectedOffer } from '../../store/app-process/app-process-selectors';

type MapProps = {
  offers: Offer[];
  unchangeableOfferId?: number;
  height: number;
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

function Map({offers, unchangeableOfferId, height}: MapProps) {
  const selectedOfferId = useAppSelector(getSelectedOffer);
  const markedOfferId = unchangeableOfferId ?? selectedOfferId;

  const [offer] = offers;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offer);

  useEffect(() => {
    if (map) {
      offers.forEach(
        (it) => L.marker(
          [it.location.latitude, it.location.longitude],
          {icon: (it.id === markedOfferId)
            ? currentCustomIcon
            : defaultCustomIcon})
          .addTo(map));
    }
  }, [map, offers, markedOfferId]);


  return <div style={{height: `${height}px`}} ref={mapRef}></div>;
}

export default Map;
