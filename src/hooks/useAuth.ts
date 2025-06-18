
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AUTH_KEY = 'hireglance_admin_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem(AUTH_KEY);
      setIsAuthenticated(authStatus === 'true');
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    // Hardcoded credentials for prototype
    if (username === 'admin' && password === 'password') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      router.push('/admin/dashboard');
      return true;
    }
    return false;
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    router.push('/admin/login');
  }, [router]);

  return { isAuthenticated, isLoading, login, logout };
}
