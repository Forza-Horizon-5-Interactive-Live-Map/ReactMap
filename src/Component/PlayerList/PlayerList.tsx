import { PiUserListBold } from 'react-icons/pi';
import { SiSpeedtest } from 'react-icons/si';
import { BiSolidUser } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { AiOutlinePause, AiOutlineDisconnect } from 'react-icons/ai';
import './PlayerList.scss';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import { useRef } from 'react';

interface props {
	players: MessageDTO[];
	moveCenter(lat: number, lng: number): void;
}

const PlayerList = (props: props) => {
	const playerListRef = useRef<HTMLDivElement>(null);

	const handleShowPlayerList = () =>
		(playerListRef.current!.style.display = 'block');
	const handleHidePlayerList = () =>
		(playerListRef.current!.style.display = 'none');

	const handlePlayerSelected = (playerIp: string) => {
		const player: MessageDTO | undefined = props.players.find(
			p => p.ip === playerIp,
		);
		if (player) props.moveCenter(player.posX, player.posY);
	};

	return (
		<>
			<div className="playerListButton" onMouseEnter={handleShowPlayerList}>
				<PiUserListBold className="icon" />
			</div>
			<div
				className="PlayerList"
				ref={playerListRef}
				onMouseLeave={handleHidePlayerList}>
				{props.players.map((player: MessageDTO) => (
					<div className="Player" key={player.ip}>
						<div
							className="PlayerName"
							onClick={() => handlePlayerSelected(player.ip)}>
							<span>
								<BiSolidUser />{' '}
								{!player.playerName || player.playerName.trim().length === 0
									? 'Unknown'
									: player.playerName}
							</span>
						</div>
						{!player.isPaused ? (
							<>
								<div className="PlayerSpeed">
									<SiSpeedtest /> {player.speedKmhDisplay}
								</div>
								<div className="PlayerCar">
									<span>
										<BsCarFrontFill /> {player.maker} {player.model}{' '}
										{player.year}
									</span>
								</div>
							</>
						) : (
							<>
								{!player.isDisconnecting ? (
									<div className="PlayerWaiting">
										<span>
											<AiOutlinePause /> Player in menu
										</span>
									</div>
								) : (
									<div className="PlayerWaiting">
										<span>
											<AiOutlineDisconnect /> No data recived
										</span>
									</div>
								)}
							</>
						)}
						<hr />
					</div>
				))}
			</div>
		</>
	);
};

export default PlayerList;
