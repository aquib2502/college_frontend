'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { INITIAL_REVIEWS, THEMES_CONCERNS, THEMES_LIKE } from '@/lib/reviewsData';
import { ThemeList } from '@/components/home/SentimentSection';
import { EASE_OUT } from '@/components/motion/Reveal';

const DIMENSIONS = [
  { label: 'Faculty', key: 'facultyRating' },
  { label: 'Placement', key: 'placementRating' },
  { label: 'Infrastructure', key: 'infrastructureRating' },
  { label: 'Hostel', key: 'hostelRating' },
  { label: 'Campus life', key: 'campusRating' },
  { label: 'ROI', key: 'roiRating' },
] as const;

/** Research-style summary: likes, warnings, then the emerging pattern. */
export default function SentimentResearch() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reduce ? 0 : 360);
    return () => clearTimeout(t);
  }, [reduce]);

  const averages = DIMENSIONS.map(d => ({
    ...d,
    avg: INITIAL_REVIEWS.reduce((s, r) => s + r[d.key], 0) / INITIAL_REVIEWS.length,
  })).sort((a, b) => b.avg - a.avg);

  if (loading) {
    return (
      <div className="mb-14" aria-live="polite">
        <p className="label">Aggregating sentiment…</p>
        <div className="mt-6 grid lg:grid-cols-3 gap-10">
          {[0, 1, 2].map(i => (
            <div key={i} className="space-y-4">
              {[0, 1, 2, 3].map(j => (
                <div key={j} className="space-y-2">
                  <div className="skeleton h-3 w-2/3" />
                  <div className="skeleton h-1.5 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Sentiment summary" className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
      <ThemeList
        title="What students like"
        tone="positive"
        unit="positive"
        items={THEMES_LIKE.map(t => ({ name: t.name, pct: t.pct, mentions: t.mentions, note: t.highlight }))}
      />
      <ThemeList
        title="What students warn about"
        tone="caution"
        unit="flagged"
        items={THEMES_CONCERNS.map(t => ({ name: t.name, pct: t.pct, mentions: t.mentions, note: t.concern }))}
      />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">What patterns emerge</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
          Students broadly praise faculty accessibility, peer learning cultures and campus placement drives — particularly in Computer
          Engineering and Data Science. The most recurrent friction points are hostel allotment limits for outstation students and
          administrative response times.
        </p>

        <p className="label mt-8">Average rating across {INITIAL_REVIEWS.length} demo reviews</p>
        <ul className="mt-3 space-y-2.5">
          {averages.map((d, i) => (
            <li key={d.key} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3">
              <span className="text-sm text-ink-2">{d.label}</span>
              <span className="relative h-[6px] rounded-full bg-paper-2 overflow-hidden">
                <motion.span
                  className={`absolute inset-y-0 left-0 rounded-full ${d.avg >= 4.5 ? 'bg-positive' : d.avg >= 4 ? 'bg-ink' : 'bg-caution'}`}
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${(d.avg / 5) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_OUT }}
                />
              </span>
              <span className="figure font-medium text-sm text-right nums">{d.avg.toFixed(1)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-faint">Demo reviews in this prototype; patterns are illustrative.</p>
      </div>
    </section>
  );
}
