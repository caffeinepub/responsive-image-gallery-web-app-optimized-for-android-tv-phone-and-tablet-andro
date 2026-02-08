import { useEffect, useRef } from 'react';
import type { Image } from '../../../backend';
import { toGalleryImage } from '../types/galleryTypes';
import { Card } from '@/components/ui/card';

interface GalleryGridProps {
  images: Image[];
  onImageSelect: (index: number) => void;
}

export function GalleryGrid({ images, onImageSelect }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const galleryImages = images.map(toGalleryImage);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gridRef.current) return;
      
      const focusedElement = document.activeElement as HTMLElement;
      if (!focusedElement || !gridRef.current.contains(focusedElement)) return;

      const buttons = Array.from(gridRef.current.querySelectorAll('button'));
      const currentIndex = buttons.indexOf(focusedElement as HTMLButtonElement);
      
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const cols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, buttons.length - 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = Math.min(currentIndex + cols, buttons.length - 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - cols, 0);
          break;
      }

      if (nextIndex !== currentIndex) {
        buttons[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
    >
      {galleryImages.map((image, index) => (
        <button
          key={image.id}
          onClick={() => onImageSelect(index)}
          className="group relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background transition-all hover:scale-105"
        >
          <Card className="w-full h-full overflow-hidden border-2 group-hover:border-primary transition-colors">
            <img
              src={image.displayUrl}
              alt={image.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-sm md:text-base lg:text-lg font-medium truncate">
                  {image.title}
                </p>
              </div>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
}
