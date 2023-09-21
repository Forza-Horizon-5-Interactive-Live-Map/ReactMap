import { PiUserListBold } from 'react-icons/pi';
import { SiSpeedtest } from 'react-icons/si';
import { BiSolidUser } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { AiOutlinePause, AiOutlineDisconnect } from 'react-icons/ai';
import './PlayerList.scss';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';

interface props {
	players: MessageDTO[];
}

const PlayerList = (props: props) => {
	return (
		<>
			<div className="playerListButton">
				<PiUserListBold className="icon" />
			</div>
			<div className="PlayerList">
				{props.players.map((player: MessageDTO) => (
					<>
						<div className="Player" key={player.ip}>
              <BiSolidUser /> {player.playerName}
							<br />
              <SiSpeedtest /> {player.speedKmhDisplay}
							<br />
							<BsCarFrontFill /> {player.maker} {player.model} {player.year}
							<br />
							<AiOutlinePause /> Player in menu
							<br />
							<AiOutlineDisconnect /> No data recived
							<br />
						</div>
						<hr />
					</>
				))}
			</div>
		</>
	);
};

export default PlayerList;
