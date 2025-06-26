
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker'; // Ensure this path is correct
import { useToast } from '@/hooks/use-toast';
import { addJob } from '@/lib/jobs'; // Function to add job to localStorage
import type { Job } from '@/types';
import { FilePlus2, ListChecks, UserCheck, Briefcase, MapPinIcon, IndianRupee, CalendarDays, CalendarClock } from 'lucide-react';

const jobFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  responsibilities: z.string().min(10, { message: 'Responsibilities must be at least 10 characters (enter one per line).' }),
  qualifications: z.string().min(10, { message: 'Qualifications must be at least 10 characters (enter one per line).' }),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary']),
  salaryRange: z.string().optional(),
  department: z.string().optional(),
  expirationDate: z.date().optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

export default function CreateJobPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      responsibilities: '',
      qualifications: '',
      employmentType: 'Full-time',
      salaryRange: '',
      department: '',
      expirationDate: undefined,
    },
  });

  function onSubmit(data: JobFormValues) {
    try {
      const jobDataToSave = {
        ...data,
        responsibilities: data.responsibilities.split('\n').map(s => s.trim()).filter(s => s),
        qualifications: data.qualifications.split('\n').map(s => s.trim()).filter(s => s),
        // Convert date to ISO string for localStorage, addJob will handle Date object creation
        expirationDate: data.expirationDate ? data.expirationDate.toISOString() : undefined,
      };
      
      addJob(jobDataToSave as Omit<Job, 'id' | 'postedDate'> & { expirationDate?: string });

      toast({
        title: 'Job Created Successfully!',
        description: `The job "${data.title}" has been posted.`,
      });
      form.reset();
      router.push('/admin/dashboard'); // Or a page showing all jobs
    } catch (error) {
      console.error("Failed to create job:", error);
      toast({
        title: 'Error Creating Job',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const fieldIconWrapper = (Icon: React.ElementType, children: React.ReactNode) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground">
        <Icon size={18} />
      </div>
      <div className="pl-10">
        {children}
      </div>
    </div>
  );
  
  const textareaFieldIconWrapper = (Icon: React.ElementType, children: React.ReactNode) => (
    <div className="relative">
      <div className="absolute left-3 top-5 transform text-muted-foreground">
        <Icon size={18} />
      </div>
      <div className="pl-10">
        {children}
      </div>
    </div>
  );


  return (
    <Card className="max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
            <FilePlus2 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">Create New Job Posting</CardTitle>
        </div>
        <CardDescription>Fill in the details below to post a new job opening. This will be stored in localStorage for the demo.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    {fieldIconWrapper(Briefcase, <FormControl><Input placeholder="e.g., Registered Nurse" {...field} /></FormControl>)}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                     {fieldIconWrapper(Briefcase, <FormControl><Input placeholder="e.g., City General Hospital" {...field} /></FormControl>)}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                   {fieldIconWrapper(MapPinIcon, <FormControl><Input placeholder="e.g., Mumbai, MH" {...field} /></FormControl>)}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                   {textareaFieldIconWrapper(ListChecks, 
                    <FormControl>
                      <Textarea placeholder="Detailed description of the job role..." rows={5} {...field} />
                    </FormControl>
                   )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  {textareaFieldIconWrapper(ListChecks, 
                    <FormControl>
                      <Textarea placeholder="Enter each responsibility on a new line..." rows={5} {...field} />
                    </FormControl>
                  )}
                  <FormDescription>Enter each responsibility on a new line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                   {textareaFieldIconWrapper(UserCheck, 
                    <FormControl>
                      <Textarea placeholder="Enter each qualification on a new line..." rows={5} {...field} />
                    </FormControl>
                   )}
                  <FormDescription>Enter each qualification on a new line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                     {fieldIconWrapper(CalendarDays,
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                     )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1.5">Expiration Date (Optional)</FormLabel>
                     {fieldIconWrapper(CalendarClock,
                        <DatePicker 
                            date={field.value} 
                            setDate={field.onChange}
                            placeholder="Set an expiration date"
                        />
                     )}
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="salaryRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range (Optional)</FormLabel>
                       {fieldIconWrapper(IndianRupee, <FormControl><Input placeholder="e.g., ₹5,00,000 - ₹7,00,000 per year" {...field} /></FormControl>)}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department (Optional)</FormLabel>
                      {fieldIconWrapper(Briefcase, <FormControl><Input placeholder="e.g., Cardiology" {...field} /></FormControl>)}
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 mt-8">
              <FilePlus2 className="mr-2 h-5 w-5" /> Post Job
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
