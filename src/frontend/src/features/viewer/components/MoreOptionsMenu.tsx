import { MoreVertical, RotateCcw, RotateCw, Maximize, Minimize, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MoreOptionsMenuProps {
  rotation: number;
  fitMode: 'fit' | 'actual';
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onToggleFitMode: () => void;
  imageInfo: {
    title: string;
    source: string;
  };
}

export function MoreOptionsMenu({
  rotation,
  fitMode,
  onRotateLeft,
  onRotateRight,
  onToggleFitMode,
  imageInfo,
}: MoreOptionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 h-12 md:h-14 lg:h-16 px-4 md:px-6"
        >
          <MoreVertical className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2" />
          <span className="text-base md:text-lg lg:text-xl">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/90 border-white/20 text-white w-64 md:w-80">
        <DropdownMenuItem
          onClick={onRotateLeft}
          className="text-base md:text-lg lg:text-xl py-3 md:py-4 cursor-pointer hover:bg-white/20 focus:bg-white/20"
        >
          <RotateCcw className="w-5 h-5 md:w-6 md:h-6 mr-3" />
          Rotate Left
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onRotateRight}
          className="text-base md:text-lg lg:text-xl py-3 md:py-4 cursor-pointer hover:bg-white/20 focus:bg-white/20"
        >
          <RotateCw className="w-5 h-5 md:w-6 md:h-6 mr-3" />
          Rotate Right
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem
          onClick={onToggleFitMode}
          className="text-base md:text-lg lg:text-xl py-3 md:py-4 cursor-pointer hover:bg-white/20 focus:bg-white/20"
        >
          {fitMode === 'fit' ? (
            <>
              <Minimize className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Actual Size
            </>
          ) : (
            <>
              <Maximize className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Fit to Screen
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <div className="px-3 py-3 md:py-4 text-sm md:text-base text-white/70">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-white">{imageInfo.title}</p>
              <p className="text-xs md:text-sm mt-1">Source: {imageInfo.source}</p>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
