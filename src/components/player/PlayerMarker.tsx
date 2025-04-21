import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet-rotatedmarker';
import { PropsWithChildren } from 'react';
import { Marker } from 'react-leaflet';

const icon = new Icon({
  iconUrl: '/Icon_Eliminator_Cursor_NotInRace.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -0],
});

const iconOver = new Icon({
  iconUrl: '/Icon_Eliminator_Cursor_InRace_Deuteranopia.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -0],
});

const iconDebug = new Icon({
  iconUrl: '/dot.png',
  iconSize: [24, 24],
  iconAnchor: [8, 18],
  popupAnchor: [0, -0],
});

type PlayerMarkerProps = PropsWithChildren<{
  rotationAngle: number;
  position: LatLngExpression;
  isOvered?: boolean;
  isDebug?: boolean;
}>;

export const PlayerMarker = ({
  position,
  rotationAngle,
  children,
  isOvered,
  isDebug,
}: PlayerMarkerProps) => {
  return (
    <Marker
      icon={isDebug ? iconDebug : isOvered ? iconOver : icon}
      rotationAngle={rotationAngle}
      position={position}>
      {children}
    </Marker>
  );
};
