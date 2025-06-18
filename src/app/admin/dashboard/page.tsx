
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, BarChart3, Eye, SkipForward, DollarSign, TrendingUp, FilePlus2 } from 'lucide-react';
import { getAnalytics, getAllJobsForAdmin } from '@/lib/jobs';
import type { AdminAnalytics, Job } from '@/types';

const StatCard = ({ title, value, icon: Icon, description, colorClass = "text-primary" }: { title: string, value: string | number, icon: React.ElementType, description?: string, colorClass?: string }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${colorClass}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
      {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
    </CardContent>
  </Card>
);

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    setAnalytics(getAnalytics());
    setTotalJobs(getAllJobsForAdmin().length);
  }, []);

  if (!analytics) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3 text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/create-job">
            <FilePlus2 className="mr-2 h-5 w-5" /> Create New Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total Jobs Posted" value={totalJobs} icon={Briefcase} description="All active and inactive jobs" colorClass="text-blue-500" />
        <StatCard title="Total Applications" value={analytics.totalApplications} icon={Users} description="Across all jobs" colorClass="text-green-500" />
        <StatCard title="Ads Watched" value={analytics.adsWatched} icon={Eye} description="Simulated ad views" colorClass="text-indigo-500" />
        <StatCard title="Ads Skipped" value={analytics.adsSkipped} icon={SkipForward} description="Simulated ad skips" colorClass="text-orange-500" />
        
        <StatCard title="Total Visitors" value={analytics.totalVisitors.toLocaleString()} icon={BarChart3} description="Mock data" colorClass="text-purple-500" />
        <StatCard title="Ad Earnings" value={analytics.adEarnings} icon={DollarSign} description="Mock data" colorClass="text-teal-500" />
        <StatCard title="Site Growth" value={analytics.siteGrowth} icon={TrendingUp} description="Mock data" colorClass="text-pink-500" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>Manage your job portal efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/create-job">Manage Job Postings (View All)</Link>
          </Button>
          {/* Add more quick actions as needed */}
           <Button variant="outline" disabled className="w-full">View User Analytics (Coming Soon)</Button>
           <Button variant="outline" disabled className="w-full">Settings (Coming Soon)</Button>
        </CardContent>
      </Card>
      
      {/* Placeholder for future charts */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Application Trends (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
          <p className="text-muted-foreground">Chart data will be displayed here.</p>
        </CardContent>
      </Card>

    </div>
  );
}
