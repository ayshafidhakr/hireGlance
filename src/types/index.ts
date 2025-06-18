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
  salaryRange?: string;
  department?: string;
}
