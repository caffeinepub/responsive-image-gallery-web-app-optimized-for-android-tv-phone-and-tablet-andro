import { useState, useCallback } from 'react';

export function useImageTransforms() {
  const [rotation, setRotation] = useState(0);
  const [fitMode, setFitMode] = useState<'fit' | 'actual'>('fit');

  const handleRotateLeft = useCallback(() => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const toggleFitMode = useCallback(() => {
    setFitMode((prev) => (prev === 'fit' ? 'actual' : 'fit'));
  }, []);

  const resetTransforms = useCallback(() => {
    setRotation(0);
    setFitMode('fit');
  }, []);

  return {
    rotation,
    fitMode,
    handleRotateLeft,
    handleRotateRight,
    toggleFitMode,
    resetTransforms,
  };
}
