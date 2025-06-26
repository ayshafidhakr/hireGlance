
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function DisabledJobDetailPage() {
    return (
        <div className="text-center py-10">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold text-destructive mb-2">Page Not Available</h1>
            <p className="text-muted-foreground mb-6">This part of the application is currently disabled.</p>
            <Button asChild variant="outline">
            <Link href="/superadmin/login">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go to Admin Portal
            </Link>
            </Button>
        </div>
    );
}
