import SpotlightCard from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
    return (
        <section
            id="contact"
            className="py-32 bg-background relative overflow-hidden border-t border-primary/10"
        >
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                <SpotlightCard
                    className="bg-primary/[0.02] border-none rounded-[3rem] p-12 md:p-24"
                    spotlightColor="rgba(209, 170, 91, 0.25)"
                >
                    <div className="text-center">
                        <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-8">
                            Find Your Signature
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-headline mb-12 max-w-4xl mx-auto">
                            Discover Your Signature Scent
                        </h3>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                variant="outline"
                                className="rounded-full px-12 py-8 text-sm tracking-widest uppercase border-primary/20 hover:bg-primary hover:text-background transition-all"
                            >
                                Browse Collection
                            </Button>
                            <Button className="rounded-full px-12 py-8 text-sm tracking-widest uppercase bg-primary text-background hover:scale-105 transition-transform">
                                Book a Consultation
                            </Button>
                        </div>
                    </div>
                </SpotlightCard>
            </div>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-primary/5 rounded-full blur-[160px] pointer-events-none -z-10" />
        </section>
    );
}
