import { useMapEvents } from "react-leaflet";

interface props {
  updateMove: (pos: position) => void;
}

type position = {
  lat: number;
  lng: number;
}

const MapListener = (props: props) => {

  const mapEvent = useMapEvents({
		move: e => props.updateMove(e.target.getCenter()),
	});

	return <></>;
};

export default MapListener;
