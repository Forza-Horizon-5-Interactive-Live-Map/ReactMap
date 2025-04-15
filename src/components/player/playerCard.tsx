import { CarClassDisplay } from '@/components/car/carClassDisplay';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useGlobalStore } from '@/lib/store/globalStore';
import { MessageDTO } from '@/Services/API/Models/MessageDTO';
import {
  Car,
  CircleGauge,
  Locate,
  LocateFixed,
  Pause,
  Unplug,
} from 'lucide-react';

type PlayerCardProps = {
  player: MessageDTO;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const setViewTo = useGlobalStore(s => s.setViewTo);
  return (
    <Card className="py-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {true ? (
              <Locate
                onClick={() => setViewTo(player.lat, player.lng)}
                className="cursor-pointer"
              />
            ) : (
              <LocateFixed />
            )}
            <CardTitle className="max-w-36 truncate">
              {player.playerName}
            </CardTitle>
          </div>
          <div className="flex items-center">
            {player.isPaused && <Pause className="ml-2" />}
            {player.isDisconnecting && (
              <Unplug className="ml-2 text-orange-500" />
            )}
          </div>
        </div>
        <CardDescription>
          {player.isPaused && <Typography>Paused</Typography>}
          {player.isDisconnecting && <Typography>Disconnecting</Typography>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <CircleGauge size={20} />
          <Typography>{player.speedKmhDisplay}</Typography>
        </div>
        <CarClassDisplay
          carClass={player.carClass}
          carIndex={player.carIndex}
        />
        <div className="flex items-center gap-2">
          <Car size={20} />
          <Typography>
            {player.maker} {player.model} {player.year}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
