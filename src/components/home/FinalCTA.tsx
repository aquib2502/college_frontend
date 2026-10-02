'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { COLLEGES } from '@/lib/mockData';
import Monogram from '@/components/college/Monogram';
import { EASE_OUT } from '@/components/motion/Reveal';

export default function FinalCTA({ onStart }: { onStart: () => void }) {
  const reduce = useReducedMotion();
  const { savedColleges, setSavedOpen } = useApp();
  const saved = savedColleges.map(id => COLLEGES.find(c => c.id === id)).filter(Boolean).slice(0, 4) as typeof COLLEGES;

  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="cta-title">
      <div aria-hidden className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,79,224,0.35),transparent)]" />
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 py-24 sm:py-32">
        <motion.h2
          id="cta-title"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="font-display text-[3rem] sm:text-7xl lg:text-[6.5rem] font-semibold tracking-[-0.022em] leading-[0.9] max-w-[12ch]"
        >
          Choose with confidence.
        </motion.h2>


        <div className="mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onStart}
                className="group relative overflow-hidden h-14 pl-7 pr-2.5 rounded-2xl bg-white text-ink text-[15px] font-medium inline-flex items-center gap-4 cursor-pointer"
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(43,79,224,0.18),transparent)] group-hover:animate-[sweep_0.9s_ease-out]" />
                <span className="relative">Start your college search</span>
                <span className="relative h-9 w-9 rounded-xl bg-accent text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={16} />
                </span>
              </button>
              <Link
                href="/colleges"
                className="h-14 px-6 rounded-2xl border border-white/20 text-[15px] inline-flex items-center hover:border-white/50 hover:bg-white/5 transition-colors"
              >
                Explore all colleges
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/50">No sign-up required to explore.</p>
          </div>

          {saved.length > 0 && (
            <button
              onClick={() => setSavedOpen(true)}
              className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors cursor-pointer"
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/50">Your shortlist</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {saved.map(c => (
                    <Monogram key={c.id} name={c.shortName} size="sm" tone="paper" className="ring-2 ring-ink" />
                  ))}
                </div>
                <span className="text-sm">
                  {savedColleges.length} saved — <span className="text-[#9db0ff] group-hover:underline">compare and decide →</span>
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
