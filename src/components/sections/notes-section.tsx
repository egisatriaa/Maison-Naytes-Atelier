"use client";

import React, { useState } from 'react';
import { FRAGRANCES } from '@/lib/fragrance-data';
import { Card, CardContent } from '@/components/ui/card';
import { explainFragranceNote } from '@/ai/flows/fragrance-notes-explainer';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotesSection() {
  const [activeVariant, setActiveVariant] = useState(FRAGRANCES[0]);
  const [explaining, setExplaining] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleExplain = async (note: string, type: 'Top' | 'Heart' | 'Base') => {
    setExplaining(note);
    setDescription(null);
    try {
      const result = await explainFragranceNote({
        fragranceNote: note,
        noteType: type,
        fragranceName: activeVariant.name
      });
      setDescription(result.sensoryDescription);
    } catch (error) {
      setDescription("A refined note that completes this exquisite composition.");
    } finally {
      setExplaining(null);
    }
  };

  return (
    <section id="notes" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-sm tracking-[0.4em] uppercase text-primary mb-4">Olfactory Identity</h2>
            <h3 className="text-4xl md:text-5xl font-headline">Fragrance Notes</h3>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {FRAGRANCES.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVariant(v);
                  setDescription(null);
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-xs tracking-widest uppercase border transition-all whitespace-nowrap",
                  activeVariant.id === v.id 
                    ? "bg-primary text-background border-primary" 
                    : "border-primary/20 opacity-50 hover:opacity-100"
                )}
              >
                {v.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Top Notes */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-muted-foreground border-b border-primary/10 pb-4">
              Top Notes <span className="text-[10px] font-normal italic opacity-60">The first impression</span>
            </h4>
            <div className="space-y-4">
              {activeVariant.notes.top.map((note) => (
                <NoteItem key={note} note={note} onExplain={() => handleExplain(note, 'Top')} isExplaining={explaining === note} />
              ))}
            </div>
          </div>

          {/* Heart Notes */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-muted-foreground border-b border-primary/10 pb-4">
              Heart Notes <span className="text-[10px] font-normal italic opacity-60">The core character</span>
            </h4>
            <div className="space-y-4">
              {activeVariant.notes.heart.map((note) => (
                <NoteItem key={note} note={note} onExplain={() => handleExplain(note, 'Heart')} isExplaining={explaining === note} />
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-muted-foreground border-b border-primary/10 pb-4">
              Base Notes <span className="text-[10px] font-normal italic opacity-60">The lasting trail</span>
            </h4>
            <div className="space-y-4">
              {activeVariant.notes.base.map((note) => (
                <NoteItem key={note} note={note} onExplain={() => handleExplain(note, 'Base')} isExplaining={explaining === note} />
              ))}
            </div>
          </div>
        </div>

        {description && (
          <div className="mt-16 animate-fade-in-up bg-primary/5 border border-primary/10 p-8 rounded-2xl flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0 mt-1">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-lg font-light italic leading-relaxed text-foreground">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function NoteItem({ note, onExplain, isExplaining }: { note: string, onExplain: () => void, isExplaining: boolean }) {
  return (
    <Card className="bg-muted/30 border-none hover:bg-muted/50 transition-colors cursor-pointer group" onClick={onExplain}>
      <CardContent className="p-4 flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide">{note}</span>
        {isExplaining ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </CardContent>
    </Card>
  );
}
