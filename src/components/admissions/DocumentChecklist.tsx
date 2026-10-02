'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { REQUIRED_DOCUMENTS } from '@/lib/admissionsData';
import { EASE_OUT } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { createLocalStore, useLocalStore } from '@/lib/localStore';

const docsStore = createLocalStore<string[]>('collegeiq:documents:v1', [], v =>
  Array.isArray(v) && v.every(x => typeof x === 'string') ? v : undefined,
);

/** Tick-off list of counselling documents; progress is kept in this browser. */
export default function DocumentChecklist() {
  const reduce = useReducedMotion();
  const done = useLocalStore(docsStore);
  const setDone = docsStore.set;

  const toggle = (id: string) => setDone(d => (d.includes(id) ? d.filter(x => x !== id) : [...d, id]));
  const essential = REQUIRED_DOCUMENTS.filter(d => d.essential);
  const essentialDone = essential.filter(d => done.includes(d.id)).length;
  const pct = done.length / REQUIRED_DOCUMENTS.length;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="figure text-5xl font-semibold tracking-[-0.03em] nums">
            {done.length}<span className="text-muted text-2xl">/{REQUIRED_DOCUMENTS.length}</span>
          </p>
          <p className="text-sm text-muted mt-1">
            {essentialDone === essential.length ? 'All essential documents ready.' : `${essential.length - essentialDone} essential still to collect.`}
          </p>
        </div>
        {done.length > 0 && (
          <button onClick={() => setDone([])} className="text-xs text-muted hover:text-ink underline-offset-2 hover:underline cursor-pointer">
            Reset
          </button>
        )}
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-paper-2 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100}>
        <motion.div className="h-full bg-positive origin-left rounded-full" initial={false} animate={{ scaleX: pct }} transition={{ duration: 0.4, ease: EASE_OUT }} />
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {REQUIRED_DOCUMENTS.map(doc => {
          const checked = done.includes(doc.id);
          return (
            <li key={doc.id}>
              <label className="flex items-start gap-4 py-4 cursor-pointer group">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={() => toggle(doc.id)} />
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2',
                    checked ? 'bg-positive border-positive text-white' : 'border-line-2 group-hover:border-ink-2 bg-surface',
                  )}
                >
                  <motion.span initial={false} animate={{ scale: checked ? 1 : 0 }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 600, damping: 26 }}>
                    <Check size={13} strokeWidth={3} />
                  </motion.span>
                </span>
                <span className="min-w-0">
                  <span className={cn('block text-[15px] font-medium transition-colors', checked && 'text-muted line-through decoration-line-2')}>
                    {doc.title}
                    {doc.essential && <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.08em] text-caution no-underline">Essential</span>}
                  </span>
                  <span className="block text-sm text-muted mt-0.5">{doc.desc}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-faint">Saved on this device only.</p>
    </div>
  );
}
