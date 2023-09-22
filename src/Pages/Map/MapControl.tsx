import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface props {
	pos: LatLngExpression;
}

const MapControl = (props: props) => {
	const map = useMap();
  useEffect(() => {
    if (!props.pos) return;
    map.setView(props.pos);
  },[props.pos]);

	return null;
};

export default MapControl;
