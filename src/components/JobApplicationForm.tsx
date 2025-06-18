
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const applicationFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  qualificationDetails: z.string().min(5, { message: 'Qualification details must be at least 5 characters.' }),
  collegeDetails: z.string().min(3, { message: 'College/University name must be at least 3 characters.' }),
  coverLetter: z.string().min(10, { message: 'Cover letter must be at least 10 characters.' }).optional(),
  resume: z.custom<File>(
    (val) => typeof File !== 'undefined' && val instanceof File,
    { message: "Resume is required. Please upload a file." }
  ).refine(
    (file) => file && file.size > 0,
    { message: "Resume file cannot be empty." }
  ).refine(
    (file) => file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    { message: "Accepted file types are PDF, DOC, or DOCX."}
  ),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface JobApplicationFormProps {
  jobTitle: string;
  onSubmitSuccess: () => void;
}

export function JobApplicationForm({ jobTitle, onSubmitSuccess }: JobApplicationFormProps) {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      qualificationDetails: '',
      collegeDetails: '',
      coverLetter: '',
      // resume: undefined, // react-hook-form handles undefined as default
    },
  });

  function onSubmit(data: ApplicationFormValues) {
    console.log('Application submitted:', data);
    // Simulate submission
    onSubmitSuccess();
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Apply for: {jobTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dr. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualificationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. MBBS, MD (Cardiology)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collegeDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College/University Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. All India Institute of Medical Sciences" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself and why you're a good fit..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                      className="file:text-primary file:font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
