import { PiUserListBold } from 'react-icons/pi';
import { SiSpeedtest } from 'react-icons/si';
import { BiSolidUser } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { FaUserAltSlash } from 'react-icons/fa';
import { AiOutlinePause, AiOutlineDisconnect } from 'react-icons/ai';
import './PlayerList.scss';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import { useEffect, useRef, useState } from 'react';
import { Portal } from '@mantine/core';
import EditPlayerNameDialog from './EditPlayerNameDialog';

interface props {
	players: MessageDTO[];
	moveCenter(lat: number, lng: number): void;
}

const PlayerList = (props: props) => {
	const playerListRef = useRef<HTMLDivElement>(null);
	const [editPlayer, setEditPlayer] = useState<MessageDTO>(null);
	const [isEditPlayer, setIsEditPlayer] = useState<boolean>(false);

	const handleShowPlayerList = () =>
		(playerListRef.current!.style.display = 'block');
	const handleHidePlayerList = () =>
		(playerListRef.current!.style.display = 'block');

	const handlePlayerSelected = (playerIp: string) => {
		const player: MessageDTO | undefined = props.players.find(
			p => p.ip === playerIp,
		);
		if (player && !player.isDisconnecting)
			props.moveCenter(player.lat, player.lng);
	};

	const handleDoubleClickPlayerName = (playerIp: string) => {
		const player: MessageDTO | undefined = props.players.find(
			p => p.ip === playerIp,
		);
		if (player) {
			console.log(
				'🚀 ~ file: PlayerList.tsx:41 ~ handleDoubleClickPlayerName ~ player:',
				player,
			);
			setEditPlayer(player);
			setIsEditPlayer(true);
		}
	};

	return (
		<>
			{/* <div className="playerListButton" onMouseEnter={handleShowPlayerList}>
				<PiUserListBold className="icon" />
			</div> */}
			<div className="PlayerContainer">
				<div
					className="PlayerList"
					ref={playerListRef}
					onMouseLeave={handleHidePlayerList}>
					{props.players.length == 0 ? (
						<div className="Player">
							<div className="PlayerName">
								<span>
									<FaUserAltSlash /> No player logged
								</span>
							</div>
						</div>
					) : (
						<>
							{props.players.map((player: MessageDTO) => (
								<div className="Player" key={player.ip}>
									<div
										className="PlayerName"
										onClick={() => handlePlayerSelected(player.ip)}
										onDoubleClick={() =>
											handleDoubleClickPlayerName(player.ip)
										}>
										<span>
											<BiSolidUser />{' '}
											{!player.playerName ||
											player.playerName.trim().length === 0
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
														<AiOutlineDisconnect /> Disconnecting...
													</span>
												</div>
											)}
										</>
									)}
									<hr />
								</div>
							))}
						</>
					)}
				</div>
				<EditPlayerNameDialog
					isDialogOpen={isEditPlayer}
					editPlayer={editPlayer}
					closeDialog={() => setIsEditPlayer(false)}
				/>
			</div>
		</>
	);
};

export default PlayerList;
