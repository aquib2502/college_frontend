'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'student' | 'college' | 'admin';

interface AppContextValue {
  role: Role;
  setRole: (role: Role) => void;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  savedColleges: string[];
  toggleSave: (id: string) => void;
}

const AppContext = createContext<AppContextValue>({
  role: 'student',
  setRole: () => {},
  compareList: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  savedColleges: [],
  toggleSave: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('student');
  const [compareList, setCompareList] = useState<string[]>(['coep', 'vjti', 'manipal']);
  const [savedColleges, setSavedColleges] = useState<string[]>(['coep', 'vjti', 'bits-pilani']);

  function addToCompare(id: string) {
    if (compareList.length < 5 && !compareList.includes(id)) {
      setCompareList(prev => [...prev, id]);
    }
  }

  function removeFromCompare(id: string) {
    setCompareList(prev => prev.filter(c => c !== id));
  }

  function toggleSave(id: string) {
    setSavedColleges(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }

  return (
    <AppContext.Provider value={{ role, setRole, compareList, addToCompare, removeFromCompare, savedColleges, toggleSave }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
