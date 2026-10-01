'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

type Role = 'student' | 'college' | 'admin';

interface AppContextValue {
  role: Role;
  setRole: (role: Role) => void;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  savedColleges: string[];
  toggleSave: (id: string) => void;
  savedOpen: boolean;
  setSavedOpen: (open: boolean) => void;
}

const MAX_COMPARE = 5;
const STORAGE_KEY = 'collegeiq:shortlist:v1';

// Demo defaults — the prototype ships with a pre-filled shortlist.
const DEFAULT_COMPARE = ['coep', 'vjti', 'manipal'];
const DEFAULT_SAVED = ['coep', 'vjti', 'bits-pilani'];

const AppContext = createContext<AppContextValue>({
  role: 'student',
  setRole: () => {},
  compareList: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  savedColleges: [],
  toggleSave: () => {},
  savedOpen: false,
  setSavedOpen: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('student');
  const [compareList, setCompareList] = useState<string[]>(DEFAULT_COMPARE);
  const [savedColleges, setSavedColleges] = useState<string[]>(DEFAULT_SAVED);
  const [savedOpen, setSavedOpen] = useState(false);
  const hydrated = useRef(false);

  // Restore the visitor's shortlist after mount so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { saved?: string[]; compare?: string[] };
        if (Array.isArray(parsed.saved)) setSavedColleges(parsed.saved);
        if (Array.isArray(parsed.compare)) setCompareList(parsed.compare.slice(0, MAX_COMPARE));
      }
    } catch {
      // Storage unavailable (private mode, blocked) — fall back to demo defaults.
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ saved: savedColleges, compare: compareList }));
    } catch {
      // Ignore write failures; state still works for this session.
    }
  }, [savedColleges, compareList]);

  function addToCompare(id: string) {
    setCompareList(prev => (prev.length < MAX_COMPARE && !prev.includes(id) ? [...prev, id] : prev));
  }

  function removeFromCompare(id: string) {
    setCompareList(prev => prev.filter(c => c !== id));
  }

  function toggleSave(id: string) {
    setSavedColleges(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]));
  }

  return (
    <AppContext.Provider
      value={{
        role, setRole,
        compareList, addToCompare, removeFromCompare,
        savedColleges, toggleSave,
        savedOpen, setSavedOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
