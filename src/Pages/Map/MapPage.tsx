import { useEffect, useState } from 'react';
import './MapPage.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import MapListener from './MapListener';
import PlayerList, {
	folowPlayer as followPlayer,
} from '../../Component/PlayerList/PlayerList';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import MapControl from './MapControl';
import getPlayerList from './PlayerList';
import useMapSocket from '../../Hook/useMapSocket';

const MapPage = () => {
	const tilesServerUrl = import.meta.env.VITE_TILE_SERVER;
	const [followPlayer, setFollowPlayer] = useState<followPlayer>();
	const playerList = getPlayerList();
	// const playerList = useMapSocket(import.meta.env.VITE_MAP_SCOKET_URL);

	useEffect(() => {
		if (!followPlayer || !followPlayer.ip || !followPlayer.enable) return;

		const followedPlayer = playerList.find(p => p.ip === followPlayer.ip);
		if (!followedPlayer) return;
		else moveMapToCenter(followedPlayer.lat, followedPlayer.lng);
	}, [playerList, followPlayer]);

	const [viewPort, setViewPort] = useState({
		lat: -128,
		lng: 128,
		zoom: 5,
	});
	const [moveCenter, setMoveCenter] = useState<LatLngExpression>([-128, 128]);

	const maxBounds: LatLngBoundsExpression = [
		[-69, 34.75],
		[-187, 221.2],
	];

	const moveMapToCenter = (lat: number, lng: number) => {
		setMoveCenter([lat, lng] as LatLngExpression);
	};

	return (
		<>
			<PlayerList
				players={playerList}
				moveCenter={(lat, lng) => moveMapToCenter(lat, lng)}
				followPlayer={(followPlayer: followPlayer) =>
					setFollowPlayer(followPlayer)
				}
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
