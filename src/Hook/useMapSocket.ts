import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { MessageDTO } from '../Services/API/Models/MessageDTO';

const useMapSocket = (url: string): MessageDTO[] => {
	const [connection, setConnection] = useState<null | HubConnection>(null);
	const [message, setMessage] = useState<MessageDTO[]>([]);

	useEffect(() => {
		const connect = new HubConnectionBuilder()
			.withUrl(url)
			.withAutomaticReconnect()
			.build();

		setConnection(connect);
	}, []);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => {
					connection.on('MapUpdate', message => {
						setMessage(message);
					});
				})
				.catch(error => console.log(error));
		}
	}, [connection]);
	return message;
};

export default useMapSocket;
