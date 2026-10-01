'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COLLEGES, type College } from '@/lib/mockData';
import { roiOf } from '@/lib/discovery';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';
import SaveButton from '@/components/saved/SaveButton';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const MODES = [
  { id: 'score', label: 'Reality Score', value: (c: College) => c.realityScore, fmt: (v: number) => `${v}`, max: 100 },
  { id: 'placement', label: 'Placement', value: (c: College) => c.placementPercent, fmt: (v: number) => `${v}%`, max: 100 },
  { id: 'median', label: 'Median CTC', value: (c: College) => c.medianPackage, fmt: (v: number) => `₹${v}L`, max: 30 },
  { id: 'roi', label: 'ROI', value: (c: College) => roiOf(c), fmt: (v: number) => `${v.toFixed(1)}×`, max: 26 },
] as const;

type ModeId = (typeof MODES)[number]['id'];

export default function TopColleges() {
  const reduce = useReducedMotion();
  const [modeId, setModeId] = useState<ModeId>('score');
  const mode = MODES.find(m => m.id === modeId)!;
  const ranked = [...COLLEGES].sort((a, b) => mode.value(b) - mode.value(a));
  const [activeId, setActiveId] = useState(ranked[0].id);
  const { compareList, addToCompare, removeFromCompare } = useApp();

  return (
    <section className="py-20 sm:py-28" aria-labelledby="top-colleges">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="label">Rankings · demo dataset</p>
            <h2 id="top-colleges" className="font-display mt-3 text-4xl sm:text-[3.5rem] font-semibold tracking-[-0.028em] leading-[0.98]">
              Top colleges, re-ranked
              <br className="hidden sm:block" /> by what you care about.
            </h2>
          </div>

          <div role="tablist" aria-label="Rank by" className="relative flex p-1 rounded-xl bg-paper-2 border border-line self-start lg:self-auto overflow-x-auto scrollbar-none max-w-full">
            {MODES.map(m => (
              <button
                key={m.id}
                role="tab"
                aria-selected={m.id === modeId}
                onClick={() => {
                  setModeId(m.id);
                  const next = [...COLLEGES].sort((a, b) => m.value(b) - m.value(a));
                  setActiveId(next[0].id);
                }}
                className={cn(
                  'relative z-10 h-9 px-3.5 rounded-lg text-[13px] whitespace-nowrap transition-colors cursor-pointer',
                  m.id === modeId ? 'text-ink font-medium' : 'text-muted hover:text-ink',
                )}
              >
                {m.id === modeId && (
                  <motion.span
                    layoutId="rank-mode"
                    className="absolute inset-0 -z-10 rounded-lg bg-surface border border-line shadow-[0_1px_2px_rgba(18,20,23,0.06)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                {m.label}
              </button>
            ))}
          </div>
        </Reveal>

        <LayoutGroup>
          <ol className="mt-10 border-t border-ink">
            {ranked.map((c, i) => {
              const active = c.id === activeId;
              const v = mode.value(c);
              const inCompare = compareList.includes(c.id);
              return (
                <motion.li
                  key={c.id}
                  layout={reduce ? false : 'position'}
                  transition={{ layout: { type: 'spring', stiffness: 380, damping: 36 } }}
                  className={cn('group relative border-b border-line transition-colors duration-200', active ? 'bg-surface' : 'hover:bg-surface/60')}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    aria-expanded={active}
                    className="w-full text-left grid grid-cols-[3.25rem_1fr_auto] sm:grid-cols-[5rem_1fr_9rem_7rem] items-center gap-3 sm:gap-6 py-5 px-1 sm:px-4 cursor-pointer"
                  >
                    <span className={cn('font-display text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.028em] leading-none nums transition-colors', active ? 'text-accent' : 'text-line-2')}>
                      <AnimatedNumber value={i + 1} prefix={i + 1 < 10 ? '0' : ''} duration={0.35} />
                    </span>
                    <span className="min-w-0">
                      <span className={cn('block font-display text-xl sm:text-2xl font-semibold tracking-[-0.025em] truncate transition-colors', active ? 'text-ink' : 'text-ink-2')}>
                        {c.shortName}
                      </span>
                      <span className="block text-xs sm:text-sm text-muted mt-0.5 truncate">{c.location}</span>
                    </span>
                    {/* Active-metric bar */}
                    <span className="hidden sm:block">
                      <span className="block h-[5px] rounded-full bg-paper-2 overflow-hidden">
                        <motion.span
                          className={cn('block h-full rounded-full origin-left', active ? 'bg-accent' : 'bg-ink/70')}
                          initial={false}
                          animate={{ scaleX: Math.min(1, v / mode.max) }}
                          transition={{ duration: 0.55, ease: EASE_OUT }}
                        />
                      </span>
                    </span>
                    <span className="text-right font-mono text-lg sm:text-xl font-semibold nums text-ink">
                      <AnimatedNumber
                        value={v}
                        decimals={mode.id === 'roi' ? 1 : mode.id === 'median' && v % 1 ? 1 : 0}
                        prefix={mode.id === 'median' ? '₹' : ''}
                        suffix={mode.id === 'placement' ? '%' : mode.id === 'median' ? 'L' : mode.id === 'roi' ? '×' : ''}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-[5rem_repeat(4,1fr)_auto] items-end gap-x-6 gap-y-5 pb-6 px-1 sm:px-4">
                          <span className="hidden sm:block" />
                          <Metric label="Placement" value={`${c.placementPercent}%`} tone="positive" />
                          <Metric label="Median CTC" value={`₹${c.medianPackage}L`} />
                          <Metric label="Tuition / yr" value={`₹${c.totalFees}L`} />
                          <Metric label="Reality Score" value={`${c.realityScore}`} tone="accent" />
                          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                            <SaveButton collegeId={c.id} collegeName={c.shortName} />
                            <button
                              type="button"
                              onClick={() => (inCompare ? removeFromCompare(c.id) : addToCompare(c.id))}
                              aria-pressed={inCompare}
                              className={cn(
                                'h-9 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer',
                                inCompare ? 'bg-accent-soft border-accent/30 text-accent-deep' : 'border-line hover:border-ink-2',
                              )}
                            >
                              {inCompare ? 'In compare' : 'Compare'}
                            </button>
                            <Link
                              href={`/colleges/${c.id}`}
                              className="group h-9 pl-3.5 pr-3 rounded-lg bg-ink text-paper text-xs font-medium inline-flex items-center gap-1.5 hover:bg-accent transition-colors"
                            >
                              View <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ol>
        </LayoutGroup>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-muted">ROI = median CTC ÷ annual tuition.</p>
          <Link href="/rankings" className="font-medium text-accent inline-flex items-center gap-1.5 hover:gap-2 transition-all">
            All ranking categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: 'positive' | 'accent' }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p
        className={cn(
          'mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.022em] nums',
          tone === 'positive' && 'text-positive',
          tone === 'accent' && 'text-accent',
        )}
      >
        {value}
      </p>
    </div>
  );
}
