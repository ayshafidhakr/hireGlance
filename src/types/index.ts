
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  postedDate: Date;
  expirationDate?: Date; // Added expiration date
  salaryRange?: string;
  department?: string;
  applicationUrl?: string;
}

export interface AdminAnalytics {
  totalJobs: number;
  totalVisitors: number | string; // Can be string for placeholder like "N/A"
  totalApplications: number;
  adsWatched: number;
  adsSkipped: number;
  adEarnings: string; // Placeholder
  siteGrowth: string; // Placeholder
  adPromotionRequests: number;
}
