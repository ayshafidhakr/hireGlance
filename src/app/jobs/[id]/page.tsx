'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getJobById } from '@/lib/jobs';
import type { Job } from '@/types';
import { AdModal } from '@/components/AdModal';
import { JobApplicationForm } from '@/components/JobApplicationForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowLeft, Briefcase, CalendarCheck2, CheckCircle2, DollarSign, ListChecks, MapPin, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = typeof params?.id === 'string' ? params.id : '';
  
  const [job, setJob] = useState<Job | null | undefined>(undefined); // undefined for loading, null for not found
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    if (jobId) {
      const foundJob = getJobById(jobId);
      setJob(foundJob); // Will be undefined if not found, then updated to null if truly not found
      if (!foundJob) {
        setJob(null); // Explicitly set to null if not found after check
      }
    }
  }, [jobId]);

  const handleApplyClick = () => {
    setIsAdModalOpen(true);
  };

  const handleAdWatched = () => {
    setShowApplicationForm(true);
  };

  const handleApplicationSubmitSuccess = () => {
    setShowApplicationForm(false);
    setApplicationSubmitted(true);
  };

  if (job === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg text-muted-foreground">Loading job details...</p>
      </div>
    );
  }

  if (job === null) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Job Not Found</h1>
        <p className="text-muted-foreground mb-6">The job you are looking for does not exist or may have been removed.</p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Listings
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
        </Link>
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
            <CardTitle className="text-3xl font-headline text-primary">{job.title}</CardTitle>
            <Badge variant="secondary" className="text-sm py-1 px-3 self-start sm:self-center">{job.employmentType}</Badge>
          </div>
          <CardDescription className="space-y-1 text-base">
            <div className="flex items-center gap-2 text-foreground/80">
              <Briefcase size={18} /> <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin size={18} /> <span>{job.location}</span>
            </div>
            {job.department && (
              <div className="flex items-center gap-2 text-foreground/80">
                <CalendarCheck2 size={18} /> <span>Department: {job.department}</span>
              </div>
            )}
            {job.salaryRange && (
               <div className="flex items-center gap-2 text-foreground/80">
                <DollarSign size={18} /> <span>{job.salaryRange}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-foreground/90">Job Description</h3>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground/90 flex items-center gap-2">
                <ListChecks size={22} /> Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {job.qualifications && job.qualifications.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground/90 flex items-center gap-2">
                <UserCheck size={22} /> Qualifications
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                {job.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground mt-4">
            Posted on: {format(job.postedDate, 'MMMM d, yyyy')}
          </p>

          {!showApplicationForm && !applicationSubmitted && (
            <Button onClick={handleApplyClick} size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              Apply for this Job
            </Button>
          )}
        </CardContent>
      </Card>

      {applicationSubmitted && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-md">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-3" />
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Application Submitted!</h2>
          <p className="text-green-600">Thank you for applying for the {job.title} position. We will review your application and be in touch if you are shortlisted.</p>
        </div>
      )}

      {showApplicationForm && !applicationSubmitted && (
        <div className="mt-8">
          <JobApplicationForm jobTitle={job.title} onSubmitSuccess={handleApplicationSubmitSuccess} />
        </div>
      )}

      <AdModal 
        isOpen={isAdModalOpen} 
        onClose={() => setIsAdModalOpen(false)} 
        onAdWatched={handleAdWatched} 
      />
    </div>
  );
}
