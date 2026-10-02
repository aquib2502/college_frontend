'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SPECIALIZATIONS } from '@/lib/specializations';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

const MAX_MEDIAN = 12;

/**
 * Outcome curve: rises from entry to the track's median CTC; its steepness
 * reflects placement rate. Same command structure for every track so the
 * path morphs smoothly between selections.
 */
function trajectory(median: number, placement: number) {
  const end = 88 - (median / MAX_MEDIAN) * 64; // 0..100 viewBox, lower = higher pay
  const knee = 58 - (placement - 75) * 0.9;
  return `M 0 92 C 18 92, 30 90, 40 ${84 - (placement - 75) * 0.4} S ${knee} ${end + 10}, 72 ${end + 3} S 92 ${end}, 100 ${end}`;
}

export default function SpecializationExplorer() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const spec = SPECIALIZATIONS[index];
  const endY = 88 - (spec.medianPackage / MAX_MEDIAN) * 64;

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex(i => (i + 1) % SPECIALIZATIONS.length);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex(i => (i - 1 + SPECIALIZATIONS.length) % SPECIALIZATIONS.length);
    }
  }

  return (
    <section className="py-20 sm:py-28" aria-labelledby="spec-title">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="label">Explore by specialization</p>
            <h2 id="spec-title" className="font-display mt-3 text-4xl sm:text-[3.5rem] font-semibold tracking-[-0.028em] leading-[0.98]">
              Where each path leads.
            </h2>
          </div>
          <p className="text-sm text-muted max-w-xs">Median CTC and placement rate across colleges offering each track.</p>
        </Reveal>

        <Reveal y={16}>
          <div className="relative overflow-hidden rounded-[28px] bg-night text-white min-h-[600px] lg:min-h-[620px] isolate">
            {/* Imagery */}
            <AnimatePresence initial={false}>
              <motion.img
                key={spec.id}
                src={spec.image}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 0.22, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale"
              />
            </AnimatePresence>
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#0e1013_30%,rgba(14,16,19,0.7)_65%,rgba(14,16,19,0.4))]" />

            {/* Trajectory */}
            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[44%] w-full -z-10">
              {[25, 50, 75].map(y => (
                <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="white" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
              ))}
              <motion.path
                initial={false}
                animate={{ d: trajectory(spec.medianPackage, spec.placementRate) }}
                transition={{ duration: reduce ? 0 : 0.8, ease: EASE_OUT }}
                fill="none"
                stroke="#5b7bff"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                initial={false}
                animate={{ d: trajectory(spec.medianPackage, spec.placementRate) + ' L 100 100 L 0 100 Z' }}
                transition={{ duration: reduce ? 0 : 0.8, ease: EASE_OUT }}
                fill="url(#traj-fill)"
              />
              <defs>
                <linearGradient id="traj-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2b4fe0" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2b4fe0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* End-point marker, positioned in % to match the viewBox */}
            <motion.div
              aria-hidden
              className="absolute right-0 -z-10 hidden sm:block"
              initial={false}
              animate={{ bottom: `${(100 - endY) * 0.44}%` }}
              transition={{ duration: reduce ? 0 : 0.8, ease: EASE_OUT }}
            >
              <div className="relative -mb-[5px] mr-6 flex items-center gap-2">
                <span className="font-mono text-[11px] text-white/70 nums">₹{spec.medianPackage}L median</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#5b7bff] ring-4 ring-[#5b7bff]/25" />
              </div>
            </motion.div>

            <div className="relative grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-14 p-6 sm:p-10 lg:p-12">
              {/* Selector */}
              <div
                role="tablist"
                aria-label="Specializations"
                aria-orientation="vertical"
                onKeyDown={onKey}
                className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none -mx-2 px-2 lg:mx-0 lg:px-0"
              >
                {SPECIALIZATIONS.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === index}
                    tabIndex={i === index ? 0 : -1}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'group relative shrink-0 text-left rounded-xl px-4 py-3 lg:py-4 transition-colors cursor-pointer',
                      i === index ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]',
                    )}
                  >
                    {i === index && (
                      <motion.span
                        layoutId="spec-rail"
                        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#5b7bff] hidden lg:block"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                    <span className="font-mono text-[10.5px] text-white/40 nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cn('block text-[15px] font-medium whitespace-nowrap transition-colors', i === index ? 'text-white' : 'text-white/55 group-hover:text-white/80')}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Detail */}
              <div className="min-w-0" role="tabpanel" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={spec.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                  >
                    <h3 className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold tracking-[-0.032em] leading-[0.92] max-w-[12ch]">
                      {spec.title}
                    </h3>
                    <p className="mt-5 text-base sm:text-lg text-white/65 max-w-md">{spec.description}</p>
                  </motion.div>
                </AnimatePresence>

                <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg nums">
                  <div>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">Median CTC</dt>
                    <dd className="mt-1 figure text-3xl sm:text-4xl font-semibold tracking-[-0.03em]">
                      <AnimatedNumber value={spec.medianPackage} decimals={1} prefix="₹" suffix="L" />
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">Placement</dt>
                    <dd className="mt-1 flex items-center gap-2.5">
                      <Ring value={spec.placementRate} />
                      <span className="figure text-3xl sm:text-4xl font-semibold tracking-[-0.03em]">
                        <AnimatedNumber value={spec.placementRate} suffix="%" />
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">Colleges</dt>
                    <dd className="mt-1 figure text-3xl sm:text-4xl font-semibold tracking-[-0.03em]">
                      <AnimatedNumber value={spec.collegesCount} />
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/colleges?q=${encodeURIComponent(spec.title)}`}
                  className="group mt-10 inline-flex items-center gap-3 h-12 pl-5 pr-2 rounded-[14px] bg-white text-ink text-sm font-medium hover:bg-[#dfe5ff] transition-colors"
                >
                  Explore {spec.short} colleges
                  <span className="h-8 w-8 rounded-[10px] bg-ink text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Ring({ value }: { value: number }) {
  const r = 11;
  const c = 2 * Math.PI * r;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="-rotate-90">
      <circle cx="14" cy="14" r={r} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="3" />
      <motion.circle
        cx="14"
        cy="14"
        r={r}
        fill="none"
        stroke="#3fc495"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
    </svg>
  );
}
