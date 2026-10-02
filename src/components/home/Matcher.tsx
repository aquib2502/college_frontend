'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Plus, X } from 'lucide-react';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';
import SaveButton from '@/components/saved/SaveButton';
import { useApp } from '@/context/AppContext';
import {
  explainMatch,
  interpretQuery,
  matchColleges,
  relaxationHints,
  sortColleges,
  type Constraint,
  type ConstraintKind,
  type Interpretation,
} from '@/lib/discovery';
import { cn } from '@/lib/utils';
import { simulateAIMatch, STUDENT_PROFILE } from '@/lib/mockData';

const DEFAULT_QUERY = 'I want a B.Tech college in Maharashtra under ₹8L';

// Phrases appended when a visitor taps a suggested constraint.
const SUGGESTIONS: { kind: ConstraintKind; label: string; phrase: string }[] = [
  { kind: 'location', label: 'Location', phrase: ' in Maharashtra' },
  { kind: 'budget', label: 'Budget', phrase: ' under ₹5L' },
  { kind: 'degree', label: 'Degree', phrase: ' B.Tech' },
  { kind: 'branch', label: 'Branch', phrase: ' for computer science' },
  { kind: 'hostel', label: 'Hostel', phrase: ' with hostel' },
  { kind: 'roi', label: 'ROI', phrase: ' with good ROI' },
  { kind: 'placement', label: 'Placement', phrase: ' with strong placements' },
];

const SORTS = [
  { id: 'match', label: 'Best match' },
  { id: 'fee', label: 'Lowest fee' },
  { id: 'median', label: 'Median CTC' },
  { id: 'placement', label: 'Placement' },
] as const;
type SortId = (typeof SORTS)[number]['id'];

const STEPS = ['Describe', 'Interpret', 'Match', 'Compare'];

type Phase = 'idle' | 'thinking' | 'results';

export type MatcherHandle = { run: (query: string) => void };

interface MatcherProps {
  ref?: Ref<MatcherHandle>;
  /** 'section' is the homepage band; 'page' drops the band chrome for /ai-college-finder. */
  variant?: 'section' | 'page';
  /** Prefill and show results immediately (e.g. from a ?q= link). */
  initialQuery?: string;
  /** Show fit and admission chance for the demo student profile. */
  showFit?: boolean;
}

