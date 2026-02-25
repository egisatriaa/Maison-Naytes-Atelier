"use client";

import React, { useState } from 'react';
import { contentGeneratorAssistant } from '@/ai/flows/content-generator-assistant-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, Wand2, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function ContentAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ description: string, ctas: string[] } | null>(null);

  const [formData, setFormData] = useState({
    name: 'Bleu de Montreuil',
    keywords: 'citrus, lavender, ocean, cedar',
    mood: 'elegant, fresh, coastal',
    audience: 'discerning collectors'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const output = await contentGeneratorAssistant({
        fragranceName: formData.name,
        keywords: formData.keywords,
        mood: formData.mood,
        targetAudience: formData.audience
      });
      setResult({
        description: output.fragranceDescription,
        ctas: output.ctaSuggestions
      });
    } catch (err) {
      toast({
        title: "Generation Error",
        description: "Failed to generate luxury content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[60] bg-primary text-background p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
      >
        <Sparkles className="h-6 w-6" />
        <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-background text-foreground px-3 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/20">
          AI Content Assistant
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-background border-primary/20 overflow-hidden max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Maison Content Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fragrance Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Mood/Emotion</Label>
              <Input 
                value={formData.mood} 
                onChange={e => setFormData({...formData, mood: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Keywords (notes, accords)</Label>
            <Input 
              value={formData.keywords} 
              onChange={e => setFormData({...formData, keywords: e.target.value})}
              placeholder="e.g. Amber, Rose, Velvet..."
            />
          </div>
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <Input 
              value={formData.audience} 
              onChange={e => setFormData({...formData, audience: e.target.value})}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full py-6 rounded-full bg-primary text-background hover:opacity-90 transition-opacity"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Luxury Content
          </Button>

          {result && (
            <div className="space-y-6 animate-fade-in-up pt-4">
              <div className="space-y-2">
                <Label className="text-primary tracking-widest uppercase text-[10px]">Luxury Description</Label>
                <div className="p-4 bg-muted/30 rounded-lg text-sm font-light italic border border-primary/10">
                  {result.description}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-primary tracking-widest uppercase text-[10px]">CTA Suggestions</Label>
                <div className="grid gap-2">
                  {result.ctas.map((cta, i) => (
                    <div key={i} className="p-3 bg-primary/5 rounded-md text-xs tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {cta}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
