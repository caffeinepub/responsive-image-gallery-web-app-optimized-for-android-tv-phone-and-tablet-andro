import { useState } from 'react';

export function useSlideshow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setInterval] = useState(5000);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    isPlaying,
    interval,
    togglePlay,
    setInterval,
  };
}
