import { useState } from 'react';
import './MapPage.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CRS, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import MapListener from './MapListener';
import PlayerList from '../../Component/PlayerList/PlayerList';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';

const getPlayerList = () => [{
  ip:'109.206.143.49',
  playerName:'Cameron Maldonado',
  isPaused:false,
  isDisconnecting:false,
  posX:-128,
  posXDisplay:'-128.00',
  posY:128,
  posYDisplay:'+128.00',
  speed:0,
  speedKmh:60,
  speedKmhDisplay:'60 Km/h',
  speedMph:0,
  speedMphDisplay:'',
  model:'RS',
  maker:'Ford',
  year:-1,
  group:'B',
  carOrdinal:2525,
  weight:1500
},
{
  ip:'67.184.237.200',
  playerName:'Jeffery Sharp',
  isPaused:true,
  isDisconnecting:false,
  posX:0,
  posXDisplay:'',
  posY:0,
  posYDisplay:'',
  speed:0,
  speedKmh:0,
  speedKmhDisplay:'',
  speedMph:0,
  speedMphDisplay:'',
  model:'',
  maker:'',
  year:0,
  group:'',
  carOrdinal:0,
  weight:0
},
{
  ip:'228.136.131.4',
  playerName:'Martin Yates',
  isPaused:false,
  isDisconnecting:false,
  posX:-128,
  posXDisplay:'-128.00',
  posY:128,
  posYDisplay:'+128.00',
  speed:0,
  speedKmh:130,
  speedKmhDisplay:'130 Km/h',
  speedMph:0,
  speedMphDisplay:'',
  model:'RS',
  maker:'Ford',
  year:-1,
  group:'B',
  carOrdinal:2525,
  weight:1500
},
{
  ip:'107.16.198.187',
  playerName:'Sophia Hughes',
  isPaused:false,
  isDisconnecting:false,
  posX:-128,
  posXDisplay:'-128.00',
  posY:128,
  posYDisplay:'+128.00',
  speed:0,
  speedKmh:20,
  speedKmhDisplay:'20 Km/h',
  speedMph:0,
  speedMphDisplay:'',
  model:'RS',
  maker:'Ford',
  year:-1,
  group:'B',
  carOrdinal:2525,
  weight:1500
},
{
  ip:'148.77.122.250',
  playerName:'Jose Kelley',
  isPaused:true,
  isDisconnecting:true,
  posX:0,
  posXDisplay:'',
  posY:0,
  posYDisplay:'',
  speed:0,
  speedKmh:0,
  speedKmhDisplay:'',
  speedMph:0,
  speedMphDisplay:'',
  model:'',
  maker:'',
  year:0,
  group:'',
  carOrdinal:0,
  weight:0
}]

const MapPage = () => {
	const [viewPort, setViewPort] = useState({
		lat: -85,
		lng: 128,
		zoom: 5,
	});

	const maxBounds: LatLngBoundsExpression = [
		[-69, 34.75],
		[-187, 221.2],
	];

	const [playerList, setPlayerList] = useState<MessageDTO[]>(getPlayerList());

	return (
		<>
			<PlayerList players={playerList}/>
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
				<TileLayer url={'http://localhost:8000/{z}/{x}/{y}.png'} />
				{playerList.map((player: MessageDTO) => (
					<Marker
						key={player.ip}
						position={[player.posX,player.posY] as LatLngExpression}
						eventHandlers={{
							click: e => {},
						}}>
						<Popup>
							id: {player.ip} Name: {player.playerName}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	);
};

export default MapPage;
