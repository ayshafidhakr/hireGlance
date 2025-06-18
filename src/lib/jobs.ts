
import type { Job } from '@/types';
import { parseISO, isPast } from 'date-fns';

const LOCAL_STORAGE_JOBS_KEY = 'hireglance_custom_jobs';

// Helper to get jobs from localStorage
const getLocalStorageJobs = (): Job[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const storedJobs = localStorage.getItem(LOCAL_STORAGE_JOBS_KEY);
  if (storedJobs) {
    try {
      const parsedJobs = JSON.parse(storedJobs) as Job[];
      // Dates from JSON need to be converted back to Date objects
      return parsedJobs.map(job => ({
        ...job,
        postedDate: parseISO(job.postedDate as unknown as string),
        expirationDate: job.expirationDate ? parseISO(job.expirationDate as unknown as string) : undefined,
      }));
    } catch (error) {
      console.error("Error parsing jobs from localStorage:", error);
      return [];
    }
  }
  return [];
};

// Helper to save jobs to localStorage
const saveLocalStorageJobs = (jobsToSave: Job[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_JOBS_KEY, JSON.stringify(jobsToSave));
};


const staticJobs: Job[] = [
  {
    id: '1',
    title: 'Registered Nurse (RN) - ICU',
    company: 'City General Hospital',
    location: 'Mumbai, MH',
    description: 'Seeking a dedicated Registered Nurse for our Intensive Care Unit. The ideal candidate will provide critical care to patients with life-threatening conditions.',
    responsibilities: [
      'Monitor patient vital signs and condition.',
      'Administer medications and treatments.',
      'Collaborate with multidisciplinary teams.',
      'Provide emotional support to patients and families.'
    ],
    qualifications: [
      'Valid RN license in India.',
      'Minimum 2 years of ICU experience.',
      'BLS and ACLS certification.',
      'Strong critical thinking and communication skills.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-15T09:00:00Z'),
    expirationDate: new Date('2024-08-30T23:59:59Z'),
    salaryRange: '₹8,00,000 - ₹12,00,000 per year',
    department: 'Intensive Care Unit'
  },
  {
    id: '2',
    title: 'Medical Laboratory Technician',
    company: 'Metro Health Labs',
    location: 'Bangalore, KA',
    description: 'Join our team as a Medical Laboratory Technician. You will be responsible for performing complex laboratory tests to aid in diagnosis and treatment.',
    responsibilities: [
      'Collect and prepare specimens.',
      'Perform laboratory tests and analyze results.',
      'Maintain laboratory equipment and quality control.',
      'Adhere to safety protocols and procedures.'
    ],
    qualifications: [
      'Associate\'s degree or Diploma in Medical Laboratory Technology or related field.',
      'Relevant certification or registration as per Indian standards.',
      'Proficiency with laboratory information systems.',
      'Attention to detail and accuracy.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-20T14:30:00Z'),
    expirationDate: new Date('2024-09-15T23:59:59Z'),
    salaryRange: '₹4,50,000 - ₹6,50,000 per year',
    department: 'Laboratory Services'
  },
  {
    id: '3',
    title: 'Physical Therapist (Expired)',
    company: 'Restore Motion Clinic',
    location: 'Delhi, DL',
    description: 'We are looking for a skilled Physical Therapist to help patients recover from injuries and improve their movement and function.',
    responsibilities: [
      'Develop and implement individualized treatment plans.',
      'Assess patient progress and modify treatments accordingly.',
      'Educate patients on injury prevention and home exercises.',
      'Maintain accurate patient records.'
    ],
    qualifications: [
      'Bachelor or Master of Physical Therapy (BPT/MPT) degree.',
      'Valid Physical Therapist license/registration in India.',
      'Experience with diverse patient populations.',
      'Excellent interpersonal skills.'
    ],
    employmentType: 'Part-time',
    postedDate: new Date('2024-06-10T11:00:00Z'),
    expirationDate: new Date('2024-07-01T23:59:59Z'), // Expired
    salaryRange: '₹400 - ₹600 per hour',
    department: 'Rehabilitation Services'
  },
  {
    id: '4',
    title: 'Surgical Technologist',
    company: 'Unity Medical Center',
    location: 'Chennai, TN',
    description: 'Exciting opportunity for a Surgical Technologist to assist in surgical procedures under the supervision of surgeons and registered nurses.',
    responsibilities: [
      'Prepare operating rooms for surgery.',
      'Sterilize equipment and ensure aseptic conditions.',
      'Pass instruments and supplies to surgeons during procedures.',
      'Maintain a sterile field.'
    ],
    qualifications: [
      'Completion of an accredited Surgical Technologist program or Diploma in Operation Theatre Technology.',
      'Relevant certification preferred.',
      'Knowledge of surgical procedures and sterile techniques.',
      'Ability to work in a fast-paced environment.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-22T08:00:00Z'),
    // No expiration date, so it's considered active indefinitely unless filtered otherwise
    department: 'Surgical Services'
  },
];

