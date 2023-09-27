import { useEffect, useState } from 'react';
import './MapPage.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import MapListener from './MapListener';
import PlayerList from '../../Component/PlayerList/PlayerList';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import MapControl from './MapControl';
import useMapSocket from '../../Hook/useMapSocket';

const getPlayerList = (): MessageDTO[] => [
	{
		ip: '109.206.143.49',
		playerName: '',
		isPaused: false,
		isDisconnecting: false,
		posX: -100,
		posXDisplay: '-128.00',
		posY: 140,
		posYDisplay: '+128.00',
		posZ: 50,
		posZDisplay: '+50.00',
		lat: -100,
		lng: 140,
		speed: 0,
		speedKmh: 60,
		speedKmhDisplay: '60 Km/h',
		speedMph: 0,
		speedMphDisplay: '',
		power: 0,
		powerKw: 0,
		powerKwDisplay: '',
		powerCh: 0,
		powerChDisplay: '',
		torqueNm: 0,
		torqueNmDisplay: '',
		torqueFtLbs: 0,
		torqueFtLbsDisplay: '',
		gear: 0,
		carClass: '',
		carIndex: 0,
		carIndexDisplay: '',
		carDrivetrain: '',
		cylindersCount: 0,
		model: 'RS',
		maker: 'Ford',
		year: -1,
		group: 'B',
		carOrdinal: 2525,
		weight: 1500,
	},
	{
		ip: '109.206.143.49',
		playerName: '',
		isPaused: false,
		isDisconnecting: false,
		posX: -100,
		posXDisplay: '-128.00',
		posY: 140,
		posYDisplay: '+128.00',
		posZ: 50,
		posZDisplay: '+50.00',
		lat: -100,
		lng: 140,
		speed: 0,
		speedKmh: 60,
		speedKmhDisplay: '60 Km/h',
		speedMph: 0,
		speedMphDisplay: '',
		power: 0,
		powerKw: 0,
		powerKwDisplay: '',
		powerCh: 0,
		powerChDisplay: '',
		torqueNm: 0,
		torqueNmDisplay: '',
		torqueFtLbs: 0,
		torqueFtLbsDisplay: '',
		gear: 0,
		carClass: '',
		carIndex: 0,
		carIndexDisplay: '',
		carDrivetrain: '',
		cylindersCount: 0,
		model: 'RS',
		maker: 'Ford',
		year: -1,
		group: 'B',
		carOrdinal: 2525,
		weight: 1500,
	},
];

const MapPage = () => {
	const tilesServerUrl = import.meta.env.VITE_TILE_SERVER;
  
	const playerList = getPlayerList();
	// const playerList = useMapSocket(import.meta.env.VITE_MAP_SCOKET_URL);

	const [viewPort, setViewPort] = useState({
		lat: -128,
		lng: 128,
		zoom: 5,
	});
	const [moveCenter, setMoveCenter] = useState<LatLngExpression | null>(null);

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
				minZoom={3}
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
