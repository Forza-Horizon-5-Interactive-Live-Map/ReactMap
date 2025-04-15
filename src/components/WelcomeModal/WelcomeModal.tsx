import { useDisclosure } from '@mantine/hooks';
import { Stepper, Button, Group, Text, List, Title, Checkbox } from '@mantine/core';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';
import EditPlayerNameDialog from '../EditPlayerName/EditPlayerNameDialog';
import Box from '@mui/material/Box';
import './WelcomeModal.scss'

const WelcomeModal = () => {
  const [opened, ModalState] = useDisclosure(false, {
		onClose: () =>
			localStorage.setItem(
				'NoLongerShowWelcomeModal',
				JSON.stringify(isNeverShowChecked),
			),
	});
  const [activeStep, setActiveStep] = useState(0);
  const [isNeverShowChecked, setChecked] = useState(false);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeStep && activeStep != 0 || !backButtonRef) return;
    
    activeStep === 0
			? backButtonRef.current?.style.setProperty('display', 'none')
			: backButtonRef.current?.style.setProperty('display', 'block');
  }, [activeStep, backButtonRef]);

  const nextStep = () => {
    if (activeStep !== 3) setActiveStep(current => current + 1);
    else {
      ModalState.close();
    }
  };
	const prevStep = () =>
    setActiveStep(current => (current > 0 ? current - 1 : current));
  
  useEffect(() => {
		const noLongerShowWelcomeModal = JSON.parse(
			localStorage.getItem('NoLongerShowWelcomeModal') ?? 'false',
		);
		if (noLongerShowWelcomeModal) {
			ModalState.close();
		} else {
			ModalState.open();
		}
  }, []);
  
  const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
    width: '60vw',
		bgcolor: '#F5ECDC',
    borderRadius: '10px',
		boxShadow: 24,
		p: 4,
	};
  
  return (
		<>
			<Modal
				open={opened}
				onClose={() => ModalState.close()}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Stepper active={activeStep} onStepClick={setActiveStep}>
						<Stepper.Step
							label="Map Information"
							description="The map principle">
							<Text size="md" ta="center">
								On this map, you can view your position and those of other
								players at live, with UDP telemetry data.
							</Text>
						</Stepper.Step>
						<Stepper.Step
							label="Send Telemetry"
							description="Configure your game">
							<Title size="h2" ta="center">
								To send us your UDP data :
							</Title>
							<List ta="center">
								<List.Item>Go to SETTINGS</List.Item>
								<List.Item>Then HUD AND GAMEPLAY</List.Item>
								<List.Item>
									At the bottom of the page, enable DATA OUT
								</List.Item>
								<List.Item>
									In DATA OUT IP ADDRESS: <Text fw={700}>dercraker.fr</Text> Or 
									<Text fw={700}>82.67.17.53</Text>
								</List.Item>
								<List.Item>
									In DATA OUT IP PORT: <Text fw={700}>5690</Text>
								</List.Item>
								<List.Item>The configuration is done</List.Item>
							</List>
						</Stepper.Step>
						<Stepper.Step
							label="Set player name"
							description="Rename you in player list">
							<Text ta="center">
								By default, if this is your first visit. Your name will be set
								to unknown. Use the field below to change your nickname
							</Text>
							<EditPlayerNameDialog closeDialog={nextStep} isShow />
						</Stepper.Step>
						<Stepper.Completed>
							<Title size="h2" ta="center">
								Feature List
							</Title>
							<List ta="center">
								<List.Item>Center map on player</List.Item>
								<List.Item>Folow player</List.Item>
							</List>
							<Checkbox
								checked={isNeverShowChecked}
								onChange={event => setChecked(event.currentTarget.checked)}
								label={<Text size="lg">No longer display</Text>}
							/>
						</Stepper.Completed>
					</Stepper>
					<Group justify="center" mt="xl">
						<Button
							variant="default"
							onClick={prevStep}
							ref={backButtonRef}
							style={{ display: 'none' }}>
							Back
						</Button>
						<Button onClick={nextStep}>
							{activeStep !== 3 ? <Text>Next Step</Text> : <Text>Close</Text>}
						</Button>
					</Group>
				</Box>
			</Modal>
		</>
	);
};

export default WelcomeModal;
