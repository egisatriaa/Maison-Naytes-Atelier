import React from 'react';
import Image from 'next/image';

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="py-24 bg-muted/20">
      <div className="max-w-[1200px] mx-auto px-8 grid md:grid-cols-2 items-center gap-16">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
          <Image 
            src="https://picsum.photos/seed/maison5/800/1000" 
            alt="Perfume Craftsmanship" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="luxury bottle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-70 mb-2">Designed in Paris</p>
            <p className="text-2xl font-headline">The Sculptural Glass</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-4">The Art of the Bottle</h2>
            <h3 className="text-4xl md:text-5xl font-headline mb-6">Masterful Craftsmanship</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Every bottle of Maison Naytés is a testament to the enduring elegance of French design. 
              Our glassmakers in Normandy craft each vessel with a high-contrast sculptural rim, 
              ensuring that the light dances through the liquid within, revealing the complex soul 
              of the fragrance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
            <div>
              <p className="text-3xl font-headline text-primary mb-1">01</p>
              <p className="text-xs tracking-widest uppercase font-bold mb-2">Purity</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">High-clarity flint glass with exceptional brilliance.</p>
            </div>
            <div>
              <p className="text-3xl font-headline text-primary mb-1">02</p>
              <p className="text-xs tracking-widest uppercase font-bold mb-2">Detail</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">Hand-finished weighted caps with gold engraving.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
