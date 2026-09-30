'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Sparkles, GitCompare, Plus, CheckCircle2, AlertTriangle, TrendingUp,
  Briefcase, DollarSign, Trees, ArrowRight, ShieldCheck, Check, ChevronDown
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES, simulateAIMatch, STUDENT_PROFILE } from '@/lib/mockData';
import { formatPackage, getScoreColor } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

function getMonogram(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}

const COMPARE_ROWS = [
  { key: 'type', label: 'University Type' },
  { key: 'naacGrade', label: 'NAAC Accreditation' },
  { key: 'accreditation', label: 'Approvals' },
  { key: 'totalFees', label: 'Tuition Fee (Per Year)', format: (v: number) => `₹${v} Lakhs` },
  { key: 'placementPercent', label: 'Audited Placement %', format: (v: number) => `${v}%` },
  { key: 'medianPackage', label: 'Median Package', format: (v: number) => formatPackage(v) },
  { key: 'averagePackage', label: 'Average Package', format: (v: number) => formatPackage(v) },
  { key: 'highestPackage', label: 'Highest Package', format: (v: number) => formatPackage(v) },
  { key: 'studentRating', label: 'Student Satisfaction', format: (v: number) => `★ ${v} / 5.0` },
  { key: 'totalReviews', label: 'Verified Reviews', format: (v: number) => `${v.toLocaleString()} verified` },
  { key: 'realityScore', label: 'Reality Score', format: (v: number) => `${v} / 100` },
  { key: 'hasHostel', label: 'Hostel Accommodation', format: (v: boolean) => v ? 'Guaranteed Available' : 'Limited / Off-Campus' },
  { key: 'hasWifi', label: 'Campus High-Speed Wi-Fi', format: (v: boolean) => v ? '1Gbps Campus-wide' : 'Basic' },
  { key: 'hasSports', label: 'Sports Complex', format: (v: boolean) => v ? 'Olympic-grade / Indoor Stadium' : 'Standard' },
  { key: 'campus', label: 'Campus Area', format: (v: string) => v || 'Extensive' },
  { key: 'established', label: 'Year Established' },
];

function getBest(colleges: typeof COLLEGES, key: string): number {
  const vals = colleges.map(c => Number((c as unknown as Record<string, unknown>)[key])).filter(v => !isNaN(v));
  if (!vals.length) return -1;
  if (key === 'totalFees') return vals.indexOf(Math.min(...vals));
  return vals.indexOf(Math.max(...vals));
}

