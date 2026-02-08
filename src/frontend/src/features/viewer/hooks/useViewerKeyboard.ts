import { useEffect } from 'react';

interface UseViewerKeyboardProps {
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
  position: { x: number; y: number };
}

export function useViewerKeyboard({
  onNext,
  onPrevious,
  onClose,
  onZoomIn,
  onZoomOut,
  onReset,
  scale,
  position,
}: UseViewerKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If zoomed in, arrow keys pan the image
      if (scale > 1) {
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
          case 'ArrowUp':
          case 'ArrowDown':
            // Let useZoomPan handle panning
            return;
        }
      }

      // Otherwise, arrow keys navigate
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          onZoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          onZoomOut();
          break;
        case '0':
          e.preventDefault();
          onReset();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious, onClose, onZoomIn, onZoomOut, onReset, scale]);
}
