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
import { IconEngine, IconManualGearbox } from '@tabler/icons-react';
import {
  Car,
  CircleGauge,
  Locate,
  LocateFixed,
  Minus,
  Pause,
  Plus,
  Unplug,
  Weight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { InlineTooltip } from '../ui/tooltip';

type PlayerCardProps = {
  player: MessageDTO;
  isExpanded: boolean;
  onExpand: (id: string | null) => void;
};

export const PlayerCard = ({
  player,
  isExpanded,
  onExpand,
}: PlayerCardProps) => {
  const setViewTo = useGlobalStore(s => s.setViewTo);
  return (
    <Card className="py-2 hover:bg-background">
      <CardHeader className="px-4">
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
      <CardContent className="flex flex-col gap-1 px-4">
        <div className="flex items-center gap-2">
          <CircleGauge size={20} />
          <Typography>{player.speedKmhDisplay}</Typography>
        </div>
        <CarClassDisplay
          carClass={player.carClass}
          carIndex={player.carIndex}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Car size={20} />
            <Typography className="max-w-44">
              {player.maker} {player.model} {player.year}
            </Typography>
          </div>
          {isExpanded ? (
            <InlineTooltip title="Collapse">
              <Minus
                onClick={() => onExpand(null)}
                className="cursor-pointer"
              />
            </InlineTooltip>
          ) : (
            <InlineTooltip title="Expand">
              <Plus
                onClick={() => onExpand(player.id)}
                className="cursor-pointer"
              />
            </InlineTooltip>
          )}
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden">
              <div className="flex items-center gap-2">
                Power: <Typography>{player.powerChDisplay}</Typography>
              </div>
              <div className="flex items-center gap-2">
                Torque: <Typography>{player.torqueNmDisplay}</Typography>
              </div>
              <div className="flex items-center gap-2">
                Drive Train: <Typography>{player.carDrivetrain}</Typography>
              </div>
              <InlineTooltip title="Gear">
                <div className="flex items-center gap-2">
                  <IconManualGearbox /> <Typography>{player.gear}</Typography>
                </div>
              </InlineTooltip>
              <InlineTooltip title="Cylinders">
                <div className="flex items-center gap-2">
                  <IconEngine />
                  <Typography>{player.cylindersCount} Cylinders</Typography>
                </div>
              </InlineTooltip>
              <InlineTooltip title="Weight">
                <div className="flex items-center gap-2">
                  <Weight /> <Typography>{player.weight} Kg</Typography>
                </div>
              </InlineTooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
