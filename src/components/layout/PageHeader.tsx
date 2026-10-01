'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_OUT } from '@/components/motion/Reveal';

/** Shared editorial page header for product pages. */
export default function PageHeader({
  label,
  title,
  description,
  actions,
  children,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const enter = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: d, ease: EASE_OUT } };

  return (
    <section className="border-b border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <motion.p {...enter(0)} className="label">{label}</motion.p>
            <motion.h1
              {...enter(0.04)}
              className="font-display mt-3 text-[2.5rem] sm:text-6xl font-semibold tracking-[-0.028em] leading-[0.98] text-ink"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p {...enter(0.08)} className="mt-4 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                {description}
              </motion.p>
            )}
          </div>
          {actions && <motion.div {...enter(0.12)} className="flex flex-wrap items-center gap-2">{actions}</motion.div>}
        </div>
        {children}
      </div>
    </section>
  );
}
