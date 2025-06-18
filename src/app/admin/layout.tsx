
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/AdminHeader';
// Toaster is already in RootLayout, so no need to import or render it here again.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If still loading auth state, do nothing yet.
    if (isLoading) {
      return;
    }
    // If not loading, not authenticated, and not on the login page, redirect to login.
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If authenticated and on the login page, redirect to dashboard.
    if (isAuthenticated && pathname === '/admin/login') {
      router.push('/admin/dashboard');
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

  // If not authenticated and on the login page, render children (the login page itself)
  // The RootLayout will provide the html, body, and main wrapping structure.
  if (!isAuthenticated && pathname === '/admin/login') {
    // The LoginPage component itself should handle its own layout (e.g., centering the form)
    // This will be rendered inside RootLayout's <main> tag.
    return <>{children}</>;
  }
  
  // If authenticated, render the admin header and children (protected content)
  // This will also be rendered inside RootLayout's <main> tag.
  if (isAuthenticated) {
    return (
      <div className="flex flex-col flex-1 min-h-full bg-secondary/20"> {/* Apply admin-specific background here if needed, taking full height within RootLayout's main */}
        <AdminHeader />
        <div className="flex-grow container mx-auto px-4 py-8"> {/* Match RootLayout's main padding or adjust as needed */}
          {children}
        </div>
      </div>
    );
  }

  // Fallback: If not loading, not authenticated, and not on login page (should be caught by redirect, but good to have)
  // This helps prevent rendering protected content if the redirect hasn't happened yet.
  return null; 
}
