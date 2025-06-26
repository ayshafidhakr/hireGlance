
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { incrementAdsWatched, incrementAdsSkipped } from '@/lib/jobs';
import { generateAdImage } from '@/ai/flows/generate-ad-flow';
import { useToast } from '@/hooks/use-toast';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdWatched: () => void;
}

const AD_DURATION_SECONDS = 5;
const FALLBACK_AD_IMAGE = "https://placehold.co/728x90.png";

export function AdModal({ isOpen, onClose, onAdWatched }: AdModalProps) {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(AD_DURATION_SECONDS);
  const [adSkipped, setAdSkipped] = useState(false);
  const [adImageUrl, setAdImageUrl] = useState<string>(FALLBACK_AD_IMAGE);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      // Reset states for new modal opening
      setProgress(0);
      setCountdown(AD_DURATION_SECONDS);
      setAdSkipped(false);
      setIsAdLoading(true);
      setAdImageUrl(FALLBACK_AD_IMAGE);

      // Generate a new ad image
      generateAdImage({})
        .then(response => {
          setAdImageUrl(response.imageUrl);
        })
        .catch(error => {
          console.error("Failed to generate ad image:", error);
          toast({
            title: "Ad Service Error",
            description: "Could not load a dynamic ad. Displaying a placeholder.",
            variant: "destructive"
          });
        })
        .finally(() => {
          setIsAdLoading(false);
        });

      // Start the countdown timer
      let elapsed = 0;
      timer = setInterval(() => {
        elapsed += 0.1;
        const currentProgress = (elapsed / AD_DURATION_SECONDS) * 100;
        setProgress(currentProgress > 100 ? 100 : currentProgress);
        setCountdown(Math.max(0, AD_DURATION_SECONDS - Math.floor(elapsed)));
        if (elapsed >= AD_DURATION_SECONDS) {
          clearInterval(timer);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isOpen, toast]);

  const handleModalClose = (open: boolean) => {
    if (!open) { 
      if (progress < 100 && !adSkipped) {
        incrementAdsSkipped();
        setAdSkipped(true);
      }
      onClose();
    }
  };
  
  const handleAdWatchedAndProceed = () => {
    if (progress >= 100) {
      incrementAdsWatched();
    }
    onAdWatched();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline">A message from our sponsors</DialogTitle>
          <DialogDescription>
            Please watch this short simulated advertisement to continue to the job application.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
            {isAdLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image 
                src={adImageUrl} 
                alt="Simulated Advertisement" 
                width={728} 
                height={90}
                data-ai-hint="advertisement banner"
                className="object-contain w-full h-auto"
                priority
              />
            )}
          </div>
          <Progress value={progress} className="w-full h-3 [&>div]:bg-accent" />
          {countdown > 0 && <p className="text-sm text-center text-muted-foreground">Ad playing... {countdown}s remaining</p>}
        </div>
        <DialogFooter>
          <Button 
            onClick={handleAdWatchedAndProceed} 
            disabled={progress < 100}
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
            aria-label={progress < 100 ? `Wait ${countdown} more seconds` : "Proceed to application"}
          >
            {progress < 100 ? `Please wait... (${countdown}s)` : 'Proceed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
