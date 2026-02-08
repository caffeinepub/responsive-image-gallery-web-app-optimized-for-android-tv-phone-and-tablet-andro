import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SlideshowControlsProps {
  interval: number;
  onIntervalChange: (interval: number) => void;
}

export function SlideshowControls({ interval, onIntervalChange }: SlideshowControlsProps) {
  const intervals = [
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: '10s', value: 10000 },
  ];

  const currentLabel = intervals.find((i) => i.value === interval)?.label || '5s';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 h-12 md:h-14 lg:h-16 px-4 md:px-6"
        >
          <Clock className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2" />
          <span className="text-base md:text-lg lg:text-xl">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/90 border-white/20 text-white">
        {intervals.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => onIntervalChange(item.value)}
            className="text-base md:text-lg lg:text-xl py-3 md:py-4 cursor-pointer hover:bg-white/20 focus:bg-white/20"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
