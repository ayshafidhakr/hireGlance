
'use client';

import Link from 'next/link';
import { LogOut, ShieldCheck } from 'lucide-react';
import { useSuperAuth } from '@/hooks/useSuperAuth';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SuperAdminHeader() {
  const { logout, isAuthenticated } = useSuperAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-accent text-accent-foreground shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/superadmin/dashboard" className="flex items-center gap-2 text-xl font-headline font-bold">
           <ShieldCheck size={28} />
          HireGlance Super Admin
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button
            asChild
            variant='ghost'
            className={cn(
                "text-sm px-3 py-2 h-auto hover:bg-accent-foreground/10"
            )}
          >
            <Link href="/superadmin/dashboard" className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>
          <Button onClick={logout} variant="ghost" size="sm" className="hover:bg-accent-foreground/10 flex items-center gap-2">
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
