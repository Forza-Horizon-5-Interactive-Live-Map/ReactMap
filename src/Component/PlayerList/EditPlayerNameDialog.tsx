import { Dialog, Group, TextInput, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { MessageDTO } from '../../Services/API/Models/MessageDTO';

import './EditPlayerNameDialog.scss';

interface props {
	isDialogOpen: boolean;
	editPlayer: MessageDTO;
	closeDialog: () => void;
}
const EditPlayerNameDialog = (props: props) => {
	const [isOpened, state] = useDisclosure(true);

	useEffect(() => {
		props.isDialogOpen ? state.open() : state.close();
	}, [props.isDialogOpen]);

	const handleRenamePlayer = () => {
		//TODO: Rename player

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
					Rename unknown player
				</Text>

				<Group align="flex-end">
					<TextInput placeholder="New player name" style={{ flex: 1 }} />
					<Button onClick={handleRenamePlayer}>Rename</Button>
				</Group>
			</Dialog>
		</>
	);
};

export default EditPlayerNameDialog;
