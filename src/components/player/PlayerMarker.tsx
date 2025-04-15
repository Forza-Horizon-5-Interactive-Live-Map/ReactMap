import { Icon, LatLngExpression } from 'leaflet';
import { PropsWithChildren } from 'react';
import { Marker } from 'react-leaflet';

const icon = new Icon({
  iconUrl: '/dot.png',
  className: 'text-red-500',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -0],
});

type PlayerMarkerProps = PropsWithChildren<{
  position: LatLngExpression;
}>;

export const PlayerMarker = ({ position, children }: PlayerMarkerProps) => {
  return (
    <Marker icon={icon} position={position}>
      {children}
    </Marker>
  );
};
