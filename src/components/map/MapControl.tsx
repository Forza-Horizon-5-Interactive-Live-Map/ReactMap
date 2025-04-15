import { useGlobalStore } from '@/lib/store/globalStore';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const MapControl = () => {
  const moveTo = useGlobalStore(s => s.moveTo);

  const map = useMap();
  useEffect(() => {
    if (!moveTo) return;
    map.setView(moveTo);
  }, [moveTo, map]);

  return null;
};
