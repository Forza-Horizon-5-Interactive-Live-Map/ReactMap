import { MessageDTO } from "../../Services/API/Models/MessageDTO";

const getPlayerList = (): MessageDTO[] => [
	{
		ip: '109.206.143.49',
		playerName: 'Dercraker',
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
		model: 'M12S',
		maker: 'Warthog CST',
		year: 2554,
		group: 'B',
		carOrdinal: 2525,
		weight: 1500,
  },
  {
		ip: '109.206.143.45',
		playerName: 'Fake Data',
		isPaused: true,
		isDisconnecting: false,
		posX: -100,
		posXDisplay: '-128.00',
		posY: 140,
		posYDisplay: '+128.00',
		posZ: 50,
		posZDisplay: '+50.00',
		lat: -100,
		lng: 135,
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
		model: 'M12S',
		maker: 'Warthog CST',
		year: 2554,
		group: 'B',
		carOrdinal: 2525,
		weight: 1500,
	},
];





export default getPlayerList;