export default function ComparePage() {
  const { compareList, removeFromCompare, addToCompare } = useApp();
  const { showToast } = useToast();

  const compareColleges = COLLEGES.filter(c => compareList.includes(c.id));
  const allOtherColleges = COLLEGES.filter(c => !compareList.includes(c.id));
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [aiPriority, setAiPriority] = useState<'placement' | 'affordability' | 'campus'>('placement');

  function addCollege(id: string) {
    addToCompare(id);
    setShowAddDropdown(false);
    showToast('College added to comparison matrix');
  }

  const matches = compareColleges.map(c => simulateAIMatch(c.id, STUDENT_PROFILE));
  const bestMatchIdx = matches.length > 0
    ? matches.reduce((best, m, i) => m.matchPercent > matches[best].matchPercent ? i : best, 0)
    : 0;

  const AI_INSIGHTS: Record<string, string> = {
    placement: compareColleges[0]
      ? `Based on audited placement data, ${compareColleges.reduce((best, c) => c.placementPercent > best.placementPercent ? c : best, compareColleges[0]).shortName} leads with ${Math.max(...compareColleges.map(c => c.placementPercent))}% placement rate and the strongest Tier-1 recruiter presence.`
      : '',
    affordability: compareColleges[0]
      ? `For optimal ROI and low debt, ${compareColleges.reduce((best, c) => c.totalFees < best.totalFees ? c : best, compareColleges[0]).shortName} delivers exceptional value at ₹${Math.min(...compareColleges.map(c => c.totalFees))}L/year — well below peer group averages.`
      : '',
    campus: compareColleges[0]
      ? `For holistic campus life and facilities, ${compareColleges.reduce((best, c) => c.studentRating > best.studentRating ? c : best, compareColleges[0]).shortName} commands the highest verified satisfaction score (${Math.max(...compareColleges.map(c => c.studentRating))}/5.0).`
      : '',
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Header Banner — Deep Navy with radial electric blue glow */}
      <div className="relative bg-[#0B1F3A] text-white pt-12 pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3">
                <GitCompare size={13} className="text-blue-400" />
                Side-by-Side Trade-off Engine
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">
                Compare Institutions
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Analyze trade-offs in real time across verified salary records, ROI, total cost of study, and student satisfaction.
              </p>
            </div>

            {compareColleges.length > 0 && (
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => setShowAddDropdown(!showAddDropdown)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={14} />
                  Add College to Matrix
                  <ChevronDown size={13} />
                </button>

                {showAddDropdown && allOtherColleges.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 w-64 max-h-64 overflow-y-auto p-1 text-slate-800">
                    {allOtherColleges.map(c => (
                      <button
                        key={c.id}
                        onClick={() => addCollege(c.id)}
                        className="w-full text-left px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors flex items-center justify-between"
                      >
                        <span>{c.shortName}</span>
                        <Plus size={12} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {compareColleges.length < 2 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl text-center py-20 px-6 shadow-xs max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <GitCompare size={32} />
            </div>
            <h2 className="font-display font-extrabold text-xl text-slate-900 mb-2">Select At Least 2 Colleges</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              Add multiple colleges from the directory to unlock AI-powered trade-off matrices, fee comparisons, and placement audits.
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <Plus size={14} /> Browse & Add Colleges
            </Link>
          </div>
        ) : (
          <>
            {/* ── AI COMPARISON ASSISTANT ── */}
            <div className="bg-[#0B1F3A] border border-blue-900/60 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Sparkles size={15} />
                  </div>
                  <h2 className="font-display font-bold text-base text-white">AI Trade-Off Analysis</h2>
                </div>

                {compareColleges[bestMatchIdx] && (
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-3xl leading-relaxed">
                    Based on your candidate preferences (B.Tech CSE, 87th percentile bracket, Maharashtra target),{' '}
                    <strong className="text-white font-bold">{compareColleges[bestMatchIdx].shortName}</strong> holds the highest predictive fit score at{' '}
                    <span className="text-blue-400 font-extrabold">{matches[bestMatchIdx]?.matchPercent || 92}%</span>.
                  </p>
                )}

                {/* Match Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-6">
                  {compareColleges.map((c, i) => {
                    const m = matches[i];
                    const isBest = i === bestMatchIdx;

                    return (
                      <div
                        key={c.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isBest
                            ? 'bg-blue-600/20 border-blue-400/40 shadow-sm'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <p className="font-display font-bold text-sm text-white truncate">{c.shortName}</p>
                          {isBest && (
                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">
                              Top Match
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-black text-2xl text-blue-300">{m?.matchPercent || 85}%</span>
                          <span className="text-[11px] text-slate-400 font-medium">fit score</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Priority switcher */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Evaluate By Dimension:
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {[
                      { key: 'placement' as const, label: 'Placements & Packages', icon: Briefcase },
                      { key: 'affordability' as const, label: 'Affordability & ROI', icon: DollarSign },
                      { key: 'campus' as const, label: 'Campus & Infrastructure', icon: Trees },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setAiPriority(key)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          aiPriority === key
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white/10 hover:bg-white/15 text-slate-300'
                        }`}
                      >
                        <Icon size={13} />
                        {label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={aiPriority}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10"
                    >
                      {AI_INSIGHTS[aiPriority]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── COMPARISON TABLE ── */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-x-auto">
              <div style={{ minWidth: `${Math.max(680, 220 + compareColleges.length * 200)}px` }}>
                {/* College headers */}
                <div
                  className="grid border-b border-slate-200 bg-slate-50/70"
                  style={{ gridTemplateColumns: `220px repeat(${compareColleges.length}, 1fr)` }}
                >
                  <div className="p-5 flex items-end justify-between border-r border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Metric</span>
                  </div>

                  {compareColleges.map(c => (
                    <div key={c.id} className="p-5 border-r border-slate-200/80 last:border-r-0 text-center relative group">
                      <button
                        onClick={() => { removeFromCompare(c.id); showToast('Removed from comparison'); }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                        title="Remove"
                      >
                        <X size={12} />
                      </button>

                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white font-display font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-2xs">
                        {getMonogram(c.shortName)}
                      </div>

                      <Link href={`/colleges/${c.id}`} className="font-display font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors block">
                        {c.shortName}
                      </Link>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.city}, {c.state}</p>
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                <div className="divide-y divide-slate-100">
                  {COMPARE_ROWS.map((row) => {
                    const bestIdx = getBest(compareColleges, row.key);

                    return (
                      <div
                        key={row.key}
                        className="grid hover:bg-slate-50/50 transition-colors items-center"
                        style={{ gridTemplateColumns: `220px repeat(${compareColleges.length}, 1fr)` }}
                      >
                        <div className="p-4 px-5 text-xs font-bold text-slate-600 border-r border-slate-100 bg-slate-50/30">
                          {row.label}
                        </div>

                        {compareColleges.map((c, colIdx) => {
                          const val = (c as unknown as Record<string, unknown>)[row.key];
                          const isBest = colIdx === bestIdx;
                          const formattedVal = row.format
                            ? (row.format as (v: unknown) => string)(val)
                            : String(val ?? '—');

                          return (
                            <div
                              key={c.id}
                              className={`p-4 border-r border-slate-100 last:border-r-0 text-center text-xs font-semibold ${
                                isBest
                                  ? 'bg-blue-50/40 text-blue-900 font-bold'
                                  : 'text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1.5">
                                <span>{formattedVal}</span>
                                {isBest && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" title="Best in group" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
