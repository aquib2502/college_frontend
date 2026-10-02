'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, CornerDownLeft } from 'lucide-react';
import HeroField from './HeroField';
import SaveButton from '@/components/saved/SaveButton';
import { EASE_OUT } from '@/components/motion/Reveal';
import { COLLEGES } from '@/lib/mockData';
import { EXAMPLE_QUERIES, explainMatch, interpretQuery, matchColleges, type Interpretation } from '@/lib/discovery';
import { TALL_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';

const TYPEWRITER = [
  'B.Tech colleges in Maharashtra under ₹8L',
  'MBA colleges with strong ROI',
  'Engineering near Mumbai with hostel',
  'Colleges with placements above 90%',
];

type Phase = 'idle' | 'thinking' | 'results';

function useTypewriter(active: boolean) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!active) return;
    const full = TYPEWRITER[i];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < full.length) t = setTimeout(() => setN(n + 1), 38);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 1900);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 16);
    else {
      t = setTimeout(() => {
        setDeleting(false);
        setI((i + 1) % TYPEWRITER.length);
      }, 180);
    }
    return () => clearTimeout(t);
  }, [active, i, n, deleting]);
  return TYPEWRITER[i].slice(0, n);
}

const TOP_RANKED = [...COLLEGES].sort((a, b) => b.realityScore - a.realityScore);

