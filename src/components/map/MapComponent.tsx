import { useState } from 'react';

import PlayerList, { followPlayer } from '@/components/PlayerList/PlayerList';
import { useGlobalStore } from '@/lib/store/globalStore';
import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MapControl } from './MapControl';

export const MapComponent = () => {
  const playerList = useGlobalStore(s => s.playerList);
  const viewPort = useGlobalStore(s => s.viewPort);
  const setViewPort = useGlobalStore(s => s.setViewPort);
  const moveCenter = useGlobalStore(s => s.moveCenter);
  const moveTo = useGlobalStore(s => s.moveTo);

  const tilesServerUrl = import.meta.env.VITE_TILE_SERVER;

  const [followPlayer, setFollowPlayer] = useState<followPlayer>();

  const maxBounds: LatLngBoundsExpression = [
    [-69, 34.75],
    [-187, 221.2],
  ];

  // const moveMapToCenter = useCallback(
  // (lat: number, lng: number) => {
  //   setMoveCenter([lat, lng] as LatLngExpression);
  //   setViewPort({ ...viewPort, lat, lng });
  // },
  // [viewPort],
  // );
  // useEffect(() => {
  //   if (!followPlayer || !followPlayer.id || !followPlayer.enable) return;

  //   const followedPlayer = playerList.find(p => p.id === followPlayer.id);
  //   if (!followedPlayer) return;
  //   else moveMapToCenter(followedPlayer.lat, followedPlayer.lng);
  // }, [playerList, followPlayer, moveMapToCenter]);

  return (
    <>
      <PlayerList
        players={playerList}
        moveCenter={(lat, lng) => void 0}
        // moveCenter={(lat, lng) => moveMapToCenter(lat, lng)}
        followPlayer={(followPlayer: followPlayer) =>
          setFollowPlayer(followPlayer)
        }
      />
      <MapContainer
        className="rounded-2xl"
        center={[viewPort.lat, viewPort.lng]}
        zoom={viewPort.zoom}
        scrollWheelZoom={true}
        maxZoom={7}
        minZoom={3}
        maxBounds={maxBounds}
        crs={CRS.Simple}>
        <TileLayer url={`${tilesServerUrl}/{z}/{x}/{y}.png`} />
        {playerList.map((player: MessageDTO) => (
          <Marker
            key={player.id}
            position={[player.lat, player.lng] as LatLngExpression}>
            <Popup>
              Name:{' '}
              {!player.playerName || player.playerName.trim().length === 0
                ? 'Unknown'
                : player.playerName}
            </Popup>
          </Marker>
        ))}
        <MapControl />
      </MapContainer>
    </>
  );
};
