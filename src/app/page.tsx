
import { getJobs } from '@/lib/jobs';
import { JobCard } from '@/components/JobCard';
import type { Job } from '@/types';

export default function HomePage() {
  const jobs: Job[] = getJobs();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">
        Advancing Healthcare Careers Across India - Find Your Calling!
      </h1>
      <p className="text-center text-lg text-foreground/80 max-w-2xl mx-auto">
        Explore exciting career opportunities in the healthcare sector across India. Find your next role with HireGlance. (For residents of India only)
      </p>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No job openings available at the moment. Please check back later.</p>
      )}
    </div>
  );
}

