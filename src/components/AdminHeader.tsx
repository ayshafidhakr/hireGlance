
'use client';

import Link from 'next/link';
import { LogOut, LayoutDashboard, FilePlus2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AdminHeader() {
  const { logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return null; // Don't show header if not authenticated (e.g., on login page)
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/create-job', label: 'Create Job', icon: FilePlus2 },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-headline font-bold">
          HireGlance Admin
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  "text-sm px-3 py-2 h-auto",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "hover:bg-primary-foreground/10 text-primary-foreground/90"
                )}
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <Button onClick={logout} variant="ghost" size="sm" className="text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground flex items-center gap-2">
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
