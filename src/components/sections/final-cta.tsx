import React from 'react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-primary/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-8 text-center relative z-10">
        <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-8">Find Your Signature</h2>
        <h3 className="text-5xl md:text-7xl font-headline mb-12 max-w-4xl mx-auto">
          Discover Your Signature Scent
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="outline" className="rounded-full px-12 py-8 text-sm tracking-widest uppercase border-primary/20 hover:bg-primary hover:text-background transition-all">
            Browse Collection
          </Button>
          <Button className="rounded-full px-12 py-8 text-sm tracking-widest uppercase bg-primary text-background hover:scale-105 transition-transform">
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
