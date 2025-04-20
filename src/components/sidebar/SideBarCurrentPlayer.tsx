import useClientIp from '@/Hook/useClientIp';
import { useGlobalStore } from '@/lib/store/globalStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';
import { PlayerCard } from '../player/playerCard';
import { Separator } from '../ui/separator';

export const SideBarCurrentPlayer = () => {
  const playerList = useGlobalStore(s => s.playerList);
  const expandedId = useSidebarStore(s => s.expandedId);
  const setExpandedId = useSidebarStore(s => s.setExpandedId);

  const clientIp = useClientIp();
  console.log('🚀 ~ SideBarCurrentPlayer ~ clientIp:', clientIp);

  const currentPlayer = playerList.find(p => p.ip === clientIp);

  if (!currentPlayer) return null;

  return (
    <>
      <PlayerCard
        player={currentPlayer}
        isExpanded={expandedId === currentPlayer.id}
        onExpand={id => setExpandedId(id === expandedId ? null : id)}
        isCurrentPlayer={currentPlayer.ip === clientIp}
      />
      <Separator className="my-4" />
    </>
  );
};
