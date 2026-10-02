'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { createLocalStore, useLocalStore } from '@/lib/localStore';

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

const isIdList = (v: unknown): v is string[] => Array.isArray(v) && v.every(x => typeof x === 'string');

const shortlistStore = createLocalStore<{ saved: string[]; compare: string[] }>(
  STORAGE_KEY,
  { saved: DEFAULT_SAVED, compare: DEFAULT_COMPARE },
  v => {
    const o = v as { saved?: unknown; compare?: unknown } | null;
    if (!o || !isIdList(o.saved) || !isIdList(o.compare)) return undefined;
    return { saved: o.saved, compare: o.compare.slice(0, MAX_COMPARE) };
  },
);

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
  const [savedOpen, setSavedOpen] = useState(false);
  // Shortlist persists in this browser; prerendered markup uses the demo defaults.
  const { saved: savedColleges, compare: compareList } = useLocalStore(shortlistStore);

  function addToCompare(id: string) {
    shortlistStore.set(s =>
      s.compare.length < MAX_COMPARE && !s.compare.includes(id) ? { ...s, compare: [...s.compare, id] } : s,
    );
  }

  function removeFromCompare(id: string) {
    shortlistStore.set(s => ({ ...s, compare: s.compare.filter(c => c !== id) }));
  }

  function toggleSave(id: string) {
    shortlistStore.set(s => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter(c => c !== id) : [...s.saved, id] }));
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
