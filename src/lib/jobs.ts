import type { Job } from '@/types';

const jobs: Job[] = [
  {
    id: '1',
    title: 'Registered Nurse (RN) - ICU',
    company: 'City General Hospital',
    location: 'New York, NY',
    description: 'Seeking a dedicated Registered Nurse for our Intensive Care Unit. The ideal candidate will provide critical care to patients with life-threatening conditions.',
    responsibilities: [
      'Monitor patient vital signs and condition.',
      'Administer medications and treatments.',
      'Collaborate with multidisciplinary teams.',
      'Provide emotional support to patients and families.'
    ],
    qualifications: [
      'Valid RN license in New York.',
      'Minimum 2 years of ICU experience.',
      'BLS and ACLS certification.',
      'Strong critical thinking and communication skills.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-15T09:00:00Z'),
    salaryRange: '$85,000 - $105,000 per year',
    department: 'Intensive Care Unit'
  },
  {
    id: '2',
    title: 'Medical Laboratory Technician',
    company: 'Metro Health Labs',
    location: 'Chicago, IL',
    description: 'Join our team as a Medical Laboratory Technician. You will be responsible for performing complex laboratory tests to aid in diagnosis and treatment.',
    responsibilities: [
      'Collect and prepare specimens.',
      'Perform laboratory tests and analyze results.',
      'Maintain laboratory equipment and quality control.',
      'Adhere to safety protocols and procedures.'
    ],
    qualifications: [
      'Associate\'s degree in Medical Laboratory Technology or related field.',
      'ASCP certification or equivalent.',
      'Proficiency with laboratory information systems.',
      'Attention to detail and accuracy.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-20T14:30:00Z'),
    salaryRange: '$55,000 - $70,000 per year',
    department: 'Laboratory Services'
  },
  {
    id: '3',
    title: 'Physical Therapist',
    company: 'Restore Motion Clinic',
    location: 'San Francisco, CA',
    description: 'We are looking for a skilled Physical Therapist to help patients recover from injuries and improve their movement and function.',
    responsibilities: [
      'Develop and implement individualized treatment plans.',
      'Assess patient progress and modify treatments accordingly.',
      'Educate patients on injury prevention and home exercises.',
      'Maintain accurate patient records.'
    ],
    qualifications: [
      'Doctor of Physical Therapy (DPT) degree.',
      'Valid Physical Therapist license in California.',
      'Experience with diverse patient populations.',
      'Excellent interpersonal skills.'
    ],
    employmentType: 'Part-time',
    postedDate: new Date('2024-07-10T11:00:00Z'),
    salaryRange: '$45 - $60 per hour',
    department: 'Rehabilitation Services'
  },
  {
    id: '4',
    title: 'Surgical Technologist',
    company: 'Unity Medical Center',
    location: 'Austin, TX',
    description: 'Exciting opportunity for a Surgical Technologist to assist in surgical procedures under the supervision of surgeons and registered nurses.',
    responsibilities: [
      'Prepare operating rooms for surgery.',
      'Sterilize equipment and ensure aseptic conditions.',
      'Pass instruments and supplies to surgeons during procedures.',
      'Maintain a sterile field.'
    ],
    qualifications: [
      'Completion of an accredited Surgical Technologist program.',
      'CST certification preferred.',
      'Knowledge of surgical procedures and sterile techniques.',
      'Ability to work in a fast-paced environment.'
    ],
    employmentType: 'Full-time',
    postedDate: new Date('2024-07-22T08:00:00Z'),
    department: 'Surgical Services'
  },
];

export function getJobs(): Job[] {
  return jobs.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
}

export function getJobById(id: string): Job | undefined {
  return jobs.find(job => job.id === id);
}
