import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { Icon } from 'leaflet';
import 'leaflet-rotatedmarker';
import { useAnimationFrame, useMotionValue, useSpring } from 'motion/react';
import { PropsWithChildren, useEffect, useRef } from 'react';
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
  player: MessageDTO;
  isOvered?: boolean;
  isDebug?: boolean;
}>;

export const PlayerMarker = ({
  player,
  children,
  isOvered,
  isDebug,
}: PlayerMarkerProps) => {
  const markerRef = useRef<L.Marker>(null);

  const latMv = useMotionValue(player.lat);
  const lngMv = useMotionValue(player.lng);

  const latSpring = useSpring(latMv, { damping: 20, stiffness: 100 });
  const lngSpring = useSpring(lngMv, { damping: 20, stiffness: 100 });

  useEffect(() => {
    latMv.set(player.lat);
    lngMv.set(player.lng);
  }, [player.lat, player.lng]);

  useAnimationFrame(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setLatLng([latSpring.get(), lngSpring.get()]);
    }
  });

  return (
    <Marker
      ref={markerRef}
      position={[player.lat, player.lng]}
      rotationAngle={player.yaw360}
      icon={isDebug ? iconDebug : isOvered ? iconOver : icon}>
      {children}
    </Marker>
  );
};
