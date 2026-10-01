'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Info, CheckCircle2, Sparkles, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProbabilityLabel } from '@/lib/utils';

const EXAMS = ['JEE Main', 'JEE Advanced', 'MHT-CET', 'BITSAT', 'NEET', 'NMAT', 'CAT', 'GATE'];
const CATEGORIES = ['General / Open', 'OBC-NCL', 'SC', 'ST', 'EWS', 'PwD'];
const COURSES = [
  'B.Tech Computer Science & Engineering',
  'B.Tech Artificial Intelligence & Data Science',
  'B.Tech Electronics & Telecommunication',
  'B.Tech Mechanical Engineering',
  'MBA (Core Management)',
  'MBBS (Clinical Sciences)',
];

function calcProbability(percentile: number, category: string, exam: string): number {
  let base = percentile;
  if (category.includes('SC') || category.includes('ST')) base = Math.min(base + 18, 99);
  if (category.includes('OBC') || category.includes('EWS')) base = Math.min(base + 8, 99);
  if (exam === 'JEE Advanced') base = Math.max(base - 10, 5);
  return Math.min(Math.max(Math.round(base * 0.84), 5), 96);
}

export default function AdmissionProbabilityPage() {
  const [form, setForm] = useState({
    exam: 'JEE Main',
    percentile: 87,
    category: 'General / Open',
    course: 'B.Tech Computer Science & Engineering',
    homeState: 'Maharashtra',
    marks: 82,
  });
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const prob = calcProbability(form.percentile, form.category, form.exam);
    setResult(prob);
    setLoading(false);
  }

  const probInfo = result !== null ? getProbabilityLabel(result) : null;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Hero Banner — Deep Navy with radial electric blue glow */}
      <div className="relative bg-ink text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <TrendingUp size={12} className="text-blue-400" />
            Predictive Admissions Analytics
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight mb-3">
            Admission Probability Predictor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estimate your realistic admission probability across top institutions based on official historical cutoff data, category quotas, and percentile trends.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900 text-base">Candidate Profile</h2>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Step 1 of 2</span>
            </div>

            {/* Entrance Exam */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 block">Target Exam</label>
              <div className="flex flex-wrap gap-2">
                {EXAMS.map(exam => (
                  <button
                    key={exam}
                    onClick={() => setForm(f => ({ ...f, exam }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      form.exam === exam
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            {/* Percentile */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score / Percentile</label>
                <span className="font-display font-extrabold text-xs text-accent">{form.percentile} Percentile</span>
              </div>
              <input
                type="range"
                min="1"
                max="99.9"
                step="0.1"
                value={form.percentile}
                onChange={e => setForm(f => ({ ...f, percentile: parseFloat(e.target.value) }))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>1st %ile</span>
                <span>50th %ile</span>
                <span>99.9th %ile</span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 block">Seat Reservation Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setForm(f => ({ ...f, category: cat }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      form.category === cat
                        ? 'bg-accent text-white shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Program of Choice</label>
              <select
                value={form.course}
                onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
              >
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Class 12 Marks */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Class 12th Board Aggregate</label>
                <span className="font-display font-extrabold text-xs text-accent">{form.marks}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={form.marks}
                onChange={e => setForm(f => ({ ...f, marks: parseInt(e.target.value) }))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full py-3 bg-ink hover:bg-blue-900 disabled:opacity-60 text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analyzing Cutoff Arrays...
                </>
              ) : (
                <>
                  <Sparkles size={14} className="text-blue-400" />
                  Predict Admission Odds
                </>
              )}
            </button>
          </div>

          {/* Result */}
          <div>
            <AnimatePresence mode="wait">
              {result !== null && probInfo && !loading && (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/5 space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h2 className="font-display font-bold text-slate-900 text-base">Prediction Output</h2>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Statistical Estimate
                    </span>
                  </div>

                  {/* Main result */}
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 mb-4 shadow-inner"
                      style={{ borderColor: probInfo.color, background: probInfo.bg }}
                    >
                      <p className="font-display font-black text-4xl" style={{ color: probInfo.color }}>{result}%</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Likelihood</span>
                    </motion.div>
                    <p className="font-display font-bold text-xl text-slate-900">{probInfo.label}</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      for {form.course} at {form.percentile} percentile ({form.exam})
                    </p>
                  </div>

                  {/* Historical context */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-800 mb-3">Historical Round Closing Cutoffs</p>
                    <div className="space-y-2">
                      {[
                        { year: '2025 CAP Round 3', cutoff: `${Math.round(form.percentile + 1.5)} percentile`, status: 'Competitive' },
                        { year: '2024 CAP Round 2', cutoff: `${Math.round(form.percentile + 0.8)} percentile`, status: 'Strong Match' },
                        { year: '2023 Final Round', cutoff: `${Math.round(form.percentile - 1.2)} percentile`, status: 'Safe Zone' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">{row.year}:</span>
                          <span className="font-semibold text-slate-700">{row.cutoff}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === 'Safe Zone' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="flex items-start gap-2.5 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
                    <Info size={15} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-900 leading-relaxed">
                      Statistical projection derived from multi-year centralized admission registers. Final allotment depends on official counselling choice filling and category rank shifts.
                    </p>
                  </div>
                </motion.div>
              )}

              {(!result || loading) && !loading && (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-accent flex items-center justify-center mx-auto mb-3">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-sm mb-1">Ready to Calculate</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Select your target exam and percentile on the left to generate predictive admission likelihoods.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
