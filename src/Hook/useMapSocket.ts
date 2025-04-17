import { useGlobalStore } from '@/lib/store/globalStore';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef } from 'react';

const useMapSocket = () => {
  const setPlayerList = useGlobalStore(s => s.setPlayerList);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl('http://localhost:32700/mapUpdatesHub')
      .withAutomaticReconnect()
      .build();

    connect
      .start()
      .then(() => {
        console.log('✅ SignalR connected');

        connect.on('MapUpdate', data => {
          console.log('🗺️ Update reçu :', data);
          setPlayerList(data);
          connectionRef.current = connect;
        });
      })
      .catch(err => {
        console.error('❌ SignalR error:', err);
      });

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(err => {
          console.error('❌ Error during disconnect:', err);
        });
      }
    };
  }, []);
};

export default useMapSocket;
