import { Group, TextInput, Button, Text } from '@mantine/core';
import { useRef, useState } from 'react';

import './EditPlayerNameDialog.scss';
import { PlayerController } from '../../Services/API/PlayerController';
import { SetPlayerNameDTO } from '../../Services/API/Models/SetPlayerNameDTO';
import useClientIp from '../../Hook/useClientIp';

interface props {
	closeDialog: () => void;
}
const EditPlayerNameDialog = (props: props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [name, setPlayerName] = useState<string>('');
  const clientIp = useClientIp();
  
  const closeDialog = () => {
    setPlayerName('');
		props.closeDialog();
  }


  const handleRenamePlayer = () => {
    
		const playerName: SetPlayerNameDTO = {
			playerIp: clientIp,
			playerName: name,
		};

    (async () => {
      await PlayerController.UpdatePlayerName(playerName);
    })();
    closeDialog();
	};

	return (
		<div className="EditPlayerNameDialog">
			<Text size="sm" mb="xs" fw={500}>
				Rename username
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
