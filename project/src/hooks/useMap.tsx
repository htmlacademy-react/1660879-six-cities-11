import { useState, useEffect, useRef, MutableRefObject } from 'react';
import L from 'leaflet';
import { City } from './../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
) {
  const [customMap, setCustomMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {

    if (mapRef.current !== null && !isRenderedRef.current) {

      const instance = L.map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom,
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
  }, [mapRef, customMap, city]);

  return customMap;
}

export default useMap;
