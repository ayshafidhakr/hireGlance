
'use client';

import { useState } from 'react';
import { useSuperAuth } from '@/hooks/useSuperAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function SuperAdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useSuperAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 bg-secondary/30">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <ShieldCheck className="h-16 w-16 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold text-accent">Super Admin Login</CardTitle>
          <CardDescription>Access the HireGlance site analytics panel.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="superadmin"
                required
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="superpassword"
                required
                className="text-base"
              />
            </div>
            <CardDescription className="text-xs text-center text-muted-foreground pt-2">
                Hint: Use <strong>superadmin</strong> / <strong>superpassword</strong> for this demo.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
