'use client';

import { useState } from 'react';
import { useNow } from '@/hooks/useNow';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatShortDate, getRoundStatus, sortedSchedule, type CounsellingRound } from '@/lib/admissionsData';
import { EASE_OUT } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

function statusText(round: CounsellingRound, now: Date | null) {
  if (!now) return ' ';
  const s = getRoundStatus(round, now);
  if (s.status === 'upcoming') return s.days === 0 ? 'Opens today' : `Opens in ${s.days} day${s.days === 1 ? '' : 's'}`;
  if (s.status === 'open') return s.days === 0 ? 'Closes today' : `Open · closes in ${s.days} day${s.days === 1 ? '' : 's'}`;
  return 'Closed';
}

/**
 * Milestones in date order. The selected milestone widens to show the
 * window, the action required and the official portal.
 */
export default function AdmissionsTimeline({ rounds = sortedSchedule(), tone = 'light' }: { rounds?: CounsellingRound[]; tone?: 'light' | 'dark' }) {
  const reduce = useReducedMotion();
  const now = useNow();
  const [picked, setActiveId] = useState<string | null>(null);
  const firstLive = now ? rounds.find(r => getRoundStatus(r, now).status !== 'closed')?.id : undefined;
  const activeId = picked ?? firstLive ?? rounds[0]?.id;
  const dark = tone === 'dark';

  return (
    <div className="relative">
      <ol className="flex flex-col md:flex-row md:items-stretch">
        {rounds.map((r, i) => {
          const active = r.id === activeId;
          const status = now ? getRoundStatus(r, now).status : 'upcoming';
          const start = formatShortDate(r.startDate);
          return (
            <motion.li
              key={r.id}
              layout={reduce ? false : true}
              transition={{ layout: { duration: 0.35, ease: EASE_OUT } }}
              style={{ flexGrow: active ? 2.2 : 1, flexBasis: 0 }}
              className="relative min-w-0 pl-8 md:pl-0 pb-8 md:pb-0"
            >
              {/* Track segment */}
              <span aria-hidden className={cn('absolute left-[7px] md:left-0 top-0 bottom-0 md:bottom-auto md:top-[7px] w-px md:w-full md:h-px', dark ? 'bg-white/15' : 'bg-line')} />
              <motion.span
                aria-hidden
                className={cn('absolute left-[7px] md:left-0 top-0 md:top-[7px] w-px h-full md:h-px md:w-full origin-top md:origin-left', dark ? 'bg-white' : 'bg-ink')}
                initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
                whileInView={{ scaleX: 1, scaleY: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.45, delay: i * 0.18, ease: EASE_OUT }}
              />
              <motion.button
                type="button"
                onClick={() => setActiveId(r.id)}
                aria-expanded={active}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.18, ease: EASE_OUT }}
                className="relative block w-full text-left md:pr-6 cursor-pointer"
              >
                <span
                  className={cn(
                    'absolute -left-8 md:left-0 top-0 h-[15px] w-[15px] rounded-full border-2 transition-colors',
                    status === 'closed'
                      ? dark ? 'bg-white/30 border-white/30' : 'bg-line-2 border-line-2'
                      : active
                        ? 'bg-accent border-accent'
                        : dark ? 'bg-night border-white' : 'bg-paper border-ink',
                  )}
                />
                <span className="block md:pt-8">
                  <span className={cn('font-mono text-[11px] uppercase tracking-[0.1em]', dark ? 'text-white/50' : 'text-muted')}>{start.month}</span>
                  <span className={cn('block figure text-5xl font-semibold tracking-[-0.032em] leading-none nums', active ? (dark ? 'text-white' : 'text-ink') : dark ? 'text-white/40' : 'text-ink/35')}>
                    {start.day}
                  </span>
                  <span className={cn('mt-3 block text-[15px] font-medium', dark ? 'text-white' : 'text-ink')}>{r.shortName}</span>
                  <span className={cn('block text-xs mt-0.5', status === 'open' ? 'text-positive' : dark ? 'text-white/50' : 'text-muted')}>{statusText(r, now)}</span>
                </span>
              </motion.button>

              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    key="more"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                    className="overflow-hidden md:pr-6"
                  >
                    <dl className={cn('mt-4 pt-4 border-t space-y-3 text-sm', dark ? 'border-white/10' : 'border-line')}>
                      <div>
                        <dt className={cn('font-mono text-[10px] uppercase tracking-[0.1em]', dark ? 'text-white/45' : 'text-muted')}>Window</dt>
                        <dd className="nums">{r.dates}</dd>
                      </div>
                      <div>
                        <dt className={cn('font-mono text-[10px] uppercase tracking-[0.1em]', dark ? 'text-white/45' : 'text-muted')}>Action required</dt>
                        <dd>{r.action}</dd>
                      </div>
                      <div>
                        <dt className={cn('font-mono text-[10px] uppercase tracking-[0.1em]', dark ? 'text-white/45' : 'text-muted')}>{r.system}</dt>
                        <dd>
                          <a
                            href={r.actionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={cn('inline-flex items-center gap-1 font-medium hover:underline', dark ? 'text-[#9db0ff]' : 'text-accent')}
                          >
                            Official portal <ArrowUpRight size={13} />
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
