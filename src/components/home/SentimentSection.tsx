'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { INITIAL_REVIEWS, THEMES_CONCERNS, THEMES_LIKE, type CollegeReview } from '@/lib/reviewsData';
import Reveal, { EASE_OUT } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

const TOPICS = [
  { id: 'faculty', label: 'Faculty', match: /faculty|professor/i, rating: (r: CollegeReview) => r.facultyRating },
  { id: 'placements', label: 'Placements', match: /placement|placed|packages?/i, rating: (r: CollegeReview) => r.placementRating },
  { id: 'hostel', label: 'Hostel', match: /hostel/i, rating: (r: CollegeReview) => r.hostelRating },
  { id: 'campus', label: 'Campus', match: /campus|clubs?|library|sports/i, rating: (r: CollegeReview) => r.campusRating },
  { id: 'roi', label: 'ROI', match: /fee|roi|afford/i, rating: (r: CollegeReview) => r.roiRating },
] as const;

function splitSentences(text: string) {
  return text.match(/[^.!?]+[.!?]+(\s|$)/g)?.map(s => s.trim()) ?? [text];
}

/** Pick the most-helpful review that actually talks about the topic, and the sentence that does. */
function excerptFor(topicId: (typeof TOPICS)[number]['id']) {
  const topic = TOPICS.find(t => t.id === topicId)!;
  const ranked = [...INITIAL_REVIEWS].sort((a, b) => b.helpfulCount - a.helpfulCount);
  for (const r of ranked) {
    const sentences = splitSentences(r.experience);
    const hit = sentences.findIndex(s => topic.match.test(s));
    if (hit >= 0) return { review: r, sentences, hit, rating: topic.rating(r) };
  }
  const r = ranked[0];
  return { review: r, sentences: splitSentences(r.experience), hit: -1, rating: topic.rating(r) };
}

export default function SentimentSection() {
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState<(typeof TOPICS)[number]['id']>('faculty');
  const ex = excerptFor(topic);

  return (
    <section className="py-20 sm:py-28 border-t border-line" aria-labelledby="sentiment-title">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="label">Student sentiment</p>
            <h2 id="sentiment-title" className="font-display mt-3 text-4xl sm:text-[3.5rem] font-semibold tracking-[-0.028em] leading-[0.98]">
              What students like.
              <br />
              <span className="text-muted">What they warn you about.</span>
            </h2>
          </div>
          <Link href="/reviews" className="text-sm font-medium text-accent inline-flex items-center gap-1.5 hover:gap-2 transition-all">
            Open the review explorer <ArrowRight size={14} />
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Patterns */}
          <div className="lg:col-span-5 space-y-10">
            <ThemeList title="What students like" tone="positive" items={THEMES_LIKE.map(t => ({ name: t.name, pct: t.pct, mentions: t.mentions, note: t.highlight }))} unit="positive" />
            <ThemeList title="What students warn about" tone="caution" items={THEMES_CONCERNS.map(t => ({ name: t.name, pct: t.pct, mentions: t.mentions, note: t.concern }))} unit="flagged" />
          </div>

          {/* Actual review */}
          <Reveal delay={0.08} className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-9 min-h-[460px] flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <p className="label">Read what they said about</p>
                <p className="font-mono text-[10.5px] text-faint hidden sm:block">Demo reviews</p>
              </div>
              <div role="tablist" aria-label="Review topic" className="mt-3 flex flex-wrap gap-1.5">
                {TOPICS.map(t => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={topic === t.id}
                    onClick={() => setTopic(t.id)}
                    className={cn(
                      'relative h-9 px-3.5 rounded-lg text-[13px] transition-colors cursor-pointer',
                      topic === t.id ? 'text-paper' : 'text-ink-2 hover:bg-paper',
                    )}
                  >
                    {topic === t.id && (
                      <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={topic + ex.review.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="mt-8 flex-1 flex flex-col"
                >
                  <blockquote className="font-display text-xl sm:text-[1.6rem] leading-[1.35] tracking-[-0.02em] text-faint">
                    &ldquo;
                    {ex.sentences.map((s, i) => (
                      <span key={i} className={i === ex.hit ? 'text-ink' : undefined}>
                        {i === ex.hit ? (
                          <mark className="bg-transparent bg-[linear-gradient(transparent_60%,#d6defc_60%)] text-ink">{s}</mark>
                        ) : (
                          s
                        )}
                        {i < ex.sentences.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                    &rdquo;
                  </blockquote>
                  <figcaption className="mt-auto pt-8 flex flex-wrap items-end justify-between gap-4 border-t border-line">
                    <div className="pt-4">
                      <Link href={`/colleges/${ex.review.collegeId}`} className="font-medium hover:text-accent transition-colors">
                        {ex.review.collegeName}
                      </Link>
                      <p className="text-sm text-muted mt-0.5">
                        {ex.review.studentType} · {ex.review.course} · Batch {ex.review.batch}
                      </p>
                    </div>
                    <div className="pt-4 text-right">
                      <p className="label">{TOPICS.find(t => t.id === topic)!.label} rating</p>
                      <p className="font-mono text-2xl font-semibold nums">
                        {ex.rating.toFixed(1)}<span className="text-sm text-muted font-normal"> / 5</span>
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ThemeList({
  title,
  tone,
  items,
  unit,
}: {
  title: string;
  tone: 'positive' | 'caution';
  items: { name: string; pct: number; mentions: number; note: string }[];
  unit: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div>
      <p className={cn('font-mono text-[11px] uppercase tracking-[0.1em]', tone === 'positive' ? 'text-positive' : 'text-caution')}>{title}</p>
      <ul className="mt-4 space-y-5">
        {items.map((t, i) => (
          <li key={t.name}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[15px] font-medium">{t.name}</span>
              <span className="font-mono text-sm nums shrink-0">
                {t.pct}% <span className="text-faint text-xs">{unit}</span>
              </span>
            </div>
            <div className="mt-2 h-[6px] rounded-full bg-paper-2 overflow-hidden">
              <motion.div
                className={cn('h-full rounded-full origin-left', tone === 'positive' ? 'bg-positive' : 'bg-caution')}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: t.pct / 100 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE_OUT }}
                style={reduce ? { transform: `scaleX(${t.pct / 100})` } : undefined}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted">
              {t.note} <span className="text-faint">· {t.mentions.toLocaleString('en-IN')} mentions</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
