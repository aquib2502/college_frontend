'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { getCollegeById } from '@/lib/mockData';
import { COUNSELLING_SCHEDULE, getRoundStatus } from '@/lib/admissionsData';
import { useNow } from '@/hooks/useNow';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';

const coep = getCollegeById('coep')!;
const cap = COUNSELLING_SCHEDULE.find(r => r.id === 'c2')!;

/** "What we verify" — each column shows one checked fact for a single real record. */
export default function VerifySection() {
  const reduce = useReducedMotion();
  const grid = useRef<HTMLDivElement>(null);
  const inView = useInView(grid, { once: true, margin: '0px 0px -15% 0px' });
  const total = coep.totalFees + coep.hostelFees;
  const now = useNow();
  const capStatus = now ? getRoundStatus(cap, now) : { status: 'pending' as const, days: 0 };

  const grow = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { scaleX: 0 },
          animate: { scaleX: inView ? 1 : 0 },
          transition: { duration: 0.7, delay, ease: EASE_OUT },
        };

  const columns = [
    {
      title: 'Fees',
      source: 'Fee regulating authority · college disclosures',
      body: (
        <>
          <p className="figure text-4xl font-semibold tracking-[-0.022em] nums">₹{total.toFixed(1)}L<span className="text-base text-muted font-normal"> / yr</span></p>
          <div className="mt-4 flex h-2.5 rounded-full overflow-hidden bg-paper-2">
            <motion.span {...grow(0)} className="origin-left bg-ink" style={{ width: `${(coep.totalFees / total) * 100}%` }} />
            <motion.span {...grow(0.15)} className="origin-left bg-signal" style={{ width: `${(coep.hostelFees / total) * 100}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted nums">
            <span><i className="inline-block h-2 w-2 rounded-sm bg-ink mr-1.5" />Tuition ₹{coep.totalFees}L</span>
            <span><i className="inline-block h-2 w-2 rounded-sm bg-signal mr-1.5" />Hostel ₹{coep.hostelFees}L</span>
          </div>
        </>
      ),
    },
    {
      title: 'Placements',
      source: 'NIRF submissions · placement reports',
      body: (
        <>
          <p className="figure text-4xl font-semibold tracking-[-0.022em] nums">{coep.placementPercent}%<span className="text-base text-muted font-normal"> placed</span></p>
          <div className="mt-4 h-2.5 rounded-full bg-paper-2 overflow-hidden">
            <motion.div {...grow(0.05)} className="h-full origin-left bg-positive" style={{ width: `${coep.placementPercent}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted nums">
            {coep.placements.studentsPlaced.toLocaleString('en-IN')} of {coep.placements.totalStudents.toLocaleString('en-IN')} · median ₹{coep.medianPackage}L
          </p>
        </>
      ),
    },
    {
      title: 'Student experience',
      source: 'Enrolment-checked student reviews',
      body: (
        <>
          <p className="figure text-4xl font-semibold tracking-[-0.022em] nums">{coep.studentRating}<span className="text-base text-muted font-normal"> / 5</span></p>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} className="flex-1 h-2.5 rounded-sm bg-paper-2 overflow-hidden">
                <motion.span
                  {...grow(0.05 * n)}
                  className="block h-full origin-left bg-accent"
                  style={{ width: `${Math.max(0, Math.min(1, coep.studentRating - (n - 1))) * 100}%` }}
                />
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted nums">{coep.totalReviews.toLocaleString('en-IN')} reviews</p>
        </>
      ),
    },
    {
      title: 'Admissions',
      source: 'State CET Cell · JoSAA · institute portals',
      body: (
        <>
          <p className="figure text-4xl font-semibold tracking-[-0.022em] nums">
            {capStatus.status === 'pending' ? '—' : capStatus.status === 'upcoming' ? `${capStatus.days}d` : capStatus.status === 'open' ? 'Open' : 'Closed'}
            <span className="text-base text-muted font-normal"> {capStatus.status === 'upcoming' ? 'to go' : ''}</span>
          </p>
          <p className="mt-4 text-sm font-medium">{cap.shortName}</p>
          <p className="mt-1 text-xs text-muted">{cap.dates}</p>
        </>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-line" aria-labelledby="verify-title">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal className="grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="label">What we verify</p>
            <h2 id="verify-title" className="font-display mt-3 text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.028em] leading-[0.98]">
              Every number has a source.
            </h2>
          </div>
          <p className="lg:col-span-5 text-sm text-muted lg:text-right">
            Shown for <span className="text-ink font-medium">{coep.shortName}</span>. In this prototype the figures are demo data — the source line shows where each one comes from.
          </p>
        </Reveal>

        <div ref={grid} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-ink">
          {columns.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.07} className={`pt-6 pb-8 sm:pr-6 ${i > 0 ? 'lg:pl-6 lg:border-l lg:border-line' : ''} ${i % 2 === 1 ? 'sm:pl-6 sm:border-l sm:border-line lg:pl-6' : ''} border-b lg:border-b-0 border-line`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink">{String(i + 1).padStart(2, '0')} · {col.title}</p>
              <div className="mt-6">{col.body}</div>
              <p className="mt-6 pt-3 border-t border-dashed border-line-2 font-mono text-[10.5px] text-muted">
                Source — {col.source}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
