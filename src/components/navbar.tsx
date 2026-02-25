'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Collection', href: '#collection' },
        { name: 'Notes', href: '#notes' },
        { name: 'Craftsmanship', href: '#craftsmanship' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-6 md:px-8 flex items-center justify-between',
                isScrolled || isMenuOpen
                    ? 'bg-background/90 backdrop-blur-lg border-b border-primary/10'
                    : 'bg-transparent',
            )}
        >
            <div className="text-xl md:text-2xl font-headline font-bold tracking-tighter text-primary">
                Maison Naytés
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile menu toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full text-primary"
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col gap-1 w-5">
                        <span
                            className={cn(
                                'h-px bg-current w-full transition-all',
                                isMenuOpen && 'rotate-45 translate-y-1',
                            )}
                        />
                        <span
                            className={cn(
                                'h-px bg-current w-full transition-all',
                                isMenuOpen && 'opacity-0',
                            )}
                        />
                        <span
                            className={cn(
                                'h-px bg-current w-full transition-all',
                                isMenuOpen && '-rotate-45 -translate-y-1',
                            )}
                        />
                    </div>
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 top-[64px] bg-background z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out',
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-headline tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </nav>
    );
}