export default function Matcher({ ref, variant = 'section', initialQuery, showFit = false }: MatcherProps) {
  const reduce = useReducedMotion();
  const { compareList, addToCompare, removeFromCompare } = useApp();
  const [text, setText] = useState(initialQuery || DEFAULT_QUERY);
  const [phase, setPhase] = useState<Phase>(initialQuery ? 'results' : 'idle');
  const [committed, setCommitted] = useState<Interpretation | null>(() => (initialQuery ? interpretQuery(initialQuery) : null));
  const [sort, setSort] = useState<SortId>('match');
  const [compared, setCompared] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const area = useRef<HTMLTextAreaElement>(null);

  const live = interpretQuery(text);
  const missing = SUGGESTIONS.filter(s => !live.constraints.some(c => c.kind === s.kind));

  function submit(q = text) {
    const interp = interpretQuery(q);
    clearTimeout(timer.current);
    setCommitted(interp);
    setSort('match');
    setCompared(false);
    setPhase('thinking');
    timer.current = setTimeout(() => setPhase('results'), reduce ? 0 : 520);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  // Hand-off from the hero: prefill and run.
  useImperativeHandle(ref, () => ({
    run(query: string) {
      setText(query);
      submit(query);
    },
  }));

  function removeConstraint(k: Constraint) {
    if (!committed) return;
    setCommitted({ ...committed, constraints: committed.constraints.filter(c => c !== k) });
  }

  const base = committed ? matchColleges(committed.constraints, committed.sort) : [];
  const results =
    sort === 'match'
      ? base
      : sort === 'fee'
        ? [...base].sort((a, b) => a.totalFees - b.totalFees)
        : sortColleges(base, sort === 'median' ? 'medianPackage' : 'placementPercent');
  const hints = committed && results.length === 0 ? relaxationHints(committed.constraints, committed.sort) : [];

  const step = compared ? 3 : phase === 'results' ? 2 : phase === 'thinking' || live.constraints.length > 0 ? 1 : 0;

  return (
    <section
      id="matcher"
      className={cn('relative scroll-mt-16', variant === 'section' && 'bg-accent-soft/60 border-y border-line')}
      aria-labelledby={variant === 'section' ? 'matcher-title' : undefined}
      aria-label={variant === 'page' ? 'College matcher' : undefined}
    >
      {variant === 'section' && (
        <div aria-hidden className="absolute inset-0 grain opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      )}
      <div className={cn('relative max-w-[1240px] mx-auto px-4 sm:px-8', variant === 'section' ? 'py-20 sm:py-28' : 'py-10 sm:py-14')}>
        {variant === 'section' && (
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="label">Natural-language matcher</p>
            <h2 id="matcher-title" className="font-display mt-3 text-4xl sm:text-6xl font-semibold tracking-[-0.032em] leading-[0.95]">
              Tell us what you want.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted">Describe your ideal college in your own words.</p>
          </Reveal>
        )}

        {/* Pipeline */}
        <ol className={cn(variant === 'section' ? 'mt-10' : 'mt-0', 'flex items-center justify-center gap-2 sm:gap-3')} aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 sm:gap-3">
              <span className={cn('flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-300', i <= step ? 'text-ink' : 'text-faint')}>
                <span className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-300', i < step ? 'bg-ink' : i === step ? 'bg-accent' : 'bg-line-2')} />
                <span className={i === step ? undefined : 'hidden sm:inline'}>{s}</span>
              </span>
              {i < STEPS.length - 1 && (
                <span className="relative block h-px w-6 sm:w-12 bg-line-2 overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-ink origin-left"
                    initial={false}
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  />
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Input */}
        <Reveal delay={0.05} className="mt-6 max-w-[880px] mx-auto">
          <form
            onSubmit={e => {
              e.preventDefault();
              submit();
            }}
            className="rounded-[24px] border border-line-2/80 bg-surface shadow-[0_30px_70px_-40px_rgba(18,20,23,0.4)] focus-within:border-accent/60 focus-within:shadow-[0_0_0_5px_rgba(43,79,224,0.10),0_30px_70px_-34px_rgba(43,79,224,0.4)] transition-[border-color,box-shadow] duration-300"
          >
            <label htmlFor="matcher-q" className="sr-only">Describe your ideal college</label>
            <textarea
              id="matcher-q"
              ref={area}
              value={text}
              rows={2}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder={DEFAULT_QUERY + '…'}
              className="block w-full resize-none bg-transparent px-6 sm:px-8 pt-6 sm:pt-7 pb-2 text-2xl sm:text-[2rem] leading-[1.2] tracking-[-0.015em] text-ink placeholder:text-faint outline-none focus-visible:outline-none"
            />

            {/* Live detection */}
            <div className="px-6 sm:px-8 min-h-[44px] flex flex-wrap items-center gap-2 py-2" aria-live="polite">
              <span className="label mr-1">Detected</span>
              <LayoutGroup>
                <AnimatePresence mode="popLayout" initial={false}>
                  {live.constraints.length === 0 ? (
                    <motion.span key="none" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-faint">
                      Nothing yet — try a course, a place or a budget.
                    </motion.span>
                  ) : (
                    live.constraints.map(c => (
                      <motion.span
                        key={c.kind + c.value}
                        layout
                        initial={{ opacity: 0, scale: 0.85, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                        className="inline-flex items-baseline gap-1.5 rounded-md bg-ink px-2.5 py-1 text-[13px] text-paper"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-paper/60">{c.label}</span>
                        {c.value}
                      </motion.span>
                    ))
                  )}
                </AnimatePresence>
              </LayoutGroup>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-line px-6 sm:px-8 py-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {missing.length > 0 && <span className="label mr-1">Add</span>}
                {missing.slice(0, 5).map(s => (
                  <button
                    key={s.kind}
                    type="button"
                    onClick={() => {
                      setText(t => t.trimEnd() + s.phrase);
                      area.current?.focus();
                    }}
                    className="h-9 sm:h-7 px-2.5 rounded-md border border-dashed border-line-2 text-xs text-ink-2 hover:border-accent hover:text-accent inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={11} /> {s.label}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="group shrink-0 h-12 pl-6 pr-2 rounded-[14px] bg-accent text-white text-sm font-medium inline-flex items-center justify-between gap-4 hover:bg-accent-deep transition-colors cursor-pointer active:scale-[0.98]"
              >
                Find my colleges
                <span className="h-8 w-8 rounded-[10px] bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </form>
        </Reveal>

        {/* Interpretation → results */}
        <AnimatePresence mode="wait">
          {phase === 'thinking' && committed && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-12 max-w-[880px] mx-auto"
            >
              <p className="label text-center">Interpreting your preferences…</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(committed.constraints.length ? committed.constraints : [{ kind: 'degree', label: 'Criteria', value: 'Any' } as Constraint]).map((c, i) => (
                  <motion.div
                    key={c.kind + c.value}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: EASE_OUT }}
                    className="rounded-xl border border-line bg-surface px-4 py-3"
                  >
                    <p className="label">{c.label}</p>
                    <p className="mt-1 font-medium">{c.value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="progress-line mt-5" />
            </motion.div>
          )}

          {phase === 'results' && committed && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-14"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-ink">
                <div>
                  <p className="text-3xl sm:text-4xl font-semibold tracking-[-0.015em]">
                    <span className="nums">{results.length}</span> {results.length === 1 ? 'college matches' : 'colleges match'} your criteria.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="label mr-1">Your priorities</span>
                    <AnimatePresence initial={false}>
                      {committed.constraints.map(c => (
                        <motion.button
                          key={c.kind + c.value}
                          layout
                          exit={{ opacity: 0, scale: 0.9 }}
                          type="button"
                          onClick={() => removeConstraint(c)}
                          aria-label={`Remove ${c.label}: ${c.value}`}
                          className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface pl-2.5 pr-1.5 py-1 text-[13px] hover:border-concern/50 transition-colors cursor-pointer"
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{c.label}</span>
                          {c.value}
                          <X size={12} className="text-faint group-hover:text-concern" />
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                {results.length > 1 && (
                  <div role="radiogroup" aria-label="Sort results" className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                    <span className="label mr-2 shrink-0">Sort</span>
                    {SORTS.map(s => (
                      <button
                        key={s.id}
                        role="radio"
                        aria-checked={sort === s.id}
                        onClick={() => setSort(s.id)}
                        className={cn(
                          'h-10 sm:h-8 px-3 rounded-md text-[13px] whitespace-nowrap transition-colors cursor-pointer',
                          sort === s.id ? 'bg-ink text-paper' : 'text-muted hover:text-ink hover:bg-surface',
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 max-w-xl">
                  <p className="text-2xl font-semibold tracking-[-0.015em]">
                    No colleges match all {committed.constraints.length} constraints.
                  </p>
                  <p className="mt-2 text-muted">Loosen one and we&apos;ll show you what comes back:</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {hints.slice(0, 3).map(h => (
                      <button
                        key={h.index}
                        onClick={() => removeConstraint(h.constraint)}
                        className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-left hover:border-accent transition-colors cursor-pointer"
                      >
                        <span>
                          Remove <span className="font-medium">{h.constraint.label.toLowerCase()}: {h.constraint.value}</span>
                        </span>
                        <span className="figure font-medium text-xs text-muted group-hover:text-accent">
                          {h.count} {h.count === 1 ? 'college' : 'colleges'} →
                        </span>
                      </button>
                    ))}
                    {hints.length === 0 && (
                      <Link href="/colleges" className="text-accent font-medium hover:underline">Browse all colleges →</Link>
                    )}
                  </div>
                </div>
              ) : (
                <LayoutGroup>
                  <ul>
                    {results.map((c, i) => {
                      const inCompare = compareList.includes(c.id);
                      const why = explainMatch(c, committed.constraints);
                      return (
                        <motion.li
                          key={c.id}
                          layout={reduce ? false : 'position'}
                          initial={reduce ? false : { opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.4, ease: EASE_OUT, layout: { type: 'spring', stiffness: 380, damping: 36 } }}
                          className={cn('group border-b border-line px-1 sm:px-6 py-6 sm:py-7 transition-colors hover:bg-surface', i % 2 === 0 ? 'bg-surface/70' : 'bg-transparent')}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.6fr_auto] gap-5 lg:gap-8 lg:items-center">
                            <div className="min-w-0">
                              <p className="text-sm text-muted">
                                {c.city} · {c.courses[0]?.name.split(' ').slice(0, 1).join(' ')}
                              </p>
                              <Link href={`/colleges/${c.id}`} className="block text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.015em] leading-tight group-hover:text-accent transition-colors">
                                {c.name}
                              </Link>
                              {why.length > 0 && (
                                <p className="mt-2 text-sm text-ink-2">
                                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-positive mr-2">Why it matches</span>
                                  {why.join(' · ')}
                                </p>
                              )}
                              {showFit && <FitLine collegeId={c.id} />}
                            </div>

                            <dl className="grid grid-cols-4 gap-4 nums">
                              <Stat label="Fee / yr" value={`₹${c.totalFees}L`} />
                              <Stat label="Median CTC" value={`₹${c.medianPackage}L`} />
                              <Stat label="Placement" value={`${c.placementPercent}%`} />
                              <Stat label="Score" value={`${c.realityScore}`} accent />
                            </dl>

                            <div className="flex items-center gap-2">
                              <SaveButton collegeId={c.id} collegeName={c.shortName} />
                              <button
                                type="button"
                                onClick={() => {
                                  if (inCompare) removeFromCompare(c.id);
                                  else {
                                    addToCompare(c.id);
                                    setCompared(true);
                                  }
                                }}
                                aria-pressed={inCompare}
                                className={cn(
                                  'h-9 px-3 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer',
                                  inCompare ? 'bg-accent-soft border-accent/30 text-accent-deep' : 'border-line bg-surface hover:border-ink-2',
                                )}
                              >
                                {inCompare ? <Check size={13} /> : <Plus size={13} />}
                                {inCompare ? 'In compare' : 'Compare'}
                              </button>
                              <Link
                                href={`/colleges/${c.id}`}
                                className="h-9 pl-3.5 pr-3 rounded-lg bg-ink text-paper text-xs font-medium inline-flex items-center gap-1.5 hover:bg-accent transition-colors"
                              >
                                View <ArrowUpRight size={13} />
                              </Link>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </LayoutGroup>
              )}

              {results.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <p className="text-muted">
                    Interpreted locally from your words and matched against the demo dataset.
                  </p>
                  <Link href="/compare" className="font-medium text-accent inline-flex items-center gap-1.5 hover:gap-2 transition-all">
                    Compare your picks <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className="label !text-[10px]">{label}</dt>
      <dd className={cn('mt-1 figure text-lg sm:text-xl font-semibold', accent && 'text-accent')}>{value}</dd>
    </div>
  );
}

function FitLine({ collegeId }: { collegeId: string }) {
  const m = simulateAIMatch(collegeId, STUDENT_PROFILE);
  return (
    <p className="mt-2 text-sm text-ink-2 nums">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-accent mr-2">For you</span>
      {m.matchPercent}% fit · {m.admissionProbability}% admission chance
      {m.concerns[0] && <span className="text-caution"> · {m.concerns[0]}</span>}
    </p>
  );
}
