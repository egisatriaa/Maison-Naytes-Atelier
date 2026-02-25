import React from 'react';
import { Instagram, Music, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="py-20 bg-black text-white/50 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-2 space-y-8">
          <div className="text-2xl font-headline text-primary font-bold">Maison Naytés</div>
          <p className="max-w-xs text-sm font-light leading-relaxed">
            Crafting modern haute parfumerie with cinematic elegance from our atelier in Paris.
          </p>
          <div className="flex items-center gap-6">
            <Instagram className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
            <Music className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
            <Twitter className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs tracking-widest uppercase text-white font-bold">The House</h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Ateliers</li>
            <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs tracking-widest uppercase text-white font-bold">Assistance</h4>
          <ul className="space-y-4 text-sm font-light">
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-8 mt-20 pt-8 border-t border-white/5 text-[10px] tracking-[0.3em] uppercase flex flex-col md:flex-row justify-between gap-4">
        <div>© 2024 Maison Naytés Atelier. All rights reserved.</div>
        <div>Crafted with Cinematic Elegance.</div>
      </div>
    </footer>
  );
}
