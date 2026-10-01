'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface Props {
  collegeId: string;
  collegeName: string;
  variant?: 'icon' | 'labelled';
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Bookmark toggle with a fill animation and a small inline confirmation.
 * No modal — the shortlist drawer in the navbar is the follow-up action.
 */
export default function SaveButton({ collegeId, collegeName, variant = 'icon', tone = 'light', className }: Props) {
  const { savedColleges, toggleSave } = useApp();
  const reduce = useReducedMotion();
  const saved = savedColleges.includes(collegeId);
  const [flash, setFlash] = useState<null | 'saved' | 'removed'>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(collegeId);
    setFlash(saved ? 'removed' : 'saved');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(null), 1600);
  }

  const dark = tone === 'dark';

  return (
    <span className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${collegeName} from shortlist` : `Save ${collegeName} to shortlist`}
        className={cn(
          'group/save inline-flex items-center gap-1.5 rounded-lg border transition-[background-color,border-color,color] duration-150 cursor-pointer',
          variant === 'icon' ? 'w-9 h-9 justify-center' : 'h-9 px-3 text-xs font-medium',
          dark
            ? saved
              ? 'bg-white text-ink border-white'
              : 'border-white/20 text-white/80 hover:border-white/50 hover:text-white'
            : saved
              ? 'bg-ink text-paper border-ink'
              : 'bg-surface border-line text-ink-2 hover:border-ink-2 hover:text-ink',
        )}
      >
        <motion.span
          key={saved ? 'on' : 'off'}
          initial={reduce ? false : { scale: saved ? 0.6 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 520, damping: 18 }}
          className="inline-flex"
        >
          <Bookmark size={15} strokeWidth={1.8} className={saved ? 'fill-current' : ''} />
        </motion.span>
        {variant === 'labelled' && <span>{saved ? 'Saved' : 'Save'}</span>}
      </button>

      <AnimatePresence>
        {flash && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute right-0 top-full mt-2 z-30 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-paper shadow-lg"
          >
            {flash === 'saved' ? 'Saved to your shortlist' : 'Removed from shortlist'}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
