'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bell, BellRing } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import AdmissionsTimeline from '@/components/admissions/AdmissionsTimeline';
import DocumentChecklist from '@/components/admissions/DocumentChecklist';
import Reveal from '@/components/motion/Reveal';
import { useToast } from '@/components/ui/Toast';
import {
  ADMISSION_STEPS,
  getNextRound,
  getRoundStatus,
  sortedSchedule,
  type CounsellingSystem,
} from '@/lib/admissionsData';
import { cn } from '@/lib/utils';
import { useNow } from '@/hooks/useNow';

const FILTERS: ('ALL' | CounsellingSystem)[] = ['ALL', 'JoSAA / CSAB', 'MHT-CET CAP', 'Direct Institutional'];

export default function AdmissionsPage() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');
  const [reminders, setReminders] = useState<string[]>(['c1']);

  const now = useNow();
  const next = now ? getNextRound(now) : null;
  const nextStatus = next && now ? getRoundStatus(next, now) : null;
  const rounds = sortedSchedule().filter(r => filter === 'ALL' || r.system === filter);

  function toggleReminder(id: string, name: string) {
    const on = reminders.includes(id);
    setReminders(prev => (on ? prev.filter(r => r !== id) : [...prev, id]));
    showToast(on ? `Reminder removed for ${name}` : `Reminder set for ${name}`);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <PageHeader
        label="Admissions · academic year 2026–27"
        title="Your admissions command center."
        description="Counselling rounds, what each one needs from you, and the documents to have ready."
        actions={
          <>
            <Link href="/admission-probability" className="h-10 px-4 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent transition-colors">
              Admission odds <ArrowRight size={14} />
            </Link>
            <Link href="/student/deadlines" className="h-10 px-4 rounded-xl border border-line bg-surface text-sm inline-flex items-center hover:border-ink-2 transition-colors">
              My deadlines
            </Link>
          </>
        }
      />

      {/* Next deadline */}
      {next && nextStatus && (
        <section className="bg-ink text-paper">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-12">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/50">Next deadline</p>
              <p className="figure text-7xl sm:text-8xl font-semibold tracking-[-0.035em] leading-[0.85] nums mt-2">
                {nextStatus.days}
                <span className="text-2xl text-paper/50 ml-2 tracking-normal">{nextStatus.status === 'open' ? 'days left' : 'days'}</span>
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold tracking-[-0.015em]">{next.roundName}</p>
              <p className="mt-2 text-paper/65">{next.action}</p>
              <p className="mt-1 font-mono text-xs text-paper/45 nums">{next.dates}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleReminder(next.id, next.shortName)}
                aria-pressed={reminders.includes(next.id)}
                className={cn(
                  'h-11 px-4 rounded-xl text-sm inline-flex items-center gap-2 transition-colors cursor-pointer',
                  reminders.includes(next.id) ? 'bg-white text-ink' : 'border border-white/25 hover:border-white/60',
                )}
              >
                {reminders.includes(next.id) ? <BellRing size={15} /> : <Bell size={15} />}
                {reminders.includes(next.id) ? 'Reminder on' : 'Remind me'}
              </button>
              <a
                href={next.actionUrl}
                target="_blank"
                rel="noreferrer"
                className="h-11 px-4 rounded-xl bg-accent text-white text-sm inline-flex items-center gap-2 hover:bg-accent-deep transition-colors"
              >
                Official portal <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Timeline */}
        <section className="py-16 sm:py-20" aria-labelledby="timeline-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <div>
              <p className="label">Timeline</p>
              <h2 id="timeline-title" className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.015em]">October, round by round.</h2>
            </div>
            <div role="tablist" aria-label="Counselling system" className="flex gap-1 overflow-x-auto scrollbar-none">
              {FILTERS.map(f => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn('relative h-9 px-3.5 rounded-lg text-[13px] whitespace-nowrap transition-colors cursor-pointer', filter === f ? 'text-paper' : 'text-ink-2 hover:bg-surface')}
                >
                  {filter === f && <motion.span layoutId="adm-filter" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                  <span className="relative">{f === 'ALL' ? 'All rounds' : f}</span>
                </button>
              ))}
            </div>
          </div>

          <AdmissionsTimeline key={filter} rounds={rounds} />

          {/* Reminders */}
          <ul className="mt-14 border-t border-ink">
            {rounds.map(r => {
              const s = now ? getRoundStatus(r, now) : null;
              const on = reminders.includes(r.id);
              return (
                <li key={r.id} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-6 py-4 border-b border-line">
                  <div>
                    <p className="font-medium">{r.roundName}</p>
                    <p className="text-sm text-muted">{r.system} · {r.dates}</p>
                  </div>
                  <span className={cn('font-mono text-xs nums', s?.status === 'open' ? 'text-positive' : 'text-muted')}>
                    {!s ? ' ' : s.status === 'upcoming' ? `in ${s.days}d` : s.status === 'open' ? `open · ${s.days}d left` : 'closed'}
                  </span>
                  <button
                    onClick={() => toggleReminder(r.id, r.shortName)}
                    aria-pressed={on}
                    className={cn('h-9 px-3 rounded-lg text-xs inline-flex items-center gap-1.5 border transition-colors cursor-pointer justify-self-start', on ? 'bg-caution-soft border-caution/30 text-caution' : 'border-line hover:border-ink-2')}
                  >
                    {on ? <BellRing size={13} /> : <Bell size={13} />}
                    {on ? 'Reminder set' : 'Set reminder'}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Documents + choice filling */}
        <section className="pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14" aria-label="Preparation">
          <Reveal className="lg:col-span-7">
            <p className="label">Documents</p>
            <h2 className="mt-2 mb-6 text-3xl sm:text-4xl font-semibold tracking-[-0.015em]">Have these ready.</h2>
            <DocumentChecklist />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5 space-y-6">
            <div className="rounded-[22px] bg-surface border border-line p-6 sm:p-7">
              <p className="label">Choice filling</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.015em]">Order your preferences with your odds in view.</p>
              <p className="mt-2 text-sm text-muted">
                Use the college finder to shortlist by fit, then check each option&apos;s admission probability before you lock your order.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/ai-college-finder" className="h-10 px-4 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent transition-colors">
                  Open the finder <ArrowRight size={14} />
                </Link>
                <Link href="/admission-probability" className="h-10 px-4 rounded-xl border border-line text-sm inline-flex items-center hover:border-ink-2 transition-colors">
                  Check odds
                </Link>
              </div>
            </div>

            <div>
              <p className="label mb-3">How a counselling round runs</p>
              <ol className="border-l border-line ml-1.5">
                {ADMISSION_STEPS.map(s => (
                  <li key={s.step} className="relative pl-6 pb-5 last:pb-0">
                    <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-ink" />
                    <p className="text-[15px] font-medium"><span className="font-mono text-xs text-muted mr-2">{s.step}</span>{s.title}</p>
                    <p className="text-sm text-muted mt-0.5">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        <p className="pb-12 text-xs text-faint">Demo schedule for this prototype — always confirm dates on the official counselling portals.</p>
      </div>

      <Footer />
    </div>
  );
}
