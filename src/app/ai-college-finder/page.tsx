'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle2, ChevronRight, Edit2,
  GraduationCap, MapPin, DollarSign, Zap, Home, Target, X,
  Search, Bot, Check, RotateCcw, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CollegeCard from '@/components/college/CollegeCard';
import { COLLEGES, AI_SEARCH_PROMPTS, simulateAIMatch } from '@/lib/mockData';
import { delay } from '@/lib/utils';

const LOADING_STEPS = [
  'Decoding query constraints & intent vectors...',
  'Cross-referencing historical opening & closing ranks...',
  'Verifying audited median package & ROI figures...',
  'Calculating personalized institutional fit scores...',
  'Finalizing tailored college recommendations...',
];

interface ExtractedPrefs {
  course: string;
  branch: string;
  budget: string;
  exam: string;
  score: string;
  location: string;
  priority: string;
  hostel: string;
}

function parseQuery(query: string): ExtractedPrefs {
  const lower = query.toLowerCase();
  return {
    course: lower.includes('mba') ? 'MBA' : lower.includes('mbbs') ? 'MBBS' : 'B.Tech',
    branch: lower.includes('cse') || lower.includes('computer science') ? 'Computer Science' :
            lower.includes('mba') ? 'Management' :
            lower.includes('mechanical') ? 'Mechanical' : 'Computer Science',
    budget: lower.includes('6 lakh') || lower.includes('₹6') ? '₹6L / yr' :
            lower.includes('8 lakh') || lower.includes('₹8') ? '₹8L / yr' : '₹6–8L / yr',
    exam: lower.includes('jee advanced') ? 'JEE Advanced' :
          lower.includes('jee') ? 'JEE Main' :
          lower.includes('mh-cet') || lower.includes('mhcet') ? 'MHT-CET' :
          lower.includes('bitsat') ? 'BITSAT' : 'JEE Main',
    score: lower.includes('87') ? '87 Percentile' :
           lower.includes('95') ? '95 Percentile' :
           lower.includes('99') ? '99 Percentile' : '87 Percentile',
    location: lower.includes('maharashtra') || lower.includes('pune') || lower.includes('mumbai') ? 'Maharashtra' :
              lower.includes('delhi') ? 'Delhi NCR' :
              lower.includes('bangalore') ? 'Karnataka' : 'Maharashtra',
    priority: lower.includes('placement') ? 'High Placements' :
              lower.includes('roi') ? 'Maximum ROI' :
              lower.includes('campus') ? 'Campus Life' : 'High Placements',
    hostel: lower.includes('hostel') ? 'Guaranteed' : 'Preferred',
  };
}

function AIFinderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [phase, setPhase] = useState<'input' | 'loading' | 'results'>(initialQuery ? 'loading' : 'input');
  const [loadingStep, setLoadingStep] = useState(0);
  const [prefs, setPrefs] = useState<ExtractedPrefs | null>(null);
  const [results, setResults] = useState<typeof COLLEGES>([]);

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runSearch(q: string) {
    setPhase('loading');
    setLoadingStep(0);

    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingStep(i);
      await delay(600);
    }

    const extracted = parseQuery(q);
    setPrefs(extracted);

    // Filter colleges
    const filtered = COLLEGES.filter(c => {
      if (extracted.location === 'Maharashtra') return c.state === 'Maharashtra' || c.id === 'bits-pilani';
      return true;
    }).slice(0, 6);

    setResults(filtered);
    setPhase('results');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) runSearch(query);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Header — Deep Navy with radial electric blue glow */}
      <div className="relative bg-ink text-white pt-12 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles size={12} className="text-blue-400" />
            Neural Admission Engine
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight mb-3">
            Find Your Perfect College Match
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us your rank, exam score, budget, and priorities in plain English. Our engine decodes your profile against millions of verified data points.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 -mt-6 relative z-20">
        <AnimatePresence mode="wait">

          {/* ── INPUT PHASE ── */}
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/5 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-accent flex items-center justify-center">
                        <Bot size={18} />
                      </div>
                      <span className="font-display font-bold text-slate-900 text-sm">Natural Language Profile Prompt</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Powered</span>
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={`e.g. "I want to pursue B.Tech Computer Science. My budget is ₹6 lakh/year. I scored 87 percentile in JEE Main. I prefer colleges in Maharashtra with guaranteed hostel accommodations and strong software campus placements."`}
                    rows={4}
                    className="w-full text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 resize-none outline-none leading-relaxed"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Include exam percentiles, state preferences, budget constraints, or branch focus
                    </p>
                    <button
                      type="submit"
                      disabled={!query.trim()}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink hover:bg-blue-900 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      <Sparkles size={14} className="text-blue-400" />
                      Generate Match Analysis
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggested prompts */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Or choose an example query:</p>
                <div className="space-y-2.5">
                  {AI_SEARCH_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => { setQuery(prompt); textareaRef.current?.focus(); }}
                      className="w-full text-left p-3.5 bg-white border border-slate-200/80 rounded-xl text-xs sm:text-sm font-medium text-slate-750 hover:border-blue-300 hover:text-accent transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <span className="leading-snug">{prompt}</span>
                      <ChevronRight size={15} className="text-slate-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── LOADING PHASE ── */}
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-xl shadow-blue-950/5 flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="w-18 h-18 rounded-full border-3 border-blue-100 border-t-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot size={26} className="text-accent" />
                </div>
              </div>

              <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl mb-1">
                Synthesizing Verified Data
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm">
                Running neural multi-criteria optimization across NIRF tables and salary reports...
              </p>

              <div className="space-y-2.5 w-full max-w-md">
                {LOADING_STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all ${
                      i < loadingStep
                        ? 'bg-emerald-50 border border-emerald-200/60'
                        : i === loadingStep
                        ? 'bg-blue-50 border border-blue-200/60 shadow-xs'
                        : 'bg-slate-50/60 border border-slate-100'
                    }`}
                  >
                    {i < loadingStep ? (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    ) : i === loadingStep ? (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${
                      i < loadingStep
                        ? 'text-emerald-800'
                        : i === loadingStep
                        ? 'text-blue-800'
                        : 'text-slate-400'
                    }`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS PHASE ── */}
          {phase === 'results' && prefs && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Extracted Preferences Bento Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-sm">Extracted Profile Parameters</h3>
                      <p className="text-[11px] text-slate-400">Parsed accurately from your prompt</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setPhase('input'); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <Edit2 size={12} />
                    Adjust Prompt
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: GraduationCap, label: 'Course', value: prefs.course },
                    { icon: Zap, label: 'Specialization', value: prefs.branch },
                    { icon: DollarSign, label: 'Budget Cap', value: prefs.budget },
                    { icon: Target, label: 'Entrance Exam', value: prefs.exam },
                    { icon: Target, label: 'Percentile', value: prefs.score },
                    { icon: MapPin, label: 'Preferred State', value: prefs.location },
                    { icon: ShieldCheck, label: 'Top Priority', value: prefs.priority },
                    { icon: Home, label: 'Hostel', value: prefs.hostel },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={12} className="text-accent" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    Found <span className="text-accent">{results.length} Recommended Colleges</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Ranked by predictive fit algorithm & admissions probability</p>
                </div>
                <button
                  onClick={() => { setPhase('input'); setQuery(''); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700 hover:border-slate-300 transition-colors self-start sm:self-auto shadow-2xs"
                >
                  <RotateCcw size={12} />
                  Start Fresh Search
                </button>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map((college, i) => {
                  const match = simulateAIMatch(college.id, {
                    name: 'Candidate',
                    avatar: 'CA',
                    course: 'B.Tech CSE',
                    exam: prefs.exam,
                    percentile: 87,
                    budget: prefs.budget,
                    location: prefs.location,
                    hostel: true,
                    priorities: ['Placements'],
                    searchProgress: 80,
                    savedColleges: [],
                    compareList: []
                  });

                  return (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      matchPercent={match.matchPercent}
                      admissionProb={match.admissionProbability}
                      index={i}
                    />
                  );
                })}
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={() => router.push('/colleges')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-800 shadow-xs transition-colors"
                >
                  Browse Full 500+ College Directory
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default function AICollegeFinderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper"><Navbar /></div>}>
      <AIFinderContent />
    </Suspense>
  );
}
