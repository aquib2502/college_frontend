'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Info, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import Monogram from '@/components/college/Monogram';
import SaveButton from '@/components/saved/SaveButton';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import { EASE_OUT } from '@/components/motion/Reveal';
import { COLLEGES, type College } from '@/lib/mockData';
import { roiOf } from '@/lib/discovery';
import { cn } from '@/lib/utils';

type Metric = { label: string; value: (c: College) => number; fmt: (v: number) => string; max: number; lowerIsBetter?: boolean };

const SCORE: Metric = { label: 'Reality Score', value: c => c.realityScore, fmt: v => `${Math.round(v)}`, max: 100 };
const ROI: Metric = { label: 'Median ÷ fee', value: roiOf, fmt: v => `${v.toFixed(1)}×`, max: 26 };
const PLACEMENT: Metric = { label: 'Placement', value: c => c.placementPercent, fmt: v => `${Math.round(v)}%`, max: 100 };
const FEE: Metric = { label: 'Tuition / yr', value: c => c.totalFees, fmt: v => `₹${v.toFixed(1)}L`, max: 8, lowerIsBetter: true };

const has = (c: College, re: RegExp) => c.courses.some(co => re.test(co.name));

const CATEGORIES: { name: string; metric: Metric; filter?: (c: College) => boolean; note: string }[] = [
  { name: 'Overall Reality', metric: SCORE, note: 'Weighted Reality Score across outcomes, cost, faculty and sentiment.' },
  { name: 'Highest ROI', metric: ROI, note: 'Median CTC divided by annual tuition.' },
  { name: 'Placement Power', metric: PLACEMENT, note: 'Share of eligible students placed.' },
  { name: 'Engineering & Tech', metric: SCORE, filter: c => has(c, /B\.Tech|B\.E\./), note: 'Colleges offering B.Tech / B.E., by Reality Score.' },
  { name: 'Computer Science', metric: SCORE, filter: c => has(c, /Computer/), note: 'Colleges offering a computer science programme.' },
  { name: 'Management / MBA', metric: SCORE, filter: c => has(c, /MBA/), note: 'Colleges offering an MBA programme.' },
  { name: 'Government Premier', metric: SCORE, filter: c => c.type === 'Government' || c.type === 'Autonomous', note: 'Government and autonomous institutes.' },
  { name: 'Private Elite', metric: SCORE, filter: c => c.type === 'Deemed' || c.type === 'Private', note: 'Private and deemed universities.' },
  { name: 'High Value (Under ₹2L)', metric: ROI, filter: c => c.totalFees < 2, note: 'Tuition under ₹2L a year, by median-to-fee ratio.' },
];

const METHODOLOGY: [string, string, string][] = [
  ['Placement Outcomes', '30%', 'Audited placement %, median and average packages, recruiter tier distribution'],
  ['Return on Investment (ROI)', '20%', 'Salary-to-tuition ratio and estimated payback period in months'],
  ['Academic Quality & Faculty', '15%', 'Faculty-to-student ratio, PhD qualifications, citations and research grants'],
  ['Audited Student Sentiment', '15%', 'Verified student reviews across academics, campus life, and peer quality'],
  ['Reporting Transparency', '10%', 'Consistency of data submissions, RTI disclosures, and absence of misleading claims'],
  ['Campus & Living Experience', '10%', 'Laboratory infrastructure, sports grounds, residential hostels, and library holdings'],
];

