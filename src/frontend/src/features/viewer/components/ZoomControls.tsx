import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ scale, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 border border-white/20 rounded-lg p-1 md:p-2">
      <Button
        variant="ghost"
        size="lg"
        onClick={onZoomOut}
        disabled={scale <= 0.5}
        className="text-white hover:bg-white/20 disabled:opacity-50 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-0"
      >
        <ZoomOut className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </Button>
      <span className="text-white text-base md:text-lg lg:text-xl font-medium min-w-[4rem] text-center">
        {Math.round(scale * 100)}%
      </span>
      <Button
        variant="ghost"
        size="lg"
        onClick={onZoomIn}
        disabled={scale >= 4}
        className="text-white hover:bg-white/20 disabled:opacity-50 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-0"
      >
        <ZoomIn className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </Button>
      <div className="w-px h-8 md:h-10 bg-white/20" />
      <Button
        variant="ghost"
        size="lg"
        onClick={onReset}
        className="text-white hover:bg-white/20 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-0"
      >
        <Maximize2 className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </Button>
    </div>
  );
}
