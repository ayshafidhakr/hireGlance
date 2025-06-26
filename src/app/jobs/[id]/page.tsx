
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdModal } from '@/components/AdModal';
import { getJobById, incrementApplicationCount } from '@/lib/jobs';
import type { Job } from '@/types';
import { format, isPast } from 'date-fns';
import { Briefcase, MapPin, CalendarDays, CheckCircle, AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [hasAdBeenWatched, setHasAdBeenWatched] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { id } = params;
    const fetchedJob = getJobById(id);
    setJob(fetchedJob);
  }, [params]);

  if (job === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (job === null) {
    notFound();
    return null;
  }
  
  const isJobExpired = job.expirationDate && isPast(job.expirationDate);

  const handleApplyClick = () => {
    setIsAdModalOpen(true);
  };
  
  const handleAdWatched = () => {
    setHasAdBeenWatched(true);
  };
  
  const handleProceedToApplication = () => {
    if (job?.applicationUrl) {
        incrementApplicationCount();
        window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
        toast({
            title: "Redirecting you...",
            description: "Opening the company's application page in a new tab.",
        });
    } else {
        toast({
            title: "Application Link Missing",
            description: "We're sorry, the application link for this job is not available.",
            variant: "destructive",
        });
    }
  };

  return (
    <>
      <AdModal 
        isOpen={isAdModalOpen} 
        onClose={() => setIsAdModalOpen(false)}
        onAdWatched={handleAdWatched}
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-xl overflow-hidden">
          <CardHeader className="bg-secondary/30 p-6">
             <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <CardTitle className="text-3xl md:text-4xl font-headline text-primary mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">{job.company}</CardDescription>
                </div>
                <Badge variant={job.employmentType === 'Full-time' ? 'default' : 'secondary'} className="capitalize text-md py-1 px-3">
                  {job.employmentType}
                </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin size={16} /> <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays size={16} /> <span>Posted on {format(job.postedDate, 'MMMM d, yyyy')}</span>
                </div>
            </div>
             {isJobExpired && (
                <div className="mt-4 flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
                    <AlertTriangle size={20} />
                    <span className="font-semibold">This job posting has expired.</span>
                </div>
            )}
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Job Description</h3>
              <p className="text-foreground/80 leading-relaxed">{job.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
                {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Qualifications</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
                {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </CardContent>
          {!hasAdBeenWatched && !isJobExpired && (
             <CardFooter className="p-6 bg-secondary/20">
                <Button onClick={handleApplyClick} className="w-full sm:w-auto text-lg py-6 px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                    Apply Now
                </Button>
             </CardFooter>
          )}

          {hasAdBeenWatched && !isJobExpired && (
            <CardFooter className="p-6 bg-secondary/20 flex-col items-start gap-4">
                <Button 
                    onClick={handleProceedToApplication} 
                    className="w-full sm:w-auto text-lg py-6 px-8 bg-primary hover:bg-primary/90"
                    disabled={!job.applicationUrl}
                >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Proceed to Application
                </Button>
                <p className="text-xs text-muted-foreground">
                    You will be redirected to the company's official website to complete your application.
                </p>
                {!job.applicationUrl && (
                    <p className="text-sm text-destructive font-medium mt-2">
                        This job posting does not have an external application link.
                    </p>
                )}
            </CardFooter>
          )}

        </Card>
      </div>
    </>
  );
}
