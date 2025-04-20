import { Icon, LatLngExpression } from 'leaflet';
import { PropsWithChildren } from 'react';
import { Marker } from 'react-leaflet';

const icon = new Icon({
  iconUrl: '/Icon_Eliminator_Cursor_NotInRace.png',
  className: 'text-red-500',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -0],
});

const iconOver = new Icon({
  iconUrl: '/Icon_Eliminator_Cursor_InRace_Deuteranopia.png',
  className: 'text-blue-500',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -0],
});

const iconDebug = new Icon({
  iconUrl: '/dot.png',
  className: 'text-green-500',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -0],
});

type PlayerMarkerProps = PropsWithChildren<{
  position: LatLngExpression;
  isOvered?: boolean;
  isDebug?: boolean;
}>;

export const PlayerMarker = ({
  position,
  children,
  isOvered,
  isDebug,
}: PlayerMarkerProps) => {
  return (
    <Marker
      icon={isDebug ? iconDebug : isOvered ? iconOver : icon}
      position={position}>
      {children}
    </Marker>
  );
};
