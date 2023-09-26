import { Dialog, Group, TextInput, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
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
	const [isOpened, state] = useDisclosure(false);
	const [name, setPlayerName] = useState<string>('');

	useEffect(() => {
		props.isDialogOpen ? state.open() : state.close();
	}, [props.isDialogOpen]);

	const handleRenamePlayer = () => {
		const playerName: SetPlayerNameDTO = {
			ip: props.editPlayer.ip,
			playerName: name,
		};

		PlayerController.UpdatePlayerName(playerName);
		props.closeDialog();
	};

	return (
		<>
			<Dialog
				opened={isOpened}
				withCloseButton
				onClose={() => props.closeDialog()}
				size="lg"
				radius="md"
				position={{ bottom: 20, right: 20 }}>
				<Text size="sm" mb="xs" fw={500}>
					Rename {props.editPlayer?.playerName}
				</Text>

				<Group align="flex-end">
					<TextInput
						placeholder={props.editPlayer?.playerName}
						style={{ flex: 1 }}
						value={name}
						onChange={e => setPlayerName(e.currentTarget.value)}
					/>
					<Button onClick={handleRenamePlayer}>Rename</Button>
				</Group>
			</Dialog>
		</>
	);
};

export default EditPlayerNameDialog;
