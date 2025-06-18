
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { incrementAdsWatched, incrementAdsSkipped } from '@/lib/jobs';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdWatched: () => void;
}

const AD_DURATION_SECONDS = 5;

export function AdModal({ isOpen, onClose, onAdWatched }: AdModalProps) {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(AD_DURATION_SECONDS);
  const [adSkipped, setAdSkipped] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      setProgress(0);
      setCountdown(AD_DURATION_SECONDS);
      setAdSkipped(false); // Reset skip status
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
    } else {
       // If modal is closed before ad completion and not already marked as watched
      if (progress < 100 && !adSkipped && isOpen === false && countdown > 0) { // Check isOpen from previous render
         // This logic is tricky because isOpen becomes false immediately.
         // A better way would be to track on an unmount-like effect or via the onClose prop
      }
    }
    return () => clearInterval(timer);
  }, [isOpen]); // countdown removed to prevent re-triggering interval

  const handleModalClose = (open: boolean) => {
    if (!open) { // Dialog is closing
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
    onClose(); // Ensure modal closes
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline">Watch Ad to Apply</DialogTitle>
          <DialogDescription>
            Please watch this short simulated advertisement to unlock the job application.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
            <Image 
              src="https://placehold.co/728x90.png?text=Simulated+Advertisement" 
              alt="Simulated Advertisement" 
              width={728} 
              height={90}
              data-ai-hint="advertisement banner"
              className="object-contain"
              priority
            />
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
            {progress < 100 ? `Please wait... (${countdown}s)` : 'Proceed to Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
