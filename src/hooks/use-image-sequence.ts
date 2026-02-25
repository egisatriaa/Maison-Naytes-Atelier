"use client";

import { useState, useEffect, useCallback } from 'react';
import { formatFrameUrl } from '@/lib/fragrance-data';

export function useImageSequence(path: string, frameCount: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const preload = useCallback(async () => {
    setIsLoaded(false);
    setProgress(0);
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadPromises = Array.from({ length: frameCount }).map((_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = formatFrameUrl(path, i);
        img.onload = () => {
          loadedImages[i] = img;
          loadedCount++;
          setProgress(Math.floor((loadedCount / frameCount) * 100));
          resolve();
        };
        img.onerror = () => {
          // Fallback or ignore
          loadedCount++;
          resolve();
        };
      });
    });

    await Promise.all(loadPromises);
    setImages(loadedImages);
    setIsLoaded(true);
  }, [path, frameCount]);

  useEffect(() => {
    preload();
  }, [preload]);

  return { images, progress, isLoaded };
}
