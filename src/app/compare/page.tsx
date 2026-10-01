'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Plus, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import Monogram from '@/components/college/Monogram';
import SaveButton from '@/components/saved/SaveButton';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import { EASE_OUT } from '@/components/motion/Reveal';
import { COLLEGES, simulateAIMatch, STUDENT_PROFILE, type College } from '@/lib/mockData';
import { roiOf } from '@/lib/discovery';
import { formatPackage } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

type Focus = 'overall' | 'placement' | 'affordability' | 'campus';

const FOCI: { id: Focus; label: string }[] = [
  { id: 'overall', label: 'Overall' },
  { id: 'placement', label: 'Placements' },
  { id: 'affordability', label: 'Affordability' },
  { id: 'campus', label: 'Campus' },
];

interface BarMetric {
  key: string;
  group: Focus;
  label: string;
  value: (c: College) => number;
  fmt: (v: number) => string;
  lowerIsBetter?: boolean;
}

const acres = (c: College) => parseFloat(c.campus) || 0;

const BAR_METRICS: BarMetric[] = [
  { key: 'reality', group: 'overall', label: 'Reality Score', value: c => c.realityScore, fmt: v => `${v}` },
  { key: 'rating', group: 'overall', label: 'Student satisfaction', value: c => c.studentRating, fmt: v => `${v.toFixed(1)} / 5` },
  { key: 'placement', group: 'placement', label: 'Placement rate', value: c => c.placementPercent, fmt: v => `${v}%` },
  { key: 'median', group: 'placement', label: 'Median package', value: c => c.medianPackage, fmt: v => formatPackage(v) },
  { key: 'average', group: 'placement', label: 'Average package', value: c => c.averagePackage, fmt: v => formatPackage(v) },
  { key: 'fee', group: 'affordability', label: 'Tuition / yr', value: c => c.totalFees, fmt: v => `₹${v}L`, lowerIsBetter: true },
  { key: 'hostelFee', group: 'affordability', label: 'Hostel / yr', value: c => c.hostelFees, fmt: v => `₹${v}L`, lowerIsBetter: true },
  { key: 'roi', group: 'affordability', label: 'Median ÷ tuition', value: roiOf, fmt: v => `${v.toFixed(1)}×` },
  { key: 'campusRating', group: 'campus', label: 'Student rating', value: c => c.studentRating, fmt: v => `${v.toFixed(1)} / 5` },
  { key: 'acres', group: 'campus', label: 'Campus area', value: acres, fmt: v => `${v} acres` },
];

const COMPARE_ROWS = [
  { key: 'type', label: 'University Type' },
  { key: 'naacGrade', label: 'NAAC Accreditation' },
  { key: 'accreditation', label: 'Approvals' },
  { key: 'totalFees', label: 'Tuition Fee (Per Year)', format: (v: number) => `₹${v} Lakhs` },
  { key: 'placementPercent', label: 'Placement %', format: (v: number) => `${v}%` },
  { key: 'medianPackage', label: 'Median Package', format: (v: number) => formatPackage(v) },
  { key: 'averagePackage', label: 'Average Package', format: (v: number) => formatPackage(v) },
  { key: 'highestPackage', label: 'Highest Package', format: (v: number) => formatPackage(v) },
  { key: 'studentRating', label: 'Student Satisfaction', format: (v: number) => `${v} / 5.0` },
  { key: 'totalReviews', label: 'Reviews', format: (v: number) => v.toLocaleString('en-IN') },
  { key: 'realityScore', label: 'Reality Score', format: (v: number) => `${v} / 100` },
  { key: 'hasHostel', label: 'Hostel', format: (v: boolean) => (v ? 'Available' : 'Limited / off-campus') },
  { key: 'hasWifi', label: 'Wi-Fi', format: (v: boolean) => (v ? 'Campus-wide' : 'Basic') },
  { key: 'hasSports', label: 'Sports Complex', format: (v: boolean) => (v ? 'Available' : 'Standard') },
  { key: 'campus', label: 'Campus Area', format: (v: string) => v || '—' },
  { key: 'established', label: 'Year Established' },
];

function bestIndex(colleges: College[], key: string): number {
  const vals = colleges.map(c => Number((c as unknown as Record<string, unknown>)[key]));
  if (vals.some(v => isNaN(v))) return -1;
  return key === 'totalFees' ? vals.indexOf(Math.min(...vals)) : vals.indexOf(Math.max(...vals));
}

