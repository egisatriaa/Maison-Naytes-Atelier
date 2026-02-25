import React from 'react';
import { Quote } from 'lucide-react';

const REVIEWS = [
  {
    text: "Rose Noir Absolue is not just a perfume; it's a cinematic experience. It stays on the skin like a warm memory of a Parisian night.",
    author: "Elodie V.",
    role: "Fragrance Connoisseur"
  },
  {
    text: "The complexity of Bois Impérial is staggering. It manages to be both powerful and incredibly sophisticated at the same time.",
    author: "Marc-Antoine",
    role: "Collector"
  }
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="max-w-[1000px] mx-auto px-8 text-center">
        <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-16">Editorial Testimonials</h2>
        
        <div className="grid md:grid-cols-2 gap-16">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col items-center">
              <Quote className="h-8 w-8 text-primary/20 mb-8" />
              <p className="text-2xl font-headline italic leading-relaxed mb-8">
                "{review.text}"
              </p>
              <div className="w-8 h-px bg-primary/30 mb-4" />
              <p className="text-xs tracking-widest uppercase font-bold">{review.author}</p>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
