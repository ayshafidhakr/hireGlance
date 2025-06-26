
import Link from 'next/link';
import type { Job } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, CalendarDays, IndianRupee, HeartPulse, Stethoscope } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

const departmentIcons: Record<string, React.ElementType> = {
  'Intensive Care Unit': HeartPulse,
  'Laboratory Services': Stethoscope,
  'Rehabilitation Services': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-person-standing"><path d="M12 5c.66 0 1.17.24 1.63.7C14.09 6.17 14.33 6.8 14.33 7.5c0 .66-.24 1.17-.7 1.63-.47.46-1.1.7-1.76.7-.66 0-1.17-.24-1.63-.7C9.78 8.67 9.54 8.03 9.54 7.37c0-.66.24-1.17.7-1.63.47-.46 1.1-.7 1.76-.7Z"/><path d="m17.5 9.5-2-1-2 3-2-3-2 1L8.5 17l1.5 4.5h2l1-3 1 3h2L15.5 17Z"/></svg>, // custom person standing icon
  'Surgical Services': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-syringe"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 4"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/></svg>, // custom syringe icon
};


export function JobCard({ job }: JobCardProps) {
  const timeSincePosted = formatDistanceToNow(job.postedDate, { addSuffix: true });
  const DepartmentIcon = job.department ? departmentIcons[job.department] || Briefcase : Briefcase;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-headline mb-1 text-primary">{job.title}</CardTitle>
          <DepartmentIcon className="text-primary opacity-70" size={28} aria-hidden="true" />
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={16} /> {job.company}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {job.location}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm leading-relaxed mb-3 line-clamp-3">{job.description}</p>
        <div className="text-xs text-muted-foreground space-y-1">
          {job.salaryRange && (
            <div className="flex items-center gap-1">
              <IndianRupee size={14} /> <span>{job.salaryRange}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <CalendarDays size={14} /> <span>Posted {timeSincePosted}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/jobs/${job.id}`}>View Details & Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
