'use server';
/**
 * @fileOverview An AI assistant for Maison Naytés content managers to generate luxury fragrance descriptions and CTA texts.
 *
 * - contentGeneratorAssistant - A function that handles the generation process.
 * - ContentGeneratorAssistantInput - The input type for the contentGeneratorAssistant function.
 * - ContentGeneratorAssistantOutput - The return type for the contentGeneratorAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentGeneratorAssistantInputSchema = z.object({
  fragranceName: z.string().describe('The name of the fragrance.'),
  keywords: z
    .string()
    .describe('Comma-separated keywords describing the fragrance (e.g., notes, ingredients, accords).'),
  mood: z.string().describe('The desired mood or emotion of the fragrance (e.g., sensual, mysterious, elegant).'),
  targetAudience:
    z.string().describe('The target audience for the fragrance (e.g., sophisticated women, discerning collectors).'),
  existingDescription:
    z.string().optional().describe('An optional existing description to refine or expand upon.'),
});
export type ContentGeneratorAssistantInput = z.infer<typeof ContentGeneratorAssistantInputSchema>;

const ContentGeneratorAssistantOutputSchema = z.object({
  fragranceDescription:
    z.string().describe('A 1-3 sentence luxury-focused, sensory fragrance description.'),
  ctaSuggestions:
    z.array(z.string()).describe('An array of compelling call-to-action text suggestions (e.g., "Discover Your Signature Scent").'),
});
export type ContentGeneratorAssistantOutput = z.infer<typeof ContentGeneratorAssistantOutputSchema>;

export async function contentGeneratorAssistant(input: ContentGeneratorAssistantInput):
  Promise<ContentGeneratorAssistantOutput> {
  return contentGeneratorAssistantFlow(input);
}

const contentGeneratorAssistantPrompt = ai.definePrompt({
  name: 'contentGeneratorAssistantPrompt',
  input: {schema: ContentGeneratorAssistantInputSchema},
  output: {schema: ContentGeneratorAssistantOutputSchema},
  prompt: `You are a highly skilled luxury fragrance copywriter for Maison Naytés, a French-inspired haute parfumerie.
Your task is to craft exquisite, sensory-focused fragrance descriptions and compelling call-to-action (CTA) text suggestions.
Adhere to a cinematic, luxurious, and editorial tone. Avoid commercial or playful language.

Input Details:
Fragrance Name: {{{fragranceName}}}
Keywords: {{{keywords}}}
Mood: {{{mood}}}
Target Audience: {{{targetAudience}}}
{{#if existingDescription}}Existing Description to Refine: {{{existingDescription}}}{{/if}}

Instructions:
1. Fragrance Description: Create a 1-3 sentence description that evokes a rich sensory experience, highlighting the luxury and unique character of the fragrance. Focus on imagery, feelings, and the interplay of notes.
2. CTA Suggestions: Provide 3-5 distinct, refined, and compelling call-to-action phrases that encourage discovery or purchase, aligning with Maison Naytés' sophisticated image.

Ensure the output is in JSON format matching the ContentGeneratorAssistantOutputSchema.`,
});

const contentGeneratorAssistantFlow = ai.defineFlow(
  {
    name: 'contentGeneratorAssistantFlow',
    inputSchema: ContentGeneratorAssistantInputSchema,
    outputSchema: ContentGeneratorAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await contentGeneratorAssistantPrompt(input);
    return output!;
  },
);
