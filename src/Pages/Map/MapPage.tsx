import { useEffect, useState } from 'react';
import './MapPage.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import MapListener from './MapListener';
import PlayerList from '../../Component/PlayerList/PlayerList';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import MapControl from './MapControl';
import useMapSocket from '../../Hook/useMapSocket';

const MapPage = () => {
	// const tilesServerUrl = 'http://antoinecapitain.fr:57063';
	const tilesServerUrl = 'http://localhost:8000';
	// const [playerList, setPlayerList] = useState<MessageDTO[]>([]);
	const playerList = useMapSocket('https://localhost:7078/mapUpdatesHub');

	const [viewPort, setViewPort] = useState({
		lat: -128,
		lng: 128,
		zoom: 5,
	});
	const [moveCenter, setMoveCenter] = useState<LatLngExpression>(null);

	const maxBounds: LatLngBoundsExpression = [
		[-69, 34.75],
		[-187, 221.2],
	];

	const moveMapToCenter = (lat: number, lng: number) => {
		setMoveCenter([lat, lng] as LatLngExpression);
		setViewPort({ ...viewPort, lat: lat, lng: lng });
	};

	return (
		<>
			<PlayerList
				players={playerList}
				moveCenter={(lat, lng) => moveMapToCenter(lat, lng)}
			/>
			<MapContainer
				center={[viewPort.lat, viewPort.lng]}
				zoom={viewPort.zoom}
				scrollWheelZoom={true}
				maxZoom={8}
				minZoom={4}
				maxBounds={maxBounds}
				crs={CRS.Simple}>
				<MapListener
					updateMove={pos =>
						setViewPort({ ...viewPort, lat: pos.lat, lng: pos.lng })
					}
				/>
				<TileLayer url={`${tilesServerUrl}/{z}/{x}/{y}.png`} />
				{playerList.map((player: MessageDTO) => (
					<Marker
						key={player.ip}
						position={[player.lat, player.lng] as LatLngExpression}>
						<Popup>
							Name:{' '}
							{!player.playerName || player.playerName.trim().length === 0
								? 'Unknown'
								: player.playerName}
						</Popup>
					</Marker>
				))}
				<MapControl pos={moveCenter} />
			</MapContainer>
		</>
	);
};

export default MapPage;
