import { useGlobalStore } from '@/lib/store/globalStore';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef } from 'react';

const useMapSocket = () => {
  const followPlayer = useGlobalStore(s => s.followPlayer);
  const setFollowPlayer = useGlobalStore(s => s.setFollowPlayer);
  const setViewTo = useGlobalStore(s => s.setViewTo);

  const setPlayerList = useGlobalStore(s => s.setPlayerList);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_MAP_SOCKET_URL)
      .withAutomaticReconnect()
      .build();

    connect
      .start()
      .then(() => {
        console.log('✅ SignalR connected');

        connect.on('MapUpdate', data => {
          setPlayerList(data);
          connectionRef.current = connect;

          if (followPlayer) {
            const player = data.find((p: any) => p.id === followPlayer.id);
            if (player) setViewTo(player.lat, player.lng);
            else setFollowPlayer(null);
          }
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
  }, [followPlayer]);
};

export default useMapSocket;
