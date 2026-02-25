import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import SpotlightCard from '@/components/ui/spotlight-card';

const FAQS = [
    {
        q: 'How long does the scent last?',
        a: 'Our Eau de Parfum concentrations typically last 8-12 hours on the skin, depending on your unique body chemistry and the specific variant.',
    },
    {
        q: 'Are your ingredients ethically sourced?',
        a: 'Yes, Maison Naytés is committed to the highest standards of ethics. We work directly with small growers in France and Italy to ensure sustainable harvesting of our signature notes.',
    },
    {
        q: 'Do you offer worldwide shipping?',
        a: 'We currently ship to over 50 countries globally. All orders are packed in our signature luxury gift boxes and delivered via carbon-neutral logistics.',
    },
];

export function FAQSection() {
    return (
        <section id="faq" className="py-24 bg-muted/10">
            <div className="max-w-[800px] mx-auto px-8">
                <h2 className="text-center text-sm tracking-[0.4em] uppercase text-primary mb-16">
                    Curated Questions
                </h2>
                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <SpotlightCard
                            key={i}
                            className="border border-white/5 bg-muted/20"
                            spotlightColor="rgba(209, 170, 91, 0.4)"
                        >
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full px-6"
                            >
                                <AccordionItem
                                    value={`item-${i}`}
                                    className="border-none"
                                >
                                    <AccordionTrigger className="text-lg font-headline hover:no-underline hover:text-primary transition-colors py-6">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
