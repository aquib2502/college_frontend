'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Sliders, CheckCircle, AlertTriangle, ArrowRight,
  TrendingUp, MapPin, Bookmark, GitCompare, ChevronRight, Award
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CollegeCard from '@/components/college/CollegeCard';
import { COLLEGES, STUDENT_PROFILE, simulateAIMatch } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

export default function StudentRecommendationsPage() {
  const { savedColleges, toggleSave, compareList, addToCompare, removeFromCompare } = useApp();
  const { showToast } = useToast();

  const recommendedColleges = COLLEGES.map(college => ({
    college,
    match: simulateAIMatch(college.id, STUDENT_PROFILE),
  })).sort((a, b) => b.match.matchPercent - a.match.matchPercent);

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <div className="bg-ink text-white pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight size={12} />
            <Link href="/student/dashboard" className="hover:text-slate-200">Student Dashboard</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">AI Recommendations</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-semibold mb-2">
                <Sparkles size={13} />
                Continuous AI Decision Engine
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Recommended For You
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Personalized shortlist matched against your JEE score (87 %ile), budget (₹6-8L), and Maharashtra location.
              </p>
            </div>

            <Link
              href="/student/profile"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0"
            >
              <Sliders size={14} /> Tune Preference Weights
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Recommendation Cards */}
        <div className="space-y-4">
          {recommendedColleges.map(({ college, match }, idx) => {
            const isSaved = savedColleges.includes(college.id);
            const inCompare = compareList.includes(college.id);

            return (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left side */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                      {college.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/colleges/${college.id}`} className="font-bold text-base text-slate-900 hover:text-accent">
                          {college.name}
                        </Link>
                        {college.verified && (
                          <span className="verified-badge text-[10px]"><CheckCircle size={9} /> Verified</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin size={11} /> {college.location} · {college.type} · Est. {college.established}
                      </p>
                    </div>
                  </div>

                  {/* AI Strengths & Concerns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">Key Strengths for You</p>
                      <ul className="space-y-1">
                        {match.whyMatches.slice(0, 2).map((w, i) => (
                          <li key={i} className="text-xs text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle size={11} className="text-emerald-600 shrink-0" /> {w}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl">
                      <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">Points to Consider</p>
                      <ul className="space-y-1">
                        {match.concerns.slice(0, 2).map((c, i) => (
                          <li key={i} className="text-xs text-amber-900 flex items-center gap-1.5">
                            <AlertTriangle size={11} className="text-amber-600 shrink-0" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right side metrics and actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 shrink-0">
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">AI Match</p>
                      <p className="text-2xl font-extrabold text-violet-700">{match.matchPercent}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Reality Score</p>
                      <p className="text-2xl font-extrabold text-accent">{college.realityScore}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toggleSave(college.id);
                        showToast(isSaved ? 'Removed from shortlist' : `${college.shortName} added to shortlist`);
                      }}
                      className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                        isSaved ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Saved' : 'Save to shortlist'}
                    >
                      <Bookmark size={15} className={isSaved ? 'fill-amber-500' : ''} />
                    </button>

                    <button
                      onClick={() => {
                        if (inCompare) {
                          removeFromCompare(college.id);
                          showToast('Removed from comparison');
                        } else {
                          addToCompare(college.id);
                          showToast(`${college.shortName} added to comparison`);
                        }
                      }}
                      className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                        inCompare ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Compare"
                    >
                      <GitCompare size={15} />
                    </button>

                    <Link
                      href={`/colleges/${college.id}`}
                      className="px-4 py-2 bg-accent hover:bg-accent text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
