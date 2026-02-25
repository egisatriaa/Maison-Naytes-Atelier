'use server';
/**
 * @fileOverview A Genkit flow for generating luxury-aligned sensory descriptions for fragrance notes.
 *
 * - explainFragranceNote - A function that generates a sensory description for a given fragrance note.
 * - FragranceNoteExplainerInput - The input type for the explainFragranceNote function.
 * - FragranceNoteExplainerOutput - The return type for the explainFragranceNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FragranceNoteExplainerInputSchema = z.object({
  fragranceNote: z.string().describe('The specific fragrance ingredient or note (e.g., "Bergamot", "Jasmine", "Sandalwood").'),
  noteType: z.enum(['Top', 'Heart', 'Base']).describe('The type of the fragrance note (Top, Heart, or Base).'),
  fragranceName: z.string().describe('The name of the fragrance for context (e.g., "Rose Noir Absolue").'),
});
export type FragranceNoteExplainerInput = z.infer<typeof FragranceNoteExplainerInputSchema>;

const FragranceNoteExplainerOutputSchema = z.object({
  sensoryDescription: z.string().describe('A luxury-aligned, sensory description of the fragrance note.'),
});
export type FragranceNoteExplainerOutput = z.infer<typeof FragranceNoteExplainerOutputSchema>;

export async function explainFragranceNote(input: FragranceNoteExplainerInput): Promise<FragranceNoteExplainerOutput> {
  return fragranceNoteExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fragranceNoteExplainerPrompt',
  input: {schema: FragranceNoteExplainerInputSchema},
  output: {schema: FragranceNoteExplainerOutputSchema},
  prompt: `You are an expert perfumer and a connoisseur of luxury fragrances for Maison Naytés.
Your task is to provide a highly descriptive, luxury-aligned, and sensory-focused explanation for a specific fragrance note within the context of a high-end perfume. Focus on evoking emotion, texture, and the unique olfactory profile.

Craft a concise description (1-2 sentences) for the following:

Fragrance Name: {{{fragranceName}}}
Note Type: {{{noteType}}}
Fragrance Note: {{{fragranceNote}}}

Example Output:
"Bergamot, a luminous top note, bursts forth with a sophisticated, zesty freshness, reminiscent of sun-drenched Italian orchards."

Begin your description with the Fragrance Note and its Note Type, then delve into its sensory qualities, reflecting the elegance and craftsmanship of Maison Naytés.`, 
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const fragranceNoteExplainerFlow = ai.defineFlow(
  {
    name: 'fragranceNoteExplainerFlow',
    inputSchema: FragranceNoteExplainerInputSchema,
    outputSchema: FragranceNoteExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
