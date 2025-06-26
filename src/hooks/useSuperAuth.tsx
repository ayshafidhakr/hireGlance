
'use client';

import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';

const AUTH_KEY = 'hireglance_superadmin_auth';

interface SuperAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const SuperAuthContext = createContext<SuperAuthContextType | undefined>(undefined);

export function SuperAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On initial load, check the auth status from localStorage
    const authStatus = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    // Hardcoded credentials for the Super Admin
    if (username === 'superadmin' && password === 'superpassword') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = { isAuthenticated, isLoading, login, logout };

  return (
    <SuperAuthContext.Provider value={value}>
      {children}
    </SuperAuthContext.Provider>
  );
}

export function useSuperAuth() {
  const context = useContext(SuperAuthContext);
  if (context === undefined) {
    throw new Error('useSuperAuth must be used within a SuperAuthProvider');
  }
  return context;
}
