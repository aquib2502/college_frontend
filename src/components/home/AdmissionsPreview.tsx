'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AdmissionsTimeline from '@/components/admissions/AdmissionsTimeline';
import Reveal from '@/components/motion/Reveal';
import { getNextRound, getRoundStatus } from '@/lib/admissionsData';

export default function AdmissionsPreview() {
  const next = getNextRound();
  const status = next ? getRoundStatus(next) : null;

  return (
    <section className="py-20 sm:py-28 bg-surface border-y border-line" aria-labelledby="adm-title">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="label">Admissions · counselling rounds</p>
            <h2 id="adm-title" className="font-display mt-3 text-4xl sm:text-[3.5rem] font-semibold tracking-[-0.028em] leading-[0.98]">
              Know what&apos;s next, and what to do.
            </h2>
          </div>
          {next && status && (
            <div className="lg:col-span-5 lg:justify-self-end flex items-end gap-5">
              <div className="text-right">
                <p className="label">Next deadline</p>
                <p className="mt-1 text-[15px] font-medium">{next.shortName}</p>
                <p className="text-xs text-muted">{next.dates}</p>
              </div>
              <p className="font-display text-7xl font-semibold tracking-[-0.022em] leading-[0.8] text-accent nums">
                {status.days}
                <span className="block mt-1 font-mono text-[11px] tracking-[0.1em] text-muted uppercase text-right">
                  {status.status === 'open' ? 'days left' : 'days to go'}
                </span>
              </p>
            </div>
          )}
        </Reveal>

        <div className="mt-14">
          <AdmissionsTimeline />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-muted">Demo schedule — confirm every date on the official portal.</p>
          <Link href="/admissions" className="font-medium text-accent inline-flex items-center gap-1.5 hover:gap-2 transition-all">
            Admissions command center <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
