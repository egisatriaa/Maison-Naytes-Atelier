import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How long does the scent last?",
    a: "Our Eau de Parfum concentrations typically last 8-12 hours on the skin, depending on your unique body chemistry and the specific variant."
  },
  {
    q: "Are your ingredients ethically sourced?",
    a: "Yes, Maison Naytés is committed to the highest standards of ethics. We work directly with small growers in France and Italy to ensure sustainable harvesting of our signature notes."
  },
  {
    q: "Do you offer worldwide shipping?",
    a: "We currently ship to over 50 countries globally. All orders are packed in our signature luxury gift boxes and delivered via carbon-neutral logistics."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/10">
      <div className="max-w-[800px] mx-auto px-8">
        <h2 className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-16">Curated Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-primary/10">
              <AccordionTrigger className="text-lg font-headline hover:no-underline hover:text-primary transition-colors py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