export default function ComparePage() {
  const reduce = useReducedMotion();
  const { compareList, removeFromCompare, addToCompare } = useApp();
  const { showToast } = useToast();
  const [focus, setFocus] = useState<Focus>('overall');
  const [adding, setAdding] = useState(false);
  const [building, setBuilding] = useState(true);
  const addRef = useRef<HTMLDivElement>(null);

  const colleges = compareList.map(id => COLLEGES.find(c => c.id === id)).filter((c): c is College => Boolean(c));
  const others = COLLEGES.filter(c => !compareList.includes(c.id));

  useEffect(() => {
    const t = setTimeout(() => setBuilding(false), reduce ? 0 : 380);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    const close = (e: MouseEvent) => addRef.current && !addRef.current.contains(e.target as Node) && setAdding(false);
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, []);

  const matches = colleges.map(c => simulateAIMatch(c.id, STUDENT_PROFILE));

  const metrics = [...BAR_METRICS].sort((a, b) => Number(b.group === focus) - Number(a.group === focus));

  const addMenu = (
    <div ref={addRef} className="relative">
      <button
        onClick={() => setAdding(a => !a)}
        disabled={others.length === 0 || compareList.length >= 5}
        aria-expanded={adding}
        className="h-10 px-4 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent disabled:opacity-40 transition-colors cursor-pointer"
      >
        <Plus size={15} /> Add college <ChevronDown size={14} />
      </button>
      <AnimatePresence>
        {adding && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-30 w-64 rounded-xl border border-line bg-surface p-1.5 shadow-xl"
          >
            {others.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => {
                    addToCompare(c.id);
                    setAdding(false);
                    showToast(`${c.shortName} added to comparison`);
                  }}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-paper cursor-pointer"
                >
                  {c.shortName} <span className="font-mono text-xs text-muted">{c.realityScore}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <PageHeader
        label="Compare"
        title="Show me what matters."
        description="Choose a lens and the comparison rearranges around it."
        actions={addMenu}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
        {colleges.length < 2 ? (
          <div className="max-w-xl py-16">
            <p className="font-display text-3xl font-semibold tracking-[-0.025em]">Add at least two colleges to compare.</p>
            <p className="mt-2 text-muted">
              You have {colleges.length === 0 ? 'none' : `only ${colleges[0].shortName}`} in your comparison. Save colleges from search or rankings, then tap Compare.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {others.slice(0, 4).map(c => (
                <button
                  key={c.id}
                  onClick={() => addToCompare(c.id)}
                  className="h-10 px-4 rounded-xl border border-line bg-surface text-sm inline-flex items-center gap-2 hover:border-ink-2 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> {c.shortName}
                </button>
              ))}
              <Link href="/colleges" className="h-10 px-4 rounded-xl text-sm inline-flex items-center text-accent hover:underline">
                Browse all →
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Selected colleges */}
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
              <LayoutGroup>
                <ul className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3 sm:gap-4 min-w-max sm:min-w-0">
                  <AnimatePresence initial={false}>
                    {colleges.map((c, i) => {
                      const best = matches[i].matchPercent === Math.max(...matches.map(m => m.matchPercent));
                      return (
                        <motion.li
                          key={c.id}
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          className={cn('relative rounded-[22px] p-5 sm:p-6 border', best ? 'bg-ink text-paper border-ink' : 'bg-surface border-line')}
                        >
                          <button
                            onClick={() => {
                              removeFromCompare(c.id);
                              showToast(`${c.shortName} removed from comparison`);
                            }}
                            aria-label={`Remove ${c.shortName}`}
                            className={cn('absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer', best ? 'hover:bg-white/10 text-paper/60' : 'hover:bg-paper text-faint')}
                          >
                            <X size={14} />
                          </button>
                          <Monogram name={c.shortName} size="md" tone={best ? 'accent' : 'ink'} />
                          <Link href={`/colleges/${c.id}`} className="mt-4 block font-display text-2xl font-semibold tracking-[-0.022em] leading-tight hover:underline">
                            {c.shortName}
                          </Link>
                          <p className={cn('text-sm', best ? 'text-paper/60' : 'text-muted')}>{c.city}, {c.state}</p>
                          <div className="mt-6 flex items-end justify-between">
                            <div>
                              <p className={cn('font-mono text-[10.5px] uppercase tracking-[0.1em]', best ? 'text-paper/50' : 'text-muted')}>Reality Score</p>
                              <p className="font-display text-5xl font-semibold tracking-[-0.03em] nums leading-none mt-1">{c.realityScore}</p>
                            </div>
                            {best && <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#9db0ff]">Top fit</span>}
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </LayoutGroup>
            </div>

            {/* Focus switcher */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-display text-2xl font-semibold tracking-[-0.02em]">What matters most to you?</p>
              <div role="tablist" aria-label="Comparison focus" className="flex p-1 rounded-xl bg-paper-2 border border-line overflow-x-auto scrollbar-none">
                {FOCI.map(f => (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={focus === f.id}
                    onClick={() => setFocus(f.id)}
                    className={cn('relative h-9 px-4 rounded-lg text-[13.5px] whitespace-nowrap transition-colors cursor-pointer', focus === f.id ? 'text-ink font-medium' : 'text-muted hover:text-ink')}
                  >
                    {focus === f.id && (
                      <motion.span layoutId="cmp-focus" className="absolute inset-0 rounded-lg bg-surface border border-line shadow-sm" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Metric bars */}
              <section aria-label="Metric comparison" className="lg:col-span-7 rounded-[22px] border border-line bg-surface p-5 sm:p-7">
                {building ? (
                  <div aria-live="polite">
                    <p className="label">Building trade-off view…</p>
                    <div className="mt-5 space-y-5">
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} className="space-y-2">
                          <div className="skeleton h-3 w-32" />
                          <div className="skeleton h-2 w-full" />
                          <div className="skeleton h-2 w-4/5" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <LayoutGroup>
                    <ul className="space-y-2">
                      {metrics.map(metric => {
                        const on = metric.group === focus;
                        const vals = colleges.map(metric.value);
                        const max = Math.max(...vals);
                        const min = Math.min(...vals);
                        const bestVal = metric.lowerIsBetter ? min : max;
                        return (
                          <motion.li
                            key={metric.key}
                            layout={reduce ? false : 'position'}
                            transition={{ layout: { type: 'spring', stiffness: 380, damping: 36 } }}
                            animate={{ opacity: on ? 1 : 0.38 }}
                            className={cn('rounded-xl transition-[padding,background-color] duration-300', on ? 'bg-paper/70 p-4' : 'px-4 py-2.5')}
                          >
                            <p className={cn('transition-all duration-300', on ? 'font-medium text-[15px]' : 'text-sm text-muted')}>{metric.label}</p>
                            <div className="mt-2 space-y-1.5">
                              {colleges.map((c, i) => {
                                const v = vals[i];
                                const width = metric.lowerIsBetter ? (min / v) : v / max;
                                const isBest = v === bestVal;
                                return (
                                  <div key={c.id} className="grid grid-cols-[6.5rem_1fr_4.5rem] sm:grid-cols-[8rem_1fr_5.5rem] items-center gap-3">
                                    <span className="text-xs text-ink-2 truncate">{c.shortName}</span>
                                    <span className={cn('rounded-full bg-paper-2 overflow-hidden transition-[height] duration-300', on ? 'h-2.5' : 'h-1.5')}>
                                      <motion.span
                                        className={cn('block h-full rounded-full origin-left', isBest && on ? 'bg-accent' : 'bg-ink/70')}
                                        initial={reduce ? false : { scaleX: 0 }}
                                        animate={{ scaleX: Math.max(0.04, width) }}
                                        transition={{ duration: 0.55, ease: EASE_OUT }}
                                      />
                                    </span>
                                    <span className={cn('font-mono text-xs text-right nums', isBest && on && 'text-accent font-semibold')}>{metric.fmt(v)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </LayoutGroup>
                )}
              </section>

              {/* Trade-off decision panel */}
              <TradeOffPanel colleges={colleges} matchPercents={matches.map(m => m.matchPercent)} focus={focus} />
            </div>

            {/* Full table */}
            <section className="mt-14" aria-labelledby="all-metrics">
              <div className="flex items-end justify-between pb-3 border-b border-ink">
                <h2 id="all-metrics" className="font-display text-2xl font-semibold tracking-[-0.02em]">All metrics</h2>
                <span className="label hidden sm:block">Best in group marked</span>
              </div>
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="text-left py-4 pr-4 font-normal label w-[200px]">Metric</th>
                      {colleges.map(c => (
                        <th key={c.id} scope="col" className="text-left py-4 px-3 font-medium">
                          <div className="flex items-center gap-2">
                            {c.shortName}
                            <SaveButton collegeId={c.id} collegeName={c.shortName} className="scale-90" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map(row => {
                      const best = bestIndex(colleges, row.key);
                      return (
                        <tr key={row.key} className="border-b border-line hover:bg-surface/70 transition-colors">
                          <th scope="row" className="text-left py-3 pr-4 font-normal text-muted">{row.label}</th>
                          {colleges.map((c, i) => {
                            const val = (c as unknown as Record<string, unknown>)[row.key];
                            const text = row.format ? (row.format as (v: unknown) => string)(val) : String(val ?? '—');
                            return (
                              <td key={c.id} className={cn('py-3 px-3 nums', i === best && 'font-semibold text-accent-deep')}>
                                {text}
                                {i === best && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-label="Best in group" />}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

function TradeOffPanel({ colleges, matchPercents, focus }: { colleges: College[]; matchPercents: number[]; focus: Focus }) {
  const reduce = useReducedMotion();
  const target = STUDENT_PROFILE.location;

  const dims = [
    { id: 'fit', label: 'Fit', vals: matchPercents, fmt: (v: number) => `${v}%`, lower: false, focus: 'overall' as Focus },
    { id: 'cost', label: 'Cost', vals: colleges.map(c => c.totalFees), fmt: (v: number) => `₹${v}L`, lower: true, focus: 'affordability' as Focus },
    { id: 'placements', label: 'Placements', vals: colleges.map(c => c.placementPercent), fmt: (v: number) => `${v}%`, lower: false, focus: 'placement' as Focus },
    { id: 'location', label: 'Location', vals: colleges.map(c => (c.state === target ? 1 : 0)), fmt: (v: number) => (v ? `In ${target}` : 'Outside'), lower: false, focus: null },
    { id: 'experience', label: 'Student experience', vals: colleges.map(c => c.studentRating), fmt: (v: number) => `${v.toFixed(1)} / 5`, lower: false, focus: 'campus' as Focus },
  ];

  const leaderOf = (vals: number[], lower: boolean) => {
    const best = lower ? Math.min(...vals) : Math.max(...vals);
    return vals.indexOf(best);
  };

  const fitLeader = colleges[leaderOf(matchPercents, false)];
  const placeLeader = colleges[leaderOf(colleges.map(c => c.placementPercent), false)];
  const costLeader = colleges[leaderOf(colleges.map(c => c.totalFees), true)];
  const expLeader = colleges[leaderOf(colleges.map(c => c.studentRating), false)];

  const summary: Record<Focus, string> = {
    overall: `${fitLeader.shortName} is the strongest fit for your profile (${STUDENT_PROFILE.course}, ${STUDENT_PROFILE.exam} ${STUDENT_PROFILE.percentile} percentile, ${target}) at ${Math.max(...matchPercents)}%.`,
    placement: `${placeLeader.shortName} leads on placements at ${placeLeader.placementPercent}% with a ₹${placeLeader.medianPackage}L median.`,
    affordability: `${costLeader.shortName} is the most affordable at ₹${costLeader.totalFees}L a year in tuition.`,
    campus: `${expLeader.shortName} has the highest student rating at ${expLeader.studentRating} / 5.`,
  };

  return (
    <section aria-labelledby="tradeoff" className="lg:col-span-5 rounded-[22px] bg-ink text-paper p-5 sm:p-7 self-start lg:sticky lg:top-24">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper/50">Trade-off analysis</p>
      <h2 id="tradeoff" className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em]">Who wins on what</h2>

      <ul className="mt-6 space-y-4">
        {dims.map(d => {
          const lead = leaderOf(d.vals, d.lower);
          const active = d.focus === focus;
          return (
            <li key={d.id} className={cn('rounded-xl px-3 py-3 -mx-3 transition-colors duration-300', active && 'bg-white/[0.06]')}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={cn('text-sm', active ? 'text-paper font-medium' : 'text-paper/70')}>{d.label}</span>
                <span className="text-sm">
                  <span className="text-[#9db0ff]">{colleges[lead].shortName}</span>
                  <span className="text-paper/50 font-mono text-xs ml-2 nums">{d.fmt(d.vals[lead])}</span>
                </span>
              </div>
              <div className="mt-2 flex gap-1.5">
                {colleges.map((c, i) => {
                  const max = Math.max(...d.vals);
                  const min = Math.min(...d.vals);
                  const strength = d.id === 'location' ? d.vals[i] : d.lower ? (max === min ? 1 : (max - d.vals[i]) / (max - min)) : max === min ? 1 : (d.vals[i] - min) / (max - min);
                  return (
                    <span key={c.id} title={`${c.shortName}: ${d.fmt(d.vals[i])}`} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.span
                        className={cn('block h-full rounded-full origin-left', i === lead ? 'bg-[#5b7bff]' : 'bg-white/45')}
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={{ scaleX: Math.max(0.08, strength) }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={focus}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-6 pt-5 border-t border-white/10 text-[15px] leading-relaxed text-paper/85"
        >
          {summary[focus]}
        </motion.p>
      </AnimatePresence>
      <p className="mt-3 text-xs text-paper/40">
        Fit uses the demo student profile. <AnimatedNumber value={colleges.length} /> colleges compared.
      </p>
      <Link href={`/colleges/${fitLeader.id}`} className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#9db0ff] hover:underline">
        Open {fitLeader.shortName} <ArrowUpRight size={14} />
      </Link>
    </section>
  );
}
