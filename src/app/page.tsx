
'use client';

import { useEffect, useState, useMemo } from 'react';
import { getJobs } from '@/lib/jobs';
import type { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import { AdBillboard } from '@/components/AdBillboard';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch jobs on the client side since they rely on localStorage
    setJobs(getJobs());
  }, []);
  
  const content = useMemo(() => {
    const items: React.ReactNode[] = [];
    const AD_INTERVAL = 4; // Show an ad every 4 job cards

    jobs.forEach((job, index) => {
      items.push(<JobCard key={job.id} job={job} />);
      // Add an ad billboard after every AD_INTERVAL jobs
      if ((index + 1) > 0 && (index + 1) % AD_INTERVAL === 0) {
        items.push(<AdBillboard key={`ad-${index}`} />);
      }
    });
    return items;
  }, [jobs]);


  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Advancing Healthcare Careers Across India - Find Your Calling!
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Browse through curated job openings from top hospitals and clinics. Your next career move is just a click away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          content
        ) : (
          // Placeholder for loading state or if no jobs are available
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-6 border rounded-lg bg-card">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/5"></div>
            </div>
          ))
        )}
      </div>
       {jobs.length === 0 && (
         <p className="text-center text-muted-foreground col-span-full">No active job openings at the moment. Please check back later.</p>
      )}
    </div>
  );
}
