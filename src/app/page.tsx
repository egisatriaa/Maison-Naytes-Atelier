'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { ParallaxHero } from '@/components/parallax-hero';
import { NotesSection } from '@/components/sections/notes-section';
import { CraftsmanshipSection } from '@/components/sections/craftsmanship';
import { ReviewsSection } from '@/components/sections/reviews';
import { FAQSection } from '@/components/sections/faq-section';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/footer';
import { ContentAssistant } from '@/components/admin/content-assistant';
import { Loader2 } from 'lucide-react';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';

export default function Home() {
    const [isAppLoading, setIsAppLoading] = useState(true);

    // Set loading to false after a slight delay to ensure first paint or hero start
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SmoothScrollProvider>
            <main className="relative dark">
                {/* Cinematic Initial Loader */}
                {isAppLoading && (
                    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-headline tracking-[0.5em] uppercase text-primary animate-pulse">
                                Maison Naytés
                            </h2>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                                Preparing Experience
                            </span>
                        </div>
                    </div>
                )}

                {/* Sticky Navigation */}
                <Navbar />

                {/* Cinematic Interactive Hero */}
                <ParallaxHero />

                {/* Content Sections */}
                <div className="relative z-20 bg-background">
                    <section
                        id="collection"
                        className="py-24 border-t border-primary/10"
                    >
                        <div className="max-w-[1200px] mx-auto px-8">
                            <div className="max-w-3xl">
                                <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
                                    L'Inspiration
                                </h2>
                                <h3 className="text-4xl md:text-6xl font-headline mb-12">
                                    The Spirit of Maison Naytés
                                </h3>
                                <p className="text-xl font-light text-muted-foreground leading-relaxed mb-8">
                                    In the heart of Paris, we redefine the
                                    boundaries of olfactory art. Our house
                                    combines traditional French craftsmanship
                                    with a modern, cinematic sensibility. We
                                    don't just create scents; we compose visual
                                    stories through aroma.
                                </p>
                                <p className="text-lg font-light text-muted-foreground leading-relaxed">
                                    Each fragrance variant is a complete sensory
                                    atmosphere, designed to evoke a specific
                                    mood, a forgotten memory, or a cinematic
                                    dreamscape.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Dynamic Notes Section */}
                    <NotesSection />

                    {/* Master Glassmaking Section */}
                    <CraftsmanshipSection />

                    {/* Testimonials */}
                    <ReviewsSection />

                    {/* Questions */}
                    <FAQSection />

                    {/* Final Purchase Call */}
                    <FinalCTA />

                    {/* Brand Footer */}
                    <Footer />
                </div>

                {/* Internal Tool for Content Managers */}
                <ContentAssistant />
            </main>
        </SmoothScrollProvider>
    );
}
