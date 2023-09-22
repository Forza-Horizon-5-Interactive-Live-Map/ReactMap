// import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, Modal, TextInput, Text } from '@mantine/core';
import './MantineDialog.scss';

const MantineDialog = () => {
	return (
		<div className="DialogContainer">
			<Dialog
				opened={true}
				withCloseButton
				onClose={close}
				size="lg"
				radius="md"
				position={{ top: 20, right: 20 }}>
				<Text size="sm" mb="xs" fw={500}>
					Subscribe to email newsletter
				</Text>

				<Group align="flex-end">
					<TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
					<Button onClick={close}>Subscribe</Button>
				</Group>
			</Dialog>
		</div>
	);
};

export default MantineDialog;
