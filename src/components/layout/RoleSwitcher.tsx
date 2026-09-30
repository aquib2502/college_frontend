'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Building2, Shield, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ROLES = [
  {
    id: 'student' as const,
    label: 'Student',
    subtitle: 'Discover colleges, compare, and get AI recommendations',
    icon: GraduationCap,
    href: '/student/dashboard',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  {
    id: 'college' as const,
    label: 'College Admin',
    subtitle: 'Manage your college profile, analytics and leads',
    icon: Building2,
    href: '/college/dashboard',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  {
    id: 'admin' as const,
    label: 'Super Admin',
    subtitle: 'Platform-wide management, verification, and AI insights',
    icon: Shield,
    href: '/admin/dashboard',
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
  },
];

export default function RoleSwitcher({ open, onClose }: Props) {
  const router = useRouter();
  const { role, setRole } = useApp();

  function handleSelect(r: typeof ROLES[0]) {
    setRole(r.id);
    onClose();
    router.push(r.href);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-20 right-4 sm:right-6 z-[90] bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Demo Mode</p>
                <h3 className="font-semibold text-slate-900 text-sm mt-0.5">View as...</h3>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-3 flex flex-col gap-2">
              {ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    role === r.id
                      ? `${r.bg} ${r.border} border`
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center shrink-0`}>
                    <r.icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${role === r.id ? r.text : 'text-slate-800'}`}>
                      {r.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-tight">{r.subtitle}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 shrink-0" />
                </button>
              ))}
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 text-center">
                This is a demo prototype — no real login required
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
