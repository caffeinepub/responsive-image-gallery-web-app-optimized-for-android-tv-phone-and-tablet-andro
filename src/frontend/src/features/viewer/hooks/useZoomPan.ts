import { useState, useCallback, useEffect } from 'react';

export function useZoomPan() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.25, 0.5);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [scale, position]
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.1, 4));
    } else {
      setScale((prev) => {
        const newScale = Math.max(prev - 0.1, 0.5);
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newScale;
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || scale <= 1) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scale <= 1) return;

      const step = 20;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: prev.x + step }));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: prev.x - step }));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: prev.y + step }));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: prev.y - step }));
          break;
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, dragStart, scale]);

  return {
    scale,
    position,
    handleZoomIn,
    handleZoomOut,
    handleReset,
    handleMouseDown,
    handleWheel,
  };
}
