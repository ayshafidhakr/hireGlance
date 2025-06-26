
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdModal } from '@/components/AdModal';
import { JobApplicationForm } from '@/components/JobApplicationForm';
import { getJobById } from '@/lib/jobs';
import type { Job } from '@/types';
import { format, isPast } from 'date-fns';
import { Briefcase, MapPin, CalendarDays, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [hasAdBeenWatched, setHasAdBeenWatched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchedJob = getJobById(params.id);
    setJob(fetchedJob);
  }, [params.id]);

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

  const handleApplicationSuccess = () => {
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <Card className="text-center py-10 max-w-2xl mx-auto shadow-lg">
        <CardContent className="flex flex-col items-center">
            <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-primary mb-2">Application Submitted!</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
            Thank you for applying for the {job.title} position. We have received your application and will be in touch if you are a good fit.
            </p>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Job Listings
                </Link>
            </Button>
        </CardContent>
      </Card>
    );
  }

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
        </Card>

        {hasAdBeenWatched && !isJobExpired && (
            <JobApplicationForm 
                jobTitle={job.title}
                onSubmitSuccess={handleApplicationSuccess}
            />
        )}

      </div>
    </>
  );
}
