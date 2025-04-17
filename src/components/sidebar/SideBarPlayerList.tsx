import { PlayerCard } from '@/components/player/playerCard';
import { useGlobalStore } from '@/lib/store/globalStore';
import { useState } from 'react';
import { Typography } from '../ui/typography';

export const SideBarPlayerList = () => {
  const playerList = useGlobalStore(s => s.playerList);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mt-8 flex flex-col gap-1">
      {playerList.length > 0 ? (
        playerList.map(player => (
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
