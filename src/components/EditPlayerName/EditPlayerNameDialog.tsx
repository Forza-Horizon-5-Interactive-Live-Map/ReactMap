import { Group, TextInput, Button } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import './EditPlayerNameDialog.scss';
import { PlayerController } from '../../Services/API/PlayerController';
import { SetPlayerNameDTO } from '../../Services/API/Models/SetPlayerNameDTO';
import useClientIp from '../../Hook/useClientIp';

interface props {
  closeDialog: () => void;
  isShow:boolean;
}
const EditPlayerNameDialog = (props: props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setPlayerName] = useState<string>('');
  const clientIp = useClientIp();
  
  const closeDialog = () => {
    setPlayerName('');
		props.closeDialog();
  }

  useEffect(() => {
    if (!dialogRef) return;
    
		props.isShow
			? dialogRef.current?.style.setProperty('display', 'flex')
			: dialogRef.current?.style.setProperty('display', 'none');
	}, [props.isShow]);

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
  
  useOnClickOutside(dialogRef, closeDialog);

	return (
		<div className="EditPlayerNameDialog" ref={dialogRef}>
			<Group align="flex-end">
				<TextInput
					style={{ flex: 1 }}
					value={name}
					onChange={e => setPlayerName(e.currentTarget.value)}
					onKeyDown={e => e.key === 'Enter' && handleRenamePlayer()}
					ref={textInputRef}
          error={name.length === 0}
          placeholder='New nickname'
				/>
				<Button onClick={handleRenamePlayer} disabled={name.length === 0}>
					Rename
				</Button>
			</Group>
		</div>
	);
};

export default EditPlayerNameDialog;
