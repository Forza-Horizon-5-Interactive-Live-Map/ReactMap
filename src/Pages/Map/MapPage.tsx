import './MapPage.scss';

import { MapContainer, TileLayer } from 'react-leaflet';

const MapPage = () => {
	return (
		<>
			<MapContainer center={[50, 50]} zoom={5} scrollWheelZoom={true}>
			<TileLayer
				attribution='@Dercraker FH5 Interactive Live Map'
				url={'../MapTilesV2/{z}/{x}/{y}.png'}
			/>

		</MapContainer>
		</>
	);
};

export default MapPage;
