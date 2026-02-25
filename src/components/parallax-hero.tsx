"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useImageSequence } from '@/hooks/use-image-sequence';
import { FragranceVariant, FRAGRANCES } from '@/lib/fragrance-data';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ParallaxHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeFragrance = FRAGRANCES[currentIndex];
  const { images, isLoaded, progress } = useImageSequence(activeFragrance.sequencePath, activeFragrance.frameCount);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Draw frame on index change
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIndex];
    if (img) {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    }
  }, [frameIndex, isLoaded, images]);

  // Handle scroll to update frame index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollFraction = Math.max(0, Math.min(1, Math.abs(rect.top) / rect.height));
      const newFrameIndex = Math.min(activeFragrance.frameCount - 1, Math.floor(scrollFraction * activeFragrance.frameCount));
      setFrameIndex(newFrameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeFragrance.frameCount]);

  const switchFragrance = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === 'next') return (prev + 1) % FRAGRANCES.length;
        return (prev - 1 + FRAGRANCES.length) % FRAGRANCES.length;
      });
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div ref={containerRef} className="parallax-container" id="hero">
      <div className="parallax-sticky flex items-center justify-center">
        {/* Cinematic Background Canvas */}
        <canvas 
          ref={canvasRef} 
          width={1920} 
          height={1080} 
          className="absolute inset-0 z-0 pointer-events-none opacity-80" 
        />
        
        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center">
            <div className="text-4xl font-headline mb-8 tracking-widest text-primary animate-pulse">
              MAISON NAYTÉS
            </div>
            <div className="w-64 h-0.5 bg-muted overflow-hidden relative">
              <div 
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] tracking-widest opacity-50 uppercase">
              Loading Collection {progress}%
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-8 flex items-center pointer-events-none">
          <div className={cn(
            "w-full max-w-xl transition-all duration-500 ease-in-out pointer-events-auto",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            <h1 className="text-6xl md:text-8xl font-headline font-black leading-tight mb-2 tracking-tighter">
              {activeFragrance.name}
            </h1>
            <p className="text-sm md:text-base font-medium tracking-[0.3em] text-primary uppercase mb-6">
              {activeFragrance.subtitle}
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-md">
              {activeFragrance.description}
            </p>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="rounded-full px-8 py-6 tracking-widest uppercase text-xs border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
              >
                Discover
              </Button>
              <Button 
                style={{ backgroundColor: activeFragrance.accentColor }}
                className="rounded-full px-8 py-6 tracking-widest uppercase text-xs text-white border-none transition-transform hover:scale-105"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Fragrance Navigation (Right Side) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="mb-4 text-4xl font-headline font-bold text-primary/30">
            0{activeFragrance.id}
          </div>
          <div className="flex flex-col items-center gap-4 bg-background/10 backdrop-blur-sm p-4 rounded-full border border-primary/10">
            <button 
              onClick={() => switchFragrance('prev')}
              className="p-2 hover:text-primary transition-colors group relative"
            >
              <ChevronUp className="h-6 w-6" />
              <span className="sr-only">Previous</span>
              <div className="absolute right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">PREV</div>
            </button>
            <div className="w-px h-12 bg-primary/20" />
            <button 
              onClick={() => switchFragrance('next')}
              className="p-2 hover:text-primary transition-colors group relative"
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Next</span>
              <div className="absolute right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">NEXT</div>
            </button>
          </div>
          {isTransitioning && (
            <div className="mt-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