export default function HeroDiscovery({ onSeeAll }: { onSeeAll: (query: string) => void }) {
  const reduce = useReducedMotion();
  const tall = useMediaQuery(TALL_QUERY);
  const section = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const autoRan = useRef(false);
  const typing = useRef<ReturnType<typeof setInterval>>(undefined);
  const thinking = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [interp, setInterp] = useState<Interpretation | null>(null);
  const ghost = useTypewriter(query.length === 0 && phase === 'idle');

  const results = interp ? matchColleges(interp.constraints, interp.sort) : [];

  // Scroll scene: the question compresses, the answers rise, ranking lines draw in.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const prog = scrollYProgress;
  const scene = tall && !reduce;
  const contentY = useTransform(prog, [0, 1], [0, -96]);
  const headScale = useTransform(prog, [0, 1], [1, 0.9]);
  const headOpacity = useTransform(prog, [0, 0.7], [1, 0.2]);
  const consoleScale = useTransform(prog, [0, 1], [1, 0.97]);
  const ribbon = useTransform(prog, [0.25, 0.9], [0, 1]);

  useEffect(() => () => {
    clearInterval(typing.current);
    clearTimeout(thinking.current);
  }, []);

  function run(q: string) {
    const text = q.trim();
    if (!text) return;
    clearTimeout(thinking.current);
    setInterp(interpretQuery(text));
    setPhase('thinking');
    thinking.current = setTimeout(() => setPhase('results'), reduce ? 0 : 560);
  }

  function typeAndRun(q: string) {
    clearInterval(typing.current);
    if (reduce) {
      setQuery(q);
      run(q);
      return;
    }
    let k = 0;
    setPhase('idle');
    typing.current = setInterval(() => {
      k += 2;
      setQuery(q.slice(0, k));
      if (k >= q.length) {
        clearInterval(typing.current);
        setQuery(q);
        run(q);
      }
    }, 16);
  }

  // Scrolling past the first fold answers the example question if the visitor hasn't asked one.
  useMotionValueEvent(scrollYProgress, 'change', v => {
    if (!tall || reduce || autoRan.current || phase !== 'idle' || query) return;
    if (v > 0.1) {
      autoRan.current = true;
      typeAndRun(EXAMPLE_QUERIES[0].query);
    }
  });

  const enter = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d, ease: EASE_OUT } };

  return (
    <section ref={section} className="relative tall:h-[160vh]" aria-label="Find a college">
      <div className="relative tall:sticky tall:top-0 tall:h-screen overflow-hidden">
        {/* Atmosphere */}
        <div aria-hidden className="absolute inset-0 grain opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div aria-hidden className="absolute left-1/2 top-[-18%] h-[70%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(43,79,224,0.10),transparent)]" />
        <HeroField progress={prog} dim={phase !== 'idle'} />

        <div className={`relative h-full max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col pt-10 sm:pt-16 pb-16 tall:pb-0 transition-[padding] duration-500 ease-out ${phase === 'idle' ? 'tall:pt-[max(3rem,15vh)]' : 'tall:pt-[max(2.5rem,6vh)]'}`}>
          <motion.div style={scene ? { y: contentY } : undefined}>
          <motion.div style={scene ? { scale: headScale, opacity: headOpacity } : undefined} className="text-center origin-bottom">
            <motion.h1
              {...enter(0)}
              className="font-display font-semibold text-ink tracking-[-0.03em] leading-[0.94] text-[clamp(2.6rem,8vw,6.25rem)] tall:text-[clamp(3.5rem,min(7.4vw,10.5vh),6.5rem)]"
            >
              Find the college
              <br />
              that fits <span className="text-accent">your future.</span>
            </motion.h1>
            <motion.p {...enter(0.06)} className="mt-5 text-base sm:text-lg text-muted max-w-2xl mx-auto">
              Describe it in your own words. We&apos;ll turn it into criteria and show you who fits.
            </motion.p>
          </motion.div>

          {/* Search console */}
          <motion.div {...enter(0.12)} className="mt-8 sm:mt-10 w-full max-w-[860px] mx-auto">
            <motion.div style={scene ? { scale: consoleScale } : undefined} className="origin-top">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  run(query || TYPEWRITER[0]);
                }}
                className={`relative rounded-[22px] border bg-surface transition-[border-color,box-shadow] duration-300 ${
                  focused
                    ? 'border-accent/60 shadow-[0_0_0_5px_rgba(43,79,224,0.10),0_30px_70px_-30px_rgba(43,79,224,0.45)]'
                    : 'border-line-2/80 shadow-[0_1px_0_rgba(18,20,23,0.04),0_28px_60px_-34px_rgba(18,20,23,0.35)]'
                }`}
              >
                <div className="flex items-center justify-between px-5 sm:px-6 pt-4">
                  <span className="label flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${phase === 'thinking' ? 'bg-signal animate-pulse' : 'bg-accent'}`} />
                    Ask CollegeIQ
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10.5px] text-faint">
                    Enter <CornerDownLeft size={11} />
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-3 px-5 sm:px-6 pb-5 pt-2">
                  <div className="relative flex-1 min-w-0">
                    <label htmlFor="hero-q" className="sr-only">Describe the college you want</label>
                    <input
                      id="hero-q"
                      ref={input}
                      value={query}
                      onChange={e => {
                        clearInterval(typing.current);
                        setQuery(e.target.value);
                        if (phase !== 'idle') setPhase('idle');
                      }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      autoComplete="off"
                      className="w-full bg-transparent py-2 text-[19px] sm:text-[23px] tracking-[-0.015em] text-ink placeholder-transparent outline-none focus-visible:outline-none"
                    />
                    {query.length === 0 && (
                      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-[19px] sm:text-[23px] tracking-[-0.015em] text-faint truncate max-w-full">
                        {ghost}
                        <span className="ml-[2px] inline-block h-[1.05em] w-[2px] translate-y-[1px] bg-accent animate-caret" />
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="group shrink-0 h-12 pl-5 pr-2 rounded-[14px] bg-ink text-paper text-sm font-medium inline-flex items-center justify-between gap-3 hover:bg-accent transition-colors duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    Find colleges
                    <span className="h-8 w-8 rounded-[10px] bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight size={15} />
                    </span>
                  </button>
                </div>

                {/* Interpreted criteria */}
                <AnimatePresence initial={false}>
                  {phase !== 'idle' && interp && (
                    <motion.div
                      key="criteria"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="overflow-hidden border-t border-line"
                    >
                      <div className="px-5 sm:px-6 py-3.5 flex flex-wrap items-center gap-x-2 gap-y-2">
                        <span className="label mr-1">{phase === 'thinking' ? 'Interpreting your preferences…' : 'Understood as'}</span>
                        {interp.constraints.length === 0 && phase === 'results' && (
                          <span className="text-sm text-muted">No specific criteria — showing top-scored colleges.</span>
                        )}
                        {interp.constraints.map((c, i) => (
                          <motion.span
                            key={c.kind + c.value}
                            initial={reduce ? false : { opacity: 0, y: 6, filter: 'blur(3px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: i * 0.07, duration: 0.28 }}
                            className="inline-flex items-baseline gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-[13px]"
                          >
                            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{c.label}</span>
                            <span className="font-medium text-ink">{c.value}</span>
                          </motion.span>
                        ))}
                      </div>
                      {phase === 'thinking' && <div className="progress-line mx-5 sm:mx-6 mb-3" />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Example prompts */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              <span className="label mr-2">Try</span>
              {EXAMPLE_QUERIES.map((ex, i) => (
                <motion.button
                  key={ex.label}
                  type="button"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.35 }}
                  onClick={() => typeAndRun(ex.query)}
                  className="h-10 sm:h-8 px-3 rounded-full text-[13px] text-ink-2 hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors cursor-pointer"
                >
                  {ex.label}
                </motion.button>
              ))}
            </div>

            {/* Answers */}
            <div>
              <AnimatePresence mode="wait">
                {phase === 'results' && interp && (
                  <motion.div
                    key={interp.query}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="mt-6"
                  >
                    <div className="flex items-baseline justify-between px-1 mb-2">
                      <p className="text-sm text-ink">
                        <span className="figure font-semibold nums">{results.length}</span>{' '}
                        {results.length === 1 ? 'college matches' : 'colleges match'} your criteria
                      </p>
                      {results.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onSeeAll(interp.query)}
                          className="text-[13px] font-medium text-accent inline-flex items-center gap-1 hover:gap-1.5 transition-all cursor-pointer"
                        >
                          Refine &amp; see all <ArrowRight size={13} />
                        </button>
                      )}
                    </div>

                    {results.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-line-2 bg-surface/60 px-5 py-4 text-sm text-ink-2">
                        No colleges match all {interp.constraints.length} criteria.{' '}
                        <button onClick={() => onSeeAll(interp.query)} className="text-accent font-medium hover:underline cursor-pointer">
                          Relax them in the matcher →
                        </button>
                      </div>
                    ) : (
                      <ul className="rounded-2xl border border-line bg-surface divide-y divide-line overflow-hidden">
                        {results.slice(0, 3).map((c, i) => (
                          <motion.li
                            key={c.id}
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 + i * 0.07, duration: 0.38, ease: EASE_OUT }}
                            className="group relative flex items-center gap-4 px-4 sm:px-5 py-3 hover:bg-paper/70 transition-colors"
                          >
                            <span className="font-mono text-xs text-faint w-5 nums">{String(i + 1).padStart(2, '0')}</span>
                            <div className="min-w-0 flex-1">
                              <Link href={`/colleges/${c.id}`} className="font-medium text-ink group-hover:text-accent transition-colors after:absolute after:inset-0">
                                {c.shortName}
                              </Link>
                              <p className="text-xs text-muted truncate">
                                {explainMatch(c, interp.constraints).join(' · ') || `${c.city}, ${c.state}`}
                              </p>
                            </div>
                            <dl className="hidden sm:flex items-center gap-6 nums text-right">
                              <div>
                                <dt className="label !text-[9.5px]">Fee / yr</dt>
                                <dd className="figure font-medium text-sm">₹{c.totalFees}L</dd>
                              </div>
                              <div>
                                <dt className="label !text-[9.5px]">Median</dt>
                                <dd className="figure font-medium text-sm">₹{c.medianPackage}L</dd>
                              </div>
                              <div>
                                <dt className="label !text-[9.5px]">Placed</dt>
                                <dd className="figure font-medium text-sm">{c.placementPercent}%</dd>
                              </div>
                              <div>
                                <dt className="label !text-[9.5px]">Score</dt>
                                <dd className="figure text-sm font-semibold text-accent">{c.realityScore}</dd>
                              </div>
                            </dl>
                            <SaveButton collegeId={c.id} collegeName={c.shortName} className="relative z-10" />
                            <ArrowUpRight size={16} className="hidden sm:block text-faint group-hover:text-accent transition-colors" />
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </motion.div>

          {/* Ranking ribbon — the answer set drawing into the rankings below */}
          {tall && !reduce && (
            <motion.div style={{ opacity: ribbon }} className="absolute inset-x-4 sm:inset-x-8 bottom-0 pb-6 hidden tall:block bg-paper/80 backdrop-blur-[2px]" aria-hidden>
              <div className="flex items-end justify-between gap-6 border-t border-line pt-4">
                <span className="label shrink-0">Reality Score</span>
                {TOP_RANKED.map((c, i) => (
                  <div key={c.id} className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between font-mono text-[10.5px] text-muted">
                      <span className="truncate">{String(i + 1).padStart(2, '0')} {c.shortName}</span>
                      <span className="nums text-ink">{c.realityScore}</span>
                    </div>
                    <RibbonBar progress={ribbon} score={c.realityScore} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Each bar scales to its score as the ribbon progress goes 0 → 1.
function RibbonBar({ progress, score }: { progress: MotionValue<number>; score: number }) {
  const scaleX = useTransform(progress, [0, 1], [0, score / 100]);
  return (
    <div className="mt-1.5 h-[3px] rounded-full bg-line overflow-hidden">
      <motion.div className="h-full rounded-full bg-ink origin-left" style={{ scaleX }} />
    </div>
  );
}
