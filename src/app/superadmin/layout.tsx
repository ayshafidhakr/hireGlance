
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSuperAuth, SuperAuthProvider } from '@/hooks/useSuperAuth';
import { SuperAdminHeader } from '@/components/SuperAdminHeader';

// This component contains the logic for protecting super admin routes
function ProtectedSuperAdminContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useSuperAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return; 
    }
    if (!isAuthenticated && pathname !== '/superadmin/login') {
      router.push('/superadmin/login');
    }
    if (isAuthenticated && pathname === '/superadmin/login') {
      router.push('/superadmin/dashboard');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading || (!isAuthenticated && pathname !== '/superadmin/login') || (isAuthenticated && pathname === '/superadmin/login')) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
        <p className="ml-4 text-lg text-muted-foreground">Loading Super Admin Area...</p>
      </div>
    );
  }

  // If not authenticated and on the login page, render the login form without the header
  if (!isAuthenticated && pathname === '/superadmin/login') {
    return <>{children}</>;
  }
  
  // If authenticated, render the full admin layout with header
  if (isAuthenticated) {
    return (
      <div className="flex flex-col flex-1 min-h-full bg-secondary/20">
        <SuperAdminHeader />
        <div className="flex-grow container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    );
  }

  return null; 
}

// The main SuperAdminLayout wraps everything in the SuperAuthProvider
export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAuthProvider>
      <ProtectedSuperAdminContent>{children}</ProtectedSuperAdminContent>
    </SuperAuthProvider>
  );
}
