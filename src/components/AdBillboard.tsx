
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateAdImage } from '@/ai/flows/generate-ad-flow';
import { Megaphone } from 'lucide-react';

const FALLBACK_AD_IMAGE = "https://placehold.co/600x400.png";

export function AdBillboard() {
  const [adImageUrl, setAdImageUrl] = useState<string>(FALLBACK_AD_IMAGE);
  const [isAdLoading, setIsAdLoading] = useState(true);

  useEffect(() => {
    setIsAdLoading(true);
    generateAdImage({})
      .then(response => {
        if (response.imageUrl) {
          setAdImageUrl(response.imageUrl);
        }
      })
      .catch(error => {
        console.error("Failed to generate billboard ad image:", error);
        // Silently fail to placeholder, no need to toast the user for this.
      })
      .finally(() => {
        setIsAdLoading(false);
      });
  }, []);

  return (
    <a href="https://example.com" target="_blank" rel="noopener noreferrer sponsored" className="block group">
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <CardHeader>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Megaphone size={16} />
                <CardTitle className="text-sm font-medium">Sponsored Content</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-2">
          <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {isAdLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={adImageUrl}
                  alt="Promotional Billboard Advertisement"
                  width={600}
                  height={400}
                  data-ai-hint="advertisement billboard"
                  className="object-contain w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              )}
            </div>
        </CardContent>
      </Card>
    </a>
  );
}
