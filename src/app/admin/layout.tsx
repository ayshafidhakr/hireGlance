
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, AuthProvider } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/AdminHeader';

// This component contains the logic for protecting admin routes
// and rendering the correct layout based on authentication state.
function ProtectedAdminContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return; // Wait until authentication status is loaded
    }
    // If not authenticated and not on the login page, redirect to login
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If authenticated and on the login page, redirect to the dashboard
    if (isAuthenticated && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show a loading spinner while checking auth or redirecting
  if (isLoading || (!isAuthenticated && pathname !== '/admin/login') || (isAuthenticated && pathname === '/admin/login')) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg text-muted-foreground">Loading Admin Area...</p>
      </div>
    );
  }

  // If not authenticated and on the login page, render the login form
  if (!isAuthenticated && pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // If authenticated, render the full admin layout with header
  if (isAuthenticated) {
    return (
      <div className="flex flex-col flex-1 min-h-full bg-secondary/20">
        <AdminHeader />
        <div className="flex-grow container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    );
  }

  // Fallback, should not ideally be reached
  return null; 
}

// The main AdminLayout wraps everything in the AuthProvider
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedAdminContent>{children}</ProtectedAdminContent>
    </AuthProvider>
  );
}
