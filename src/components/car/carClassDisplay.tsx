import { cn } from '@/lib/utils';

type CarClassDisplayProps = {
  carIndex: number;
  carClass: string;
};

export const CarClassDisplay = ({
  carIndex,
  carClass,
}: CarClassDisplayProps) => {
  return (
    <div
      className={cn(
        'flex items-center border-2 font-bold text-center w-24 h-8 rounded-sm text-xl',
        carClass === 'D' && 'bg-[var(--car-class-d)]',
        carClass === 'C' && 'bg-[var(--car-class-c)]',
        carClass === 'B' && 'bg-[var(--car-class-b)]',
        carClass === 'A' && 'bg-[var(--car-class-a)]',
        carClass === 'S1' && 'bg-[var(--car-class-s1)]',
        carClass === 'S2' && 'bg-[var(--car-class-s2)]',
        carClass === 'X' && 'bg-[var(--car-class-x)]',
      )}>
      <div className="text-white w-full flex-1/3">{carClass}</div>
      <div className="text-black bg-white w-full my-7 flex-2/3 rounded-r-sm">
        {carIndex}
      </div>
    </div>
  );
};
