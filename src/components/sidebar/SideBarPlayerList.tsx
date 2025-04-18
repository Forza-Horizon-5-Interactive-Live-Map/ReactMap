import { PlayerCard } from '@/components/player/playerCard';
import useClientIp from '@/Hook/useClientIp';
import { useGlobalStore } from '@/lib/store/globalStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';
import { Typography } from '../ui/typography';

export const SideBarPlayerList = () => {
  const playerList = useGlobalStore(s => s.playerList);
  const expandedId = useSidebarStore(s => s.expandedId);
  const setExpandedId = useSidebarStore(s => s.setExpandedId);

  const clientIp = useClientIp();

  const filteredPlayerList = playerList.filter(p => p.ip !== clientIp);

  return (
    <div className="mt-8 flex flex-col gap-1">
      {filteredPlayerList.length > 0 ? (
        filteredPlayerList.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            isExpanded={expandedId === player.id}
            onExpand={id => setExpandedId(id === expandedId ? null : id)}
          />
        ))
      ) : (
        <div className="text-center">
          <Typography variant="lead">No player data received</Typography>
        </div>
      )}
    </div>
  );
};