export default function RankingsPage() {
  const reduce = useReducedMotion();
  const [activeName, setActiveName] = useState(CATEGORIES[0].name);
  const [showMethodology, setShowMethodology] = useState(false);
  const cat = CATEGORIES.find(c => c.name === activeName)!;
  const m = cat.metric;

  const ranked = COLLEGES.filter(c => (cat.filter ? cat.filter(c) : true)).sort((a, b) =>
    m.lowerIsBetter ? m.value(a) - m.value(b) : m.value(b) - m.value(a),
  );
  const rankedIds = new Set(ranked.map(c => c.id));

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <PageHeader
        label="Rankings · demo dataset"
        title={<>Rankings that move<br className="hidden sm:block" /> with your priorities.</>}
        description="Pick what matters. The list re-orders itself, and every position is backed by a number you can see."
        actions={
          <button
            onClick={() => setShowMethodology(true)}
            className="h-10 px-4 rounded-xl border border-line bg-surface text-sm inline-flex items-center gap-2 hover:border-ink-2 transition-colors cursor-pointer"
          >
            <Info size={15} /> Methodology & weights
          </button>
        }
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
        {/* Categories */}
        <div role="tablist" aria-label="Ranking category" className="flex gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {CATEGORIES.map(c => (
            <button
              key={c.name}
              role="tab"
              aria-selected={c.name === activeName}
              onClick={() => setActiveName(c.name)}
              className={cn(
                'relative h-10 px-4 rounded-lg text-[13.5px] whitespace-nowrap transition-colors cursor-pointer',
                c.name === activeName ? 'text-paper' : 'text-ink-2 hover:bg-surface',
              )}
            >
              {c.name === activeName && (
                <motion.span layoutId="rank-cat" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
              )}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* List */}
          <div className="lg:col-span-8">
            <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-ink">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={cat.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="text-sm text-muted">
                  {cat.note}
                </motion.p>
              </AnimatePresence>
              <span className="label shrink-0">{m.label}</span>
            </div>

            <LayoutGroup>
              <ol>
                <AnimatePresence initial={false} mode="popLayout">
                  {ranked.map((c, i) => {
                    const v = m.value(c);
                    const nirf = c.rankings.find(r => r.body === 'NIRF');
                    return (
                      <motion.li
                        key={c.id}
                        layout={reduce ? false : 'position'}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
                        transition={{ layout: { type: 'spring', stiffness: 360, damping: 34 }, duration: 0.3 }}
                        className="group relative border-b border-line hover:bg-surface transition-colors"
                      >
                        <div className="grid grid-cols-[2.75rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_10rem_5.5rem_auto] items-center gap-3 sm:gap-5 py-4 px-1 sm:px-3">
                          <span className={cn('font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] nums', i === 0 ? 'text-accent' : 'text-ink/30')}>
                            <AnimatedNumber value={i + 1} prefix={i + 1 < 10 ? '0' : ''} duration={0.35} />
                          </span>
                          <Link href={`/colleges/${c.id}`} className="min-w-0 flex items-center gap-3">
                            <Monogram name={c.shortName} size="sm" tone="paper" className="hidden sm:inline-flex" />
                            <span className="min-w-0">
                              <span className="block font-medium text-[15px] sm:text-base group-hover:text-accent transition-colors truncate">{c.shortName}</span>
                              <span className="block text-xs text-muted truncate">
                                {c.city}, {c.state}
                                {nirf ? ` · NIRF #${nirf.rank} ${nirf.category}` : ''}
                              </span>
                            </span>
                          </Link>
                          <span className="hidden sm:block h-[5px] rounded-full bg-paper-2 overflow-hidden">
                            <motion.span
                              className={cn('block h-full rounded-full origin-left', i === 0 ? 'bg-accent' : 'bg-ink/75')}
                              initial={false}
                              animate={{ scaleX: m.lowerIsBetter ? Math.max(0.06, 1 - v / m.max) : Math.min(1, v / m.max) }}
                              transition={{ duration: 0.55, ease: EASE_OUT }}
                            />
                          </span>
                          <span className="font-mono text-base sm:text-lg font-semibold nums text-right">
                            {m.fmt(v)}
                          </span>
                          <span className="hidden sm:flex items-center gap-2">
                            <SaveButton collegeId={c.id} collegeName={c.shortName} />
                            <Link
                              href={`/colleges/${c.id}`}
                              aria-label={`View ${c.shortName}`}
                              className="h-9 w-9 rounded-lg bg-ink text-paper inline-flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                            >
                              <ArrowUpRight size={15} />
                            </Link>
                          </span>
                        </div>
                        <div className="sm:hidden flex items-center gap-4 px-1 pb-4 -mt-1 pl-[3.5rem] text-xs text-muted nums">
                          <span>Score {c.realityScore}</span>
                          <span>{c.placementPercent}% placed</span>
                          <span>₹{c.medianPackage}L median</span>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ol>
            </LayoutGroup>

            {ranked.length === 0 && (
              <p className="py-12 text-muted">No colleges in the demo dataset fit this category yet.</p>
            )}
          </div>

          {/* Secondary visual: ROI vs placement */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 rounded-[22px] border border-line bg-surface p-6">
              <p className="label">Where each college sits</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">Placement vs. median-to-fee ratio</p>
              <ScatterPlot highlight={rankedIds} leader={ranked[0]?.id} />
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-line nums">
                <div>
                  <p className="label">In this view</p>
                  <p className="font-display text-3xl font-semibold"><AnimatedNumber value={ranked.length} /></p>
                </div>
                <div>
                  <p className="label">Avg. placement</p>
                  <p className="font-display text-3xl font-semibold">
                    <AnimatedNumber value={ranked.length ? ranked.reduce((s, c) => s + c.placementPercent, 0) / ranked.length : 0} suffix="%" />
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Methodology */}
      <AnimatePresence>
        {showMethodology && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMethodology(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-[80]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Reality Score methodology"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="fixed inset-x-4 top-[10vh] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[560px] z-[81] bg-paper rounded-[22px] border border-line p-6 sm:p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="label">Methodology</p>
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] mt-1">How the Reality Score is weighted</h2>
                </div>
                <button onClick={() => setShowMethodology(false)} aria-label="Close" className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:border-ink-2 cursor-pointer">
                  <X size={16} />
                </button>
              </div>
              <ul className="mt-6 space-y-4">
                {METHODOLOGY.map(([name, weight, desc]) => (
                  <li key={name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium">{name}</span>
                      <span className="font-mono text-sm nums">{weight}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-paper-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-accent origin-left rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: parseInt(weight, 10) / 30 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted">{desc}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted">Prototype: scores shown are demonstration values.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function ScatterPlot({ highlight, leader }: { highlight: Set<string>; leader?: string }) {
  const W = 300;
  const H = 220;
  const pad = 28;
  const x = (roi: number) => pad + (roi / 26) * (W - pad - 8);
  const y = (pl: number) => H - pad - ((pl - 75) / 25) * (H - pad - 10);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 w-full h-auto" role="img" aria-label="Scatter plot of placement rate against median-to-fee ratio">
      {[80, 90, 100].map(p => (
        <g key={p}>
          <line x1={pad} x2={W - 8} y1={y(p)} y2={y(p)} stroke="#e3e0d8" />
          <text x={pad - 6} y={y(p) + 3} textAnchor="end" className="fill-[#9a9ea6] font-mono text-[9px]">{p}%</text>
        </g>
      ))}
      {[0, 10, 20].map(r => (
        <text key={r} x={x(r)} y={H - 8} textAnchor="middle" className="fill-[#9a9ea6] font-mono text-[9px]">{r}×</text>
      ))}
      {COLLEGES.map(c => {
        const on = highlight.has(c.id);
        const lead = c.id === leader;
        return (
          <motion.g key={c.id} initial={false} animate={{ opacity: on ? 1 : 0.25 }} transition={{ duration: 0.3 }}>
            <circle cx={x(roiOf(c))} cy={y(c.placementPercent)} r={lead ? 7 : 5} className={lead ? 'fill-[#2b4fe0]' : 'fill-[#121417]'} />
            <text x={x(roiOf(c)) + (roiOf(c) > 18 ? -10 : 10)} y={y(c.placementPercent) + 3} textAnchor={roiOf(c) > 18 ? 'end' : 'start'} className="fill-[#2e333a] text-[9.5px]">
              {c.shortName.split(' ')[0]}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
