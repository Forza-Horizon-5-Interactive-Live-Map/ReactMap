import { Group, TextInput, Button, Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';

import './EditPlayerNameDialog.scss';
import { PlayerController } from '../../Services/API/PlayerController';
import { SetPlayerNameDTO } from '../../Services/API/Models/SetPlayerNameDTO';

interface props {
	isDialogOpen: boolean;
	editPlayer: MessageDTO;
	closeDialog: () => void;
}
const EditPlayerNameDialog = (props: props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
	const dialogRef = useClickOutside(() => closeDialog());
  const [name, setPlayerName] = useState<string>('');
  

	useEffect(() => {
		if (props.isDialogOpen)
    {
      dialogRef.current?.style.setProperty('display', 'block')
      textInputRef.current?.focus();
    }
    else dialogRef.current?.style.setProperty('display', 'none');
  }, [props.isDialogOpen, dialogRef]);
  
  const closeDialog = () => {
    setPlayerName('');
		props.closeDialog();
  }

	const handleRenamePlayer = () => {
		const playerName: SetPlayerNameDTO = {
			playerIp: props.editPlayer.ip,
			playerName: name,
		};

    (async () => {
      await PlayerController.UpdatePlayerName(playerName);
    })();
    closeDialog();
	};

	return (
		<div className="EditPlayerNameDialog" ref={dialogRef}>
			<Text size="sm" mb="xs" fw={500}>
				Rename {props.editPlayer?.playerName || 'Unknown'}
			</Text>
			<Group align="flex-end">
				<TextInput
					style={{ flex: 1 }}
					value={name}
					onChange={e => setPlayerName(e.currentTarget.value)}
					onKeyDown={e => e.key === 'Enter' && handleRenamePlayer()}
					ref={textInputRef}
					error={name.length === 0}
				/>
				<Button onClick={handleRenamePlayer} disabled={name.length === 0}>
					Rename
				</Button>
			</Group>
		</div>
	);
};

export default EditPlayerNameDialog;
