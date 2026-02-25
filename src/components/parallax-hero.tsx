'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useImageSequence } from '@/hooks/use-image-sequence';
import { FragranceVariant, FRAGRANCES } from '@/lib/fragrance-data';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ParallaxHero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const activeFragrance = FRAGRANCES[currentIndex];
    const { images, isLoaded, progress } = useImageSequence(
        activeFragrance.sequencePath,
        activeFragrance.frameCount,
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [frameIndex, setFrameIndex] = useState(0);

    // Draw frame on index change
    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[frameIndex];
        if (img) {
            const zoom = 1.15; // Zoom factor to crop edges
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio) * zoom;
            const centerShiftX = (canvas.width - img.width * ratio) / 2;
            const centerShiftY = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShiftX,
                centerShiftY,
                img.width * ratio,
                img.height * ratio,
            );
        }
    }, [frameIndex, isLoaded, images]);

    // Handle scroll to update frame index
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollFraction = Math.max(
                0,
                Math.min(1, Math.abs(rect.top) / rect.height),
            );
            const newFrameIndex = Math.min(
                activeFragrance.frameCount - 1,
                Math.floor(scrollFraction * activeFragrance.frameCount),
            );
            setFrameIndex(newFrameIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeFragrance.frameCount]);

    const switchFragrance = (direction: 'next' | 'prev') => {
        // Removed 1-frame transition delay for immediate response
        setCurrentIndex((prev) => {
            if (direction === 'next') return (prev + 1) % FRAGRANCES.length;
            return (prev - 1 + FRAGRANCES.length) % FRAGRANCES.length;
        });
    };

    return (
        <div ref={containerRef} className="parallax-container" id="hero">
            <div className="parallax-sticky flex items-center justify-center bg-black">
                {/* Cinematic Background Canvas */}
                <canvas
                    ref={canvasRef}
                    width={1920}
                    height={1080}
                    className="absolute inset-0 z-0 pointer-events-none opacity-100"
                />

                {/* Progress and Skeleton Indicator */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Rotating loader */}
                            <div className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            {/* Pulsing skeleton bottle shape */}
                            <div className="w-24 h-40 bg-primary/20 rounded-lg animate-pulse backdrop-blur-md border border-primary/30 flex items-center justify-center">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-primary/40">
                                    Loading
                                </span>
                            </div>
                        </div>
                        {/* Thin progress bar at the top */}
                        <div className="absolute top-0 left-0 w-full h-1">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-8 flex items-center pointer-events-none">
                    <div className="w-full max-w-xl pointer-events-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black leading-tight mb-2 tracking-tighter text-[#d0d0d0]">
                            {activeFragrance.name}
                        </h1>
                        <p className="text-xs md:text-sm lg:text-base font-medium tracking-[0.3em] text-primary uppercase mb-6">
                            {activeFragrance.subtitle}
                        </p>
                        <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8 md:mb-10 max-w-md">
                            {activeFragrance.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-6 tracking-widest uppercase text-[10px] md:text-xs border-foreground/20 hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto"
                            >
                                Discover
                            </Button>
                            <Button
                                style={{
                                    backgroundColor:
                                        activeFragrance.accentColor,
                                }}
                                className="rounded-full px-8 py-6 tracking-widest uppercase text-[10px] md:text-xs text-white border-none transition-transform hover:scale-105 w-full sm:w-auto"
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Fragrance Navigation (Responsive) */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                    <div className="mb-2 md:mb-4 text-2xl md:text-4xl font-headline font-bold text-primary/30">
                        0{activeFragrance.id}
                    </div>
                    <div className="flex flex-col items-center gap-2 md:gap-4 bg-background/10 backdrop-blur-md p-3 md:p-4 rounded-full border border-primary/10">
                        <button
                            onClick={() => switchFragrance('prev')}
                            className="p-1 md:p-2 hover:text-primary transition-colors group relative"
                        >
                            <ChevronUp className="h-5 w-5 md:h-6 md:w-6" />
                            <span className="sr-only">Previous</span>
                            <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                PREV
                            </div>
                        </button>
                        <div className="w-px h-8 md:h-12 bg-primary/20" />
                        <button
                            onClick={() => switchFragrance('next')}
                            className="p-1 md:p-2 hover:text-primary transition-colors group relative"
                        >
                            <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
                            <span className="sr-only">Next</span>
                            <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                NEXT
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
