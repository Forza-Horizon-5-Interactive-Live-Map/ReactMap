import { useGlobalStore } from '@/lib/store/globalStore';
import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import { PlayerMarker } from '../player/PlayerMarker';
import { MapControl } from './MapControl';

export const MapComponent = () => {
  const playerList = useGlobalStore(s => s.playerList);

  const tilesServerUrl = import.meta.env.VITE_TILE_SERVER;

  const maxBounds: LatLngBoundsExpression = [
    [-49, 1],
    [-205, 253],
  ];

  return (
    <>
      <MapContainer
        className="rounded-2xl"
        center={[-0, 0]}
        zoom={3}
        scrollWheelZoom={true}
        maxZoom={7}
        minZoom={3}
        maxBounds={maxBounds}
        crs={CRS.Simple}>
        <TileLayer url={`${tilesServerUrl}/{z}/{x}/{y}.png`} />
        {playerList.map((player: MessageDTO) => (
          <PlayerMarker
            key={player.id}
            position={[player.lat, player.lng] as LatLngExpression}>
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
