'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdWatched: () => void;
}

const AD_DURATION_SECONDS = 5;

export function AdModal({ isOpen, onClose, onAdWatched }: AdModalProps) {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(AD_DURATION_SECONDS);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setProgress(0);
      setCountdown(AD_DURATION_SECONDS);
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
  }, [isOpen]);

  const handleAdWatched = () => {
    onAdWatched();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            onClick={handleAdWatched} 
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
