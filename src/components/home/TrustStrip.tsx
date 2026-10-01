'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import { EASE_OUT } from '@/components/motion/Reveal';

const METRICS = [
  { kind: 'number' as const, value: 2400, suffix: '+', label: 'Colleges', note: 'NIRF & state fee gazettes' },
  { kind: 'number' as const, value: 48000, suffix: '+', label: 'Student reviews', note: 'Enrolment-checked reviewers' },
  { kind: 'word' as const, word: 'Zero', label: 'Sponsored ranks', note: 'No paid placement in results' },
  { kind: 'word' as const, word: '₹0 hidden', label: 'True cost accounting', note: 'Hostel & deposits shown upfront' },
];

/** One horizontal trust band — four figures, counted in once. */
export default function TrustStrip() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Platform figures" className="border-y border-line bg-surface">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
              className={`py-8 sm:py-10 px-1 sm:px-6 ${i % 2 === 1 ? 'pl-5 border-l border-line' : ''} ${i > 0 ? 'lg:pl-6 lg:border-l lg:border-line' : 'lg:pl-0'} ${i > 1 ? 'border-t lg:border-t-0 border-line' : ''}`}
            >
              <p className="font-display text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.028em] leading-none text-ink nums">
                {m.kind === 'number' ? (
                  <AnimatedNumber value={m.value} suffix={m.suffix} grouped fromZero duration={1.1} />
                ) : (
                  m.word
                )}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">{m.label}</p>
              <p className="mt-1 text-xs text-muted">{m.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
