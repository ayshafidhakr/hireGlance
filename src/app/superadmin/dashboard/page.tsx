
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, BarChart3, Eye, SkipForward, DollarSign, TrendingUp, FilePlus2, UserPlus, Link2 } from 'lucide-react';
import { getAnalytics } from '@/lib/jobs';
import type { AdminAnalytics } from '@/types';
import { useToast } from '@/hooks/use-toast';

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

export default function SuperAdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setAnalytics(getAnalytics());
  }, []);

  const handleCopyAdminLink = () => {
    const url = `${window.location.origin}/admin/login`;
    try {
      navigator.clipboard.writeText(url);
      toast({
        title: "Administrator Link Copied!",
        description: "The link to the administrator login page has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link: ', err);
      toast({
        title: "Error Copying Link",
        description: "Could not copy the link.",
        variant: "destructive",
      });
    }
  };

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
        <h1 className="text-3xl font-bold text-accent">Super Admin Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total Jobs Posted" value={analytics.totalJobs} icon={Briefcase} description="All active and inactive jobs" colorClass="text-blue-500" />
        <StatCard title="Total Applications" value={analytics.totalApplications} icon={Users} description="Across all jobs" colorClass="text-green-500" />
        <StatCard title="Ad Promotion Requests" value={analytics.adPromotionRequests} icon={UserPlus} description="Mock data" colorClass="text-cyan-500" />
        <StatCard title="Total Site Visitors" value={analytics.totalVisitors.toLocaleString()} icon={BarChart3} description="Mock data" colorClass="text-purple-500" />
        
        <StatCard title="Ads Watched by Applicants" value={analytics.adsWatched} icon={Eye} description="Simulated ad views" colorClass="text-indigo-500" />
        <StatCard title="Ads Skipped by Applicants" value={analytics.adsSkipped} icon={SkipForward} description="Simulated ad skips" colorClass="text-orange-500" />
        <StatCard title="Ad Earnings" value={analytics.adEarnings} icon={DollarSign} description="Mock data" colorClass="text-teal-500" />
        <StatCard title="Site Growth" value={analytics.siteGrowth} icon={TrendingUp} description="Mock data" colorClass="text-pink-500" />
      </div>

      <Card className="shadow-lg bg-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">Administrator Access</CardTitle>
          <CardDescription>Share this link with your staff to allow them to post and manage jobs.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border rounded-lg bg-background">
                <div className="flex-grow">
                    <p className="font-mono text-sm break-all text-muted-foreground">/admin/login</p>
                </div>
                <Button onClick={handleCopyAdminLink} variant="outline" className="w-full sm:w-auto">
                    <Link2 className="mr-2 h-4 w-4"/> Copy Link
                </Button>
            </div>
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
