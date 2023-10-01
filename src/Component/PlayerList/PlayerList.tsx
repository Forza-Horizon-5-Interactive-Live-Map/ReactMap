import { SiSpeedtest } from 'react-icons/si';
import { BiSolidUser } from 'react-icons/bi';
import { TbSitemap, TbSitemapOff } from 'react-icons/tb';
import { BsCarFrontFill } from 'react-icons/bs';
import { FaUserAltSlash } from 'react-icons/fa';
import { AiOutlinePause, AiOutlineDisconnect } from 'react-icons/ai';
import './PlayerList.scss';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';
import { useRef, useState } from 'react';
import EditPlayerNameDialog from './EditPlayerNameDialog';
import { useDisclosure } from '@mantine/hooks';

export type folowPlayer = {
  ip: string | null,
  enable: boolean,
}

interface props {
	players: MessageDTO[];
	moveCenter(lat: number, lng: number): void;
	followPlayer(followed: folowPlayer): void;
}

const PlayerList = (props: props) => {
	const playerListRef = useRef<HTMLDivElement>(null);
	const [editPlayer, setEditPlayer] = useState<MessageDTO>({} as MessageDTO);
	const [isEditPlayer, setIsEditPlayer] = useState<boolean>(false);
	const [isFollowPlayer, setFollow] = useDisclosure(false, {
    onClose: () => {
      setFollowedPlayer('');
      props.followPlayer({
				ip: null,
				enable: false,
			});
    },
	});
	const [followedPlayerIp, setFollowedPlayer] = useState('');

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
			setEditPlayer(player);
			setIsEditPlayer(true);
		}
	};

	const handleFollowPlayer = (player: MessageDTO) => {
    setFollowedPlayer(player.ip);
    props.followPlayer({
      ip: player.ip,
      enable: true,
    });
		if (player.ip === followedPlayerIp || !isFollowPlayer) setFollow.toggle();
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
								<div className="Player" key={player.ip}>
									<div>
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
											<span
												className="followPlayerBt"
												onClick={() => handleFollowPlayer(player)}>
												{isFollowPlayer && followedPlayerIp === player.ip ? (
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
				<EditPlayerNameDialog
					isDialogOpen={isEditPlayer}
					editPlayer={editPlayer}
					closeDialog={() => {
						setIsEditPlayer(false);
						setEditPlayer({} as MessageDTO);
					}}
				/>
			</div>
		</>
	);
};

export default PlayerList;
