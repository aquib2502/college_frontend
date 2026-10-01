'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EXAMPLE_QUERIES, interpretQuery, matchColleges } from '@/lib/discovery';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';

const example = EXAMPLE_QUERIES[0].query;
const exampleInterp = interpretQuery(example);
const exampleMatches = matchColleges(exampleInterp.constraints, exampleInterp.sort);

/** The product loop, with each step showing the visitor's live state. */
export default function HowItWorks() {
  const reduce = useReducedMotion();
  const { savedColleges, compareList, setSavedOpen } = useApp();

  const steps = [
    {
      name: 'Search',
      live: <span>&ldquo;{example}&rdquo;</span>,
      action: { label: 'Ask', href: '#matcher' },
    },
    {
      name: 'Match',
      live: <span><b className="font-mono nums">{exampleMatches.length}</b> colleges · {exampleInterp.constraints.length} criteria</span>,
      action: { label: 'See matches', href: '#matcher' },
    },
    {
      name: 'Shortlist',
      live: <span><b className="font-mono nums">{savedColleges.length}</b> saved</span>,
      action: { label: 'Open shortlist', onClick: () => setSavedOpen(true) },
    },
    {
      name: 'Compare',
      live: <span><b className="font-mono nums">{compareList.length}</b> side by side</span>,
      action: { label: 'Compare', href: '/compare' },
    },
    {
      name: 'Decide',
      live: <span>Trade-offs, deadlines, documents</span>,
      action: { label: 'Admissions', href: '/admissions' },
    },
  ];

  return (
    <section className="py-20 sm:py-24" aria-labelledby="how-title">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal>
          <p className="label">How it works</p>
          <h2 id="how-title" className="font-display mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.028em] leading-[0.98]">
            One question in. A decision out.
          </h2>
        </Reveal>

        <div className="relative mt-12">
          {/* Rail */}
          <div aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-line hidden md:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[7px] h-px bg-ink origin-left hidden md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
          <ol className="grid md:grid-cols-5 gap-8 md:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.4, delay: 0.12 + i * 0.12, ease: EASE_OUT }}
                className="relative pl-6 md:pl-0 border-l md:border-l-0 border-line"
              >
                <span className={`absolute -left-[7.5px] md:left-0 top-0 h-[15px] w-[15px] rounded-full border-2 ${i === steps.length - 1 ? 'bg-accent border-accent' : 'bg-paper border-ink'}`} />
                <p className="md:mt-7 font-mono text-[10.5px] text-faint nums">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display text-2xl font-semibold tracking-[-0.03em]">{s.name}</p>
                <p className="mt-2 text-sm text-ink-2 min-h-10 line-clamp-2">{s.live}</p>
                {'href' in s.action && s.action.href ? (
                  <Link href={s.action.href} className="mt-3 inline-block text-[13px] font-medium text-accent hover:underline">
                    {s.action.label} →
                  </Link>
                ) : (
                  <button onClick={'onClick' in s.action ? s.action.onClick : undefined} className="mt-3 text-[13px] font-medium text-accent hover:underline cursor-pointer">
                    {s.action.label} →
                  </button>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
