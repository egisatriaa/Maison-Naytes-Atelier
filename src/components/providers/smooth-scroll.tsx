'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            lerp: 0.1,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
