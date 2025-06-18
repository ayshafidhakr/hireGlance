
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/AdminHeader';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg text-muted-foreground">Loading Admin Area...</p>
      </div>
    );
  }

  // Allow login page to render without full layout if not authenticated
  if (!isAuthenticated && pathname === '/admin/login') {
    return (
        <html lang="en">
            <body className="font-body antialiased flex flex-col min-h-screen bg-background">
                <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                    {children}
                </main>
                <Toaster />
            </body>
        </html>
    );
  }
  
  if (!isAuthenticated && pathname !== '/admin/login') {
    // This case should ideally be caught by the useEffect redirect,
    // but as a fallback, don't render children if not auth and not on login page.
    return null; 
  }

  return (
    <html lang="en">
        <head>
            <title>HireGlance Admin</title>
        </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-secondary/20">
        <AdminHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
