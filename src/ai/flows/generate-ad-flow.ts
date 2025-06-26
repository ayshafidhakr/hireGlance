
'use server';
/**
 * @fileOverview An AI flow to generate simulated ad images.
 *
 * - generateAdImage - A function that generates a promotional banner image.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// We can expand this later to take a product description, but for now, it's a simple trigger.
const GenerateAdInputSchema = z.object({});
export type GenerateAdInput = z.infer<typeof GenerateAdInputSchema>;

const GenerateAdOutputSchema = z.object({
    imageUrl: z.string().describe("The data URI of the generated ad image.")
});
export type GenerateAdOutput = z.infer<typeof GenerateAdOutputSchema>;

// The exported function that the UI will call.
export async function generateAdImage(input: GenerateAdInput): Promise<GenerateAdOutput> {
  return generateAdImageFlow(input);
}

const generateAdImageFlow = ai.defineFlow(
  {
    name: 'generateAdImageFlow',
    inputSchema: GenerateAdInputSchema,
    outputSchema: GenerateAdOutputSchema,
  },
  async () => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: 'Generate a visually appealing, professional promotional advertisement banner for a modern tech product. The ad should be sleek and eye-catching, suitable for a general audience. Do not include any text in the image.',
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media.url) {
        throw new Error('Image generation failed to produce a URL.');
    }
    
    return { imageUrl: media.url };
  }
);
