import { useState } from 'react';
import './MapPage.scss';

import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import MapListener from './MapListener';

type udpData = {
	pos: LatLngExpression;
	id: string;
	name: string;
};

const MapPage = () => {
	const [viewPort, setViewPort] = useState({
		lat: -128,
		lng: 128,
		zoom: 5,
	});
	const maxBounds: LatLngBoundsExpression = [
		[0, 0],
    [-187, 221],
		// [-256, 256],
	];

	const [playerList, setPlayerList] = useState<udpData[]>([
		{
			pos: [-70.9, 219.41],
			id: 'toto',
			name: 'Dercraker',
		},
	]);


  const handleFolowPlayer = (e) => {
    const { lat, lng } = e.target.getLatLng();
    console.log("🚀 ~ file: MapPage.tsx:36 ~ handleFolowPlayer ~ lat, lng:", lat, lng)
    setViewPort({ ...viewPort, lat: lat, lng: lng })
    console.log("aa");

  }

	return (
		<MapContainer
			center={[viewPort.lat, viewPort.lng]}
			zoom={viewPort.zoom}
			scrollWheelZoom={true}
			maxZoom={8}
			minZoom={3}
			maxBounds={maxBounds}
			crs={CRS.Simple}>
			<MapListener
				updateMove={pos =>
					setViewPort({ ...viewPort, lat: pos.lat, lng: pos.lng })
				}
			/>
			<TileLayer url={'http://localhost:8000/{z}/{x}/{y}.png'} />
			{playerList.map((player: udpData) => (
        <Marker key={player.id} position={player.pos}
        eventHandlers={{
          click: (e) => handleFolowPlayer(e),
        }}>
						<Popup>
							id: {player.id} Name: {player.name}
						</Popup>
					</Marker>
				))}
		</MapContainer>
	);
};

export default MapPage;
