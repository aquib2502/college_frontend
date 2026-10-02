'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { COLLEGES } from '@/lib/mockData';
import Monogram from '@/components/college/Monogram';

/** Slide-over shortlist. Opened from the navbar "Saved" control. */
export default function SavedDrawer() {
  const { savedOpen, setSavedOpen, savedColleges, toggleSave, compareList, addToCompare, removeFromCompare } = useApp();
  const panel = useRef<HTMLDivElement>(null);
  const saved = savedColleges
    .map(id => COLLEGES.find(c => c.id === id))
    .filter((c): c is (typeof COLLEGES)[number] => Boolean(c));
  const comparing = saved.filter(c => compareList.includes(c.id)).length;

  useEffect(() => {
    if (!savedOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSavedOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [savedOpen, setSavedOpen]);

  return (
    <AnimatePresence>
      {savedOpen && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSavedOpen(false)}
            className="fixed inset-0 z-[90] bg-ink/30 backdrop-blur-[2px]"
          />
          <motion.aside
            key="panel"
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Your shortlist"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 40 }}
            className="fixed right-0 top-0 bottom-0 z-[91] w-full sm:w-[420px] bg-paper border-l border-line flex flex-col outline-none"
          >
            <header className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-line">
              <div>
                <p className="label">Shortlist</p>
                <h2 className="text-2xl font-semibold tracking-tight mt-1">
                  {saved.length} saved {saved.length === 1 ? 'college' : 'colleges'}
                </h2>
              </div>
              <button
                onClick={() => setSavedOpen(false)}
                aria-label="Close shortlist"
                className="w-9 h-9 rounded-lg border border-line hover:border-ink-2 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {saved.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <p className="text-lg font-semibold">Nothing saved yet.</p>
                  <p className="text-sm text-muted mt-1.5 max-w-[16rem] mx-auto">
                    Tap the bookmark on any college to keep it here for comparison.
                  </p>
                  <Link
                    href="/colleges"
                    onClick={() => setSavedOpen(false)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Browse colleges <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  <AnimatePresence initial={false}>
                    {saved.map(c => {
                      const inCompare = compareList.includes(c.id);
                      return (
                        <motion.li
                          key={c.id}
                          layout
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
                          className="px-6 py-4"
                        >
                          <div className="flex items-start gap-3">
                            <Monogram name={c.shortName} size="sm" />
                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/colleges/${c.id}`}
                                onClick={() => setSavedOpen(false)}
                                className="font-medium text-[15px] leading-tight hover:text-accent transition-colors"
                              >
                                {c.shortName}
                              </Link>
                              <p className="text-xs text-muted mt-0.5">{c.city}, {c.state}</p>
                              <dl className="mt-3 grid grid-cols-3 gap-2 nums">
                                <div>
                                  <dt className="label !text-[10px]">Score</dt>
                                  <dd className="figure text-sm font-semibold">{c.realityScore}</dd>
                                </div>
                                <div>
                                  <dt className="label !text-[10px]">Fee / yr</dt>
                                  <dd className="figure text-sm font-semibold">₹{c.totalFees}L</dd>
                                </div>
                                <div>
                                  <dt className="label !text-[10px]">Median</dt>
                                  <dd className="figure text-sm font-semibold">₹{c.medianPackage}L</dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2 pl-11">
                            <button
                              onClick={() => (inCompare ? removeFromCompare(c.id) : addToCompare(c.id))}
                              aria-pressed={inCompare}
                              className={`h-8 px-3 rounded-md text-xs font-medium inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                                inCompare
                                  ? 'bg-accent-soft border-accent/30 text-accent-deep'
                                  : 'border-line hover:border-ink-2'
                              }`}
                            >
                              {inCompare ? <Check size={13} /> : <Plus size={13} />}
                              {inCompare ? 'In compare' : 'Compare'}
                            </button>
                            <button
                              onClick={() => toggleSave(c.id)}
                              className="h-8 px-3 rounded-md text-xs font-medium text-muted hover:text-concern transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <footer className="border-t border-line px-6 py-4 flex items-center gap-2 bg-surface">
              <Link
                href="/compare"
                onClick={() => setSavedOpen(false)}
                className="flex-1 h-11 rounded-xl bg-ink text-paper text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-accent transition-colors"
              >
                Compare {comparing > 0 ? `${comparing} from shortlist` : 'colleges'} <ArrowRight size={15} />
              </Link>
              <Link
                href="/student/saved"
                onClick={() => setSavedOpen(false)}
                className="h-11 px-4 rounded-xl border border-line text-sm font-medium inline-flex items-center hover:border-ink-2 transition-colors"
              >
                Full list
              </Link>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
