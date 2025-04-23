import { useGlobalStore } from '@/lib/store/globalStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';
import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { CRS, LatLngBoundsExpression } from 'leaflet';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import { PlayerMarker } from '../player/PlayerMarker';
import { MapControl } from './MapControl';

export const MapComponent = () => {
  const playerList = useGlobalStore(s => s.playerList);
  const overedId = useSidebarStore(s => s.overedId);

  const maxBounds: LatLngBoundsExpression = [
    [-71, 36.7],
    [-184.7, 219],
  ];

  return (
    <>
      <MapContainer
        className="rounded-2xl"
        center={[-128, 128]}
        zoom={3}
        scrollWheelZoom={true}
        maxZoom={7}
        minZoom={3}
        maxBounds={maxBounds}
        crs={CRS.Simple}>
        <TileLayer
          url={`${import.meta.env.VITE_TILE_SERVER}/{z}/{x}/{y}.png`}
        />
        {playerList.map((player: MessageDTO) => (
          <PlayerMarker
            key={player.id}
            player={player}
            isOvered={overedId === player.id}
            isDebug={false}>
            <Popup>
              Name:{' '}
              {!player.playerName || player.playerName.trim().length === 0
                ? 'Unknown'
                : player.playerName}
            </Popup>
          </PlayerMarker>
        ))}
        <MapControl />
      </MapContainer>
    </>
  );
};
