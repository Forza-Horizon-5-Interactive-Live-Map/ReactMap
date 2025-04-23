import { useDisclosure } from '@/Hook/useDisclosure';
import { HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { InlineTooltip } from '../ui/tooltip';
import { Typography } from '../ui/typography';
export const WelcomeDialog = () => {
  const [isOpen, dialogState] = useDisclosure(false);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const noLongerShowWelcomeModal: boolean = JSON.parse(
      localStorage.getItem('NoLongerShowWelcomeModal') ?? 'false',
    );

    if (noLongerShowWelcomeModal) {
      dialogState.close();
      setIsChecked(noLongerShowWelcomeModal);
    } else dialogState.open();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={dialogState.toggle}>
      <InlineTooltip title="Help">
        <DialogTrigger asChild>
          <HelpCircle
            onClick={dialogState.toggle}
            className="cursor-pointer fixed bottom-2 left-2 hover:scale-110 transition-all duration-300 text-muted-foreground hover:text-primary"
          />
        </DialogTrigger>
      </InlineTooltip>
      <DialogContent className="bg-card text-white !max-w-3xl">
        <DialogHeader>
          <DialogTitle>Welcome to the map</DialogTitle>
        </DialogHeader>
        <Typography>
          On this map, you can view your position and those of other players at
          live, with telemetry data.
        </Typography>
        <div className="border-2 rounded-lg p-4 pt-0">
          <Typography variant="h3" className="text-center">
            To send us your telemetry data
          </Typography>
          <Typography>
            - Go to <Button variant="outline">Settings</Button> {'> '}
            <Button variant="outline">HUG AND GAMEPLAY</Button>
          </Typography>
          <div className="flex items-center gap-2">
            - At the bottom of the page, enable{' '}
            <Typography className="font-bold">DATA OUT</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="font-bold">DATA OUT IP ADDRESS</Typography> :
            <Input value="dercraker.fr" readOnly className="w-fit" />
          </div>
          <div className="flex items-center gap-2">
            <Typography className="font-bold">DATA OUT IP PORT</Typography> :
            <Input value="5690" readOnly className="w-fit mt-1" />
          </div>
          <Typography>The configuration is done</Typography>
        </div>
        <div className="flex gap-4">
          <div className="border-2 rounded-lg p-4 pt-0 flex-1/2">
            <Typography variant="h3">UserName</Typography>
            <Typography>To rename you in the player list</Typography>
            <Typography>
              By default, if this is your first visit. Your name will be set to
              a random username.
            </Typography>
            <Typography>
              However, you can change your name directly from the player card.
            </Typography>
          </div>
          <div className="border-2 rounded-lg p-4 pt-0 flex-1/2">
            <Typography variant="h3">Features list</Typography>
            <div className="flex flex-col items-start">
              <Typography>- Center map on player</Typography>
              <Typography>- Follow player</Typography>
              <Typography>- Show player car</Typography>
              <Typography>- Show car stats</Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isChecked}
            onCheckedChange={checked => {
              setIsChecked(Boolean(checked));
              localStorage.setItem(
                'NoLongerShowWelcomeModal',
                JSON.stringify(checked),
              );
            }}
            className="cursor-pointer"
          />
          <Typography>Do not show this message again</Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};
