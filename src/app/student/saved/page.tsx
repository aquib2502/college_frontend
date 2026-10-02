'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Plus, Share2, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import Monogram from '@/components/college/Monogram';
import { EASE_OUT } from '@/components/motion/Reveal';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { ADMISSION_UPDATES, COLLEGES, simulateAIMatch, STUDENT_PROFILE, type College } from '@/lib/mockData';
import { formatPackage, cn } from '@/lib/utils';

/** Dated admission item for a college, if the demo data has one. */
function deadlineFor(c: College) {
  const u = ADMISSION_UPDATES.find(a => a.college === c.shortName);
  if (!u) return null;
  return { title: u.title, date: new Date(u.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) };
}

export default function SavedCollegesPage() {
  const { savedColleges, toggleSave, addToCompare, removeFromCompare, compareList } = useApp();
  const { showToast } = useToast();
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [applyCollege, setApplyCollege] = useState<College | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const saved = savedColleges
    .map(id => COLLEGES.find(c => c.id === id))
    .filter((c): c is College => Boolean(c))
    .map(c => ({ college: c, match: simulateAIMatch(c.id, STUDENT_PROFILE), deadline: deadlineFor(c) }))
    .sort((a, b) => b.match.matchPercent - a.match.matchPercent);

  function share() {
    navigator.clipboard?.writeText(`${window.location.origin}/student/saved`);
    showToast('Shortlist link copied');
  }

  function toggleCompare(id: string, name: string) {
    if (compareList.includes(id)) {
      removeFromCompare(id);
      showToast(`${name} removed from comparison`);
    } else if (compareList.length >= 5) {
      showToast('You can compare up to 5 colleges', 'error');
    } else {
      addToCompare(id);
      showToast(`${name} added to comparison`);
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <PageHeader
        label="Your shortlist"
        title={saved.length ? `${saved.length} colleges, side by side.` : 'Your shortlist is empty.'}
        description="Ordered by fit for the demo profile. Track each college's next date, compare, and practise the application."
        actions={
          saved.length > 0 && (
            <>
              <button onClick={share} className="h-10 px-4 rounded-xl border border-line bg-surface text-sm inline-flex items-center gap-2 hover:border-ink-2 transition-colors cursor-pointer">
                <Share2 size={14} /> Share
              </button>
              <Link href="/compare" className="h-10 px-4 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent transition-colors">
                Compare <ArrowRight size={14} />
              </Link>
            </>
          )
        }
      />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
        {saved.length === 0 ? (
          <div className="max-w-xl py-10">
            <p className="text-lg text-ink-2">Tap the bookmark on any college to keep it here.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/ai-college-finder" className="h-11 px-5 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent transition-colors">
                Find colleges <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => ['coep', 'vjti', 'bits-pilani'].forEach(toggleSave)}
                className="h-11 px-5 rounded-xl border border-line bg-surface text-sm hover:border-ink-2 transition-colors cursor-pointer"
              >
                Load the demo shortlist
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div role="tablist" aria-label="View" className="flex p-1 rounded-xl bg-paper-2 border border-line">
                {(['cards', 'table'] as const).map(v => (
                  <button
                    key={v}
                    role="tab"
                    aria-selected={view === v}
                    onClick={() => setView(v)}
                    className={cn('relative h-9 px-4 rounded-lg text-[13.5px] capitalize transition-colors cursor-pointer', view === v ? 'text-ink font-medium' : 'text-muted hover:text-ink')}
                  >
                    {view === v && <motion.span layoutId="saved-view" className="absolute inset-0 rounded-lg bg-surface border border-line" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                    <span className="relative">{v === 'cards' ? 'Cards' : 'Table'}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted hidden sm:block">Fit and admission chance: demo profile</p>
            </div>

            {view === 'cards' ? (
              <LayoutGroup>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence initial={false}>
                    {saved.map(({ college: c, match, deadline }, i) => {
                      const inCompare = compareList.includes(c.id);
                      return (
                        <motion.li
                          key={c.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                          transition={{ duration: 0.35, delay: i * 0.05, ease: EASE_OUT }}
                          className="rounded-[22px] border border-line bg-surface p-6 flex flex-col"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <Monogram name={c.shortName} />
                              <div className="min-w-0">
                                <Link href={`/colleges/${c.id}`} className="text-xl font-semibold tracking-[-0.015em] leading-tight hover:text-accent transition-colors">
                                  {c.shortName}
                                </Link>
                                <p className="text-sm text-muted">{c.city}, {c.state}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                toggleSave(c.id);
                                showToast(`${c.shortName} removed from shortlist`);
                              }}
                              aria-label={`Remove ${c.shortName}`}
                              className="w-9 h-9 shrink-0 rounded-lg text-faint hover:text-concern hover:bg-paper flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <X size={15} />
                            </button>
                          </div>

                          <dl className="mt-6 grid grid-cols-3 gap-3 nums">
                            <div>
                              <dt className="label !text-[10px]">Fit</dt>
                              <dd className="figure text-3xl font-semibold tracking-[-0.025em] text-accent">{match.matchPercent}%</dd>
                            </div>
                            <div>
                              <dt className="label !text-[10px]">Score</dt>
                              <dd className="figure text-3xl font-semibold tracking-[-0.025em]">{c.realityScore}</dd>
                            </div>
                            <div>
                              <dt className="label !text-[10px]">Admit chance</dt>
                              <dd className="figure text-3xl font-semibold tracking-[-0.025em]">{match.admissionProbability}%</dd>
                            </div>
                          </dl>

                          <dl className="mt-5 pt-4 border-t border-line grid grid-cols-3 gap-3 text-sm nums">
                            <div><dt className="text-muted text-xs">Fee / yr</dt><dd className="figure font-medium">₹{c.totalFees}L</dd></div>
                            <div><dt className="text-muted text-xs">Median</dt><dd className="figure font-medium">{formatPackage(c.medianPackage)}</dd></div>
                            <div><dt className="text-muted text-xs">Placed</dt><dd className="figure font-medium">{c.placementPercent}%</dd></div>
                          </dl>

                          <div className="mt-4 text-sm">
                            {match.whyMatches.length > 0 && (
                              <p className="text-ink-2"><span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-positive mr-2">Fits</span>{match.whyMatches.join(' · ')}</p>
                            )}
                            {match.concerns.length > 0 && (
                              <p className="mt-1 text-ink-2"><span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-caution mr-2">Watch</span>{match.concerns.join(' · ')}</p>
                            )}
                          </div>

                          <p className="mt-4 text-sm">
                            <span className="label !text-[10px] mr-2">Next date</span>
                            {deadline ? <span>{deadline.title} · <span className="font-mono">{deadline.date}</span></span> : <span className="text-muted">None in demo data</span>}
                          </p>

                          <div className="mt-auto pt-6 flex flex-wrap gap-2">
                            <button
                              onClick={() => toggleCompare(c.id, c.shortName)}
                              aria-pressed={inCompare}
                              className={cn('h-10 px-3.5 rounded-lg border text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer', inCompare ? 'bg-accent-soft border-accent/30 text-accent-deep' : 'border-line hover:border-ink-2')}
                            >
                              {inCompare ? <Check size={14} /> : <Plus size={14} />} {inCompare ? 'In compare' : 'Compare'}
                            </button>
                            <Link href="/admission-probability" className="h-10 px-3.5 rounded-lg border border-line text-sm inline-flex items-center hover:border-ink-2 transition-colors">
                              Check odds
                            </Link>
                            <button
                              onClick={() => setApplyCollege(c)}
                              className="h-10 px-3.5 rounded-lg bg-ink text-paper text-sm inline-flex items-center gap-1.5 hover:bg-accent transition-colors cursor-pointer"
                            >
                              Practise applying
                            </button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </LayoutGroup>
            ) : (
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-ink text-left">
                      {['College', 'Fit', 'Score', 'Admit chance', 'Fee / yr', 'Median', 'Placed', ''].map(h => (
                        <th key={h} scope="col" className="py-3 pr-4 font-normal label">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {saved.map(({ college: c, match }) => (
                      <tr key={c.id} className="border-b border-line hover:bg-surface/70 transition-colors nums">
                        <th scope="row" className="py-4 pr-4 text-left font-medium">
                          <Link href={`/colleges/${c.id}`} className="hover:text-accent">{c.shortName}</Link>
                        </th>
                        <td className="py-4 pr-4 figure font-medium text-accent">{match.matchPercent}%</td>
                        <td className="py-4 pr-4 figure font-medium">{c.realityScore}</td>
                        <td className="py-4 pr-4 figure font-medium">{match.admissionProbability}%</td>
                        <td className="py-4 pr-4 figure font-medium">₹{c.totalFees}L</td>
                        <td className="py-4 pr-4 figure font-medium">{formatPackage(c.medianPackage)}</td>
                        <td className="py-4 pr-4 figure font-medium">{c.placementPercent}%</td>
                        <td className="py-4 text-right">
                          <button onClick={() => setApplyCollege(c)} className="text-accent hover:underline cursor-pointer">Practise applying</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {/* Practice application */}
      <AnimatePresence>
        {applyCollege && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setApplyCollege(null); setSubmitted(false); }}
              className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Practise applying to ${applyCollege.shortName}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="fixed inset-x-4 top-[10vh] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[520px] z-[81] rounded-[22px] border border-line bg-paper p-6 sm:p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label">Practice run · nothing is submitted</p>
                  <h2 className="text-2xl font-semibold tracking-[-0.015em] mt-1">Apply to {applyCollege.shortName}</h2>
                </div>
                <button onClick={() => { setApplyCollege(null); setSubmitted(false); }} aria-label="Close" className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:border-ink-2 cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 size={36} className="mx-auto text-positive" />
                  <p className="mt-4 text-xl font-semibold">Practice application complete.</p>
                  <p className="mt-1 text-sm text-muted">Real applications go through the official counselling portal.</p>
                  <Link href="/admissions" className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                    See counselling dates <ArrowUpRight size={14} />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <label className="block">
                    <span className="label">Course</span>
                    <select className="mt-1.5 w-full h-11 px-3 rounded-xl border border-line bg-surface text-sm">
                      {applyCollege.courses.map(co => <option key={co.id}>{co.name}</option>)}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="label">Applicant</span>
                      <input defaultValue={STUDENT_PROFILE.name} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-line bg-surface text-sm" />
                    </label>
                    <label className="block">
                      <span className="label">Entrance roll no.</span>
                      <input defaultValue="JEE26-8849201" className="mt-1.5 w-full h-11 px-3 rounded-xl border border-line bg-surface text-sm font-mono" />
                    </label>
                  </div>
                  <p className="text-xs text-muted">Uses the demo profile: {STUDENT_PROFILE.exam} {STUDENT_PROFILE.percentile} percentile.</p>
                  <div className="pt-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setApplyCollege(null)} className="h-11 px-4 rounded-xl text-sm text-muted hover:text-ink cursor-pointer">Cancel</button>
                    <button type="submit" className="h-11 px-5 rounded-xl bg-ink text-paper text-sm hover:bg-accent transition-colors cursor-pointer">Run practice application</button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
