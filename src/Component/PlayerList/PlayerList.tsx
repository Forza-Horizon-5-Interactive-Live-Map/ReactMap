import { SiSpeedtest } from 'react-icons/si';
import { BiSolidUser, BiRename } from 'react-icons/bi';
import { TbSitemap, TbSitemapOff } from 'react-icons/tb';
import { BsCarFrontFill } from 'react-icons/bs';
import { FaUserAltSlash } from 'react-icons/fa';
import { AiOutlinePause, AiOutlineDisconnect } from 'react-icons/ai';
import './PlayerList.scss';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import { useRef, useState } from 'react';
import EditPlayerNameDialog from '../EditPlayerName/EditPlayerNameDialog';
import { useDisclosure } from '@mantine/hooks';

export type followPlayer = {
	id: string | null;
	enable: boolean;
};

interface props {
	players: MessageDTO[];
	moveCenter(lat: number, lng: number): void;
	followPlayer(followed: followPlayer): void;
}

const PlayerList = (props: props) => {
	const playerListRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const [isFollowPlayer, setFollow] = useDisclosure(false, {
		onClose: () => {
			setFollowedPlayer('');
			props.followPlayer({
				id: null,
				enable: false,
			});
		},
	});
	const [displayDialog, toggleDialog] = useState(false);
	const [followedPlayerIp, setFollowedPlayer] = useState('');

	const handlePlayerSelected = (playerIp: string) => {
		const player: MessageDTO | undefined = props.players.find(
			p => p.id === playerIp,
		);
		if (player && !player.isDisconnecting)
			props.moveCenter(player.lat, player.lng);
	};

	const handleFollowPlayer = (player: MessageDTO) => {
		setFollowedPlayer(player.id);
		props.followPlayer({
			id: player.id,
			enable: true,
		});
		if (player.id === followedPlayerIp || !isFollowPlayer) setFollow.toggle();
	};

	const handleDisplayRename = () => {
		buttonRef.current?.style.setProperty('display', 'none');
		toggleDialog(true);
	};
	const handleHideRename = () => {
		buttonRef.current?.style.setProperty('display', 'flex');
		toggleDialog(false);
	};

	return (
		<>
			<div className="PlayerContainer">
				<div className="PlayerList" ref={playerListRef}>
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
								<div className="Player" key={player.id}>
									<div>
										<div
											className="PlayerName"
											onClick={() => handlePlayerSelected(player.id)}>
											<span>
												<BiSolidUser />{' '}
												{!player.playerName ||
												player.playerName.trim().length === 0
													? 'Unknown'
													: player.playerName}
											</span>
											<span
												className="followPlayerBt"
												onClick={() => handleFollowPlayer(player)}>
												{isFollowPlayer && followedPlayerIp === player.id ? (
													<TbSitemapOff color="red" />
												) : (
													<TbSitemap />
												)}
											</span>
										</div>
									</div>
									<div className="PlayerSpeed">
										<SiSpeedtest /> {player.speedKmhDisplay}
									</div>
									<div className="PlayerCar">
										<span>
											<BsCarFrontFill /> {player.maker} {player.model}{' '}
											{player.year}
										</span>
									</div>
									{!player.isDisconnecting ? (
										<>
											{player.isPaused && (
												<div className="PlayerWaiting">
													<span>
														<AiOutlinePause /> Player in menu
													</span>
												</div>
											)}
										</>
									) : (
										<div className="PlayerDisconnect">
											<span>
												<AiOutlineDisconnect /> Disconnecting...
											</span>
										</div>
									)}
									<hr />
								</div>
							))}
						</>
					)}
				</div>
				{props.players.length !== 0 ? (
					<>
						<div
							className="EditPlayerNameButton"
							ref={buttonRef}
              onClick={handleDisplayRename}
              title="Rename your player"
            >
							<BiRename />
						</div>
						<EditPlayerNameDialog
							isShow={displayDialog}
							closeDialog={handleHideRename}
						/>
					</>
				) : null}
			</div>
		</>
	);
};

export default PlayerList;