const getAllJobsCombined = (): Job[] => {
  const customJobs = getLocalStorageJobs();
  // Ensure no ID conflicts, custom jobs can override static ones if IDs match
  const staticJobIds = new Set(staticJobs.map(j => j.id));
  const uniqueCustomJobs = customJobs.filter(cj => !staticJobIds.has(cj.id));
  return [...staticJobs, ...uniqueCustomJobs];
};


export function getJobs(): Job[] {
  const allJobs = getAllJobsCombined();
  return allJobs
    .filter(job => !job.expirationDate || !isPast(job.expirationDate))
    .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
}

export function getAllJobsForAdmin(): Job[] {
  const allJobs = getAllJobsCombined();
  return allJobs.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
}

export function getJobById(id: string): Job | undefined {
  const allJobs = getAllJobsCombined();
  return allJobs.find(job => job.id === id);
}

export function addJob(jobData: Omit<Job, 'id' | 'postedDate'> & { expirationDate?: string }): Job {
  const customJobs = getLocalStorageJobs();
  const newJob: Job = {
    ...jobData,
    id: `custom-${Date.now().toString()}`,
    postedDate: new Date(),
    expirationDate: jobData.expirationDate ? new Date(jobData.expirationDate) : undefined,
  };
  saveLocalStorageJobs([...customJobs, newJob]);
  return newJob;
}

// Analytics helpers (mocked with localStorage)
const ANALYTICS_KEY = 'hireglance_analytics';

export const getAnalytics = (): import('@/types').AdminAnalytics => {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 'N/A',
      totalApplications: 0,
      adsWatched: 0,
      adsSkipped: 0,
      adEarnings: '₹0 (Mock)',
      siteGrowth: '+0% (Mock)',
    };
  }
  const stored = localStorage.getItem(ANALYTICS_KEY);
  const defaults = {
    totalVisitors: '1,234 (Mock)', // Placeholder
    totalApplications: 0,
    adsWatched: 0,
    adsSkipped: 0,
    adEarnings: '₹5,800 (Mock)', // Placeholder
    siteGrowth: '+5% MoM (Mock)', // Placeholder
  };
  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
};

export const updateAnalytics = (data: Partial<import('@/types').AdminAnalytics>) => {
  if (typeof window === 'undefined') return;
  const current = getAnalytics();
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify({ ...current, ...data }));
};

export const incrementApplicationCount = () => {
  if (typeof window === 'undefined') return;
  const current = getAnalytics();
  updateAnalytics({ totalApplications: (current.totalApplications || 0) + 1 });
};

export const incrementAdsWatched = () => {
  if (typeof window === 'undefined') return;
  const current = getAnalytics();
  updateAnalytics({ adsWatched: (current.adsWatched || 0) + 1 });
};

export const incrementAdsSkipped = () => {
  if (typeof window === 'undefined') return;
  const current = getAnalytics();
  updateAnalytics({ adsSkipped: (current.adsSkipped || 0) + 1 });
};
