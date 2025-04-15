import { PlayerCard } from '@/components/player/playerCard';
import { useGlobalStore } from '@/lib/store/globalStore';

export const SideBarPlayerList = () => {
  const playerList = useGlobalStore(s => s.playerList);
  return (
    <div className="mt-8 flex flex-col gap-1">
      {playerList.map(player => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};
