
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, FilePlus2, Eye, Share2, AlertCircle } from 'lucide-react';
import { getAllJobsForAdmin } from '@/lib/jobs';
import type { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format, isPast } from 'date-fns';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setJobs(getAllJobsForAdmin());
  }, []);
  
  const handleShare = async (jobId: string) => {
    const url = `${window.location.origin}/jobs/${jobId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Job link copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link: ', err);
      toast({
        title: "Error Copying Link",
        description: "Could not copy the job link to your clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Administrator Dashboard</h1>
          <p className="text-muted-foreground">Manage job postings for HireGlance.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/create-job">
            <FilePlus2 className="mr-2 h-5 w-5" /> Create New Job
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Job Postings ({jobs.length})</CardTitle>
          </div>
          <CardDescription>View, manage, and share all job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => {
                const isJobExpired = job.expirationDate && isPast(job.expirationDate);
                return (
                  <Card key={job.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-primary">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Posted: {format(job.postedDate, 'MMMM d, yyyy')}
                      </p>
                      {isJobExpired && (
                        <div className="flex items-center gap-2 text-destructive mt-1 text-sm font-medium">
                          <AlertCircle size={16} />
                          <span>Expired on {format(job.expirationDate!, 'MMMM d, yyyy')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/jobs/${job.id}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Link>
                      </Button>
                       <Button variant="outline" size="sm" onClick={() => handleShare(job.id)}>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No jobs have been posted yet.</p>
          )}
        </CardContent>
      </Card>
      
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>Other management tools.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" disabled className="w-full">Post a Promotional Ad (Coming Soon)</Button>
          <Button variant="outline" disabled className="w-full">Manage Profile (Coming Soon)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
