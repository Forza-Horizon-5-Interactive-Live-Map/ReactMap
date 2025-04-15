import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type MapControlProps = {
  pos: LatLngExpression;
};

export const MapControl = ({ pos }: MapControlProps) => {
  const map = useMap();
  useEffect(() => {
    if (!pos) return;
    map.setView(pos);
  }, [pos, map]);

  return null;
};
