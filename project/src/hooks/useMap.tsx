import { useState, useEffect, useRef, MutableRefObject } from 'react';
import L from 'leaflet';
import { Offer } from './../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  offer: Offer
): L.Map | null
{
  const [customMap, setCustomMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {

      const instance = L.map(mapRef.current, {
        center: [offer.city.location.latitude, offer.city.location.longitude],
        zoom: offer.city.location.zoom,
      });

      L
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(instance);

      setCustomMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, customMap, offer]);

  return customMap;
}

export default useMap;
