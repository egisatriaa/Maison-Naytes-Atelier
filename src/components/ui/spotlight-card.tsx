'use client';

import React, { useRef, ReactNode } from 'react';
import './spotlight-card.css';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    onClick?: () => void;
}

const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.15)',
    onClick,
}: SpotlightCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className={cn('card-spotlight', className)}
        >
            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default SpotlightCard;
