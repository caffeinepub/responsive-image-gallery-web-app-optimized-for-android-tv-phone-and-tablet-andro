import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Image } from '../../../backend';
import { toGalleryImage } from '../../gallery/types/galleryTypes';
import { useViewerKeyboard } from '../hooks/useViewerKeyboard';
import { useSlideshow } from '../hooks/useSlideshow';
import { useZoomPan } from '../hooks/useZoomPan';
import { useImageTransforms } from '../hooks/useImageTransforms';
import { SlideshowControls } from './SlideshowControls';
import { ZoomControls } from './ZoomControls';
import { MoreOptionsMenu } from './MoreOptionsMenu';

interface ImageViewerModalProps {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageViewerModal({ images, initialIndex, onClose }: ImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const galleryImages = images.map(toGalleryImage);
  const currentImage = galleryImages[currentIndex];

  const { isPlaying, interval, togglePlay, setInterval: setSlideshowInterval } = useSlideshow();
  const { scale, position, handleZoomIn, handleZoomOut, handleReset, handleMouseDown, handleWheel } = useZoomPan();
  const { rotation, fitMode, handleRotateLeft, handleRotateRight, toggleFitMode, resetTransforms } = useImageTransforms();

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useViewerKeyboard({
    onNext: goToNext,
    onPrevious: goToPrevious,
    onClose,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onReset: handleReset,
    scale,
    position,
  });

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(goToNext, interval);
      return () => clearInterval(timer);
    }
  }, [isPlaying, interval, currentIndex]);

  useEffect(() => {
    resetTransforms();
    handleReset();
  }, [currentIndex]);

  const transform = `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 lg:p-8 bg-black/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <span className="text-white text-lg md:text-xl lg:text-3xl font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-white/70 text-base md:text-lg lg:text-2xl truncate max-w-xs md:max-w-md lg:max-w-2xl">
            {currentImage.title}
          </span>
        </div>
        <Button
          variant="ghost"
          size="lg"
          onClick={onClose}
          className="text-white hover:bg-white/20 h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 p-0"
        >
          <X className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        </Button>
      </div>

      {/* Image Container */}
      <div 
        className="flex-1 relative overflow-hidden cursor-move"
        onMouseDown={scale > 1 ? handleMouseDown : undefined}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={currentImage.displayUrl}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform,
              transformOrigin: 'center',
            }}
            draggable={false}
          />
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="lg"
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 p-0 rounded-full"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={goToNext}
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 p-0 rounded-full"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
        </Button>
      </div>

      {/* Controls Footer */}
      <div className="p-4 md:p-6 lg:p-8 bg-black/50 backdrop-blur">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Slideshow Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 h-12 md:h-14 lg:h-16 px-4 md:px-6"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2" />
              )}
              <span className="text-base md:text-lg lg:text-xl">
                {isPlaying ? 'Pause' : 'Play'}
              </span>
            </Button>
            <SlideshowControls interval={interval} onIntervalChange={setSlideshowInterval} />
          </div>

          {/* Zoom Controls */}
          <ZoomControls
            scale={scale}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
          />

          {/* More Options */}
          <MoreOptionsMenu
            rotation={rotation}
            fitMode={fitMode}
            onRotateLeft={handleRotateLeft}
            onRotateRight={handleRotateRight}
            onToggleFitMode={toggleFitMode}
            imageInfo={{
              title: currentImage.title,
              source: currentImage.imageType.__kind__,
            }}
          />
        </div>
      </div>
    </div>
  );
}
