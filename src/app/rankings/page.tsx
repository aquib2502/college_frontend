'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, X, Trophy, Sparkles, ArrowUpRight, TrendingUp, ShieldCheck, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES } from '@/lib/mockData';
import { formatPackage } from '@/lib/utils';

const CATEGORIES = [
  'Overall Reality',
  'Highest ROI',
  'Placement Power',
  'Engineering & Tech',
  'Computer Science',
  'Management / MBA',
  'Government Premier',
  'Private Elite',
  'High Value (Under ₹2L)',
];

function getMonogram(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}

export default function RankingsPage() {
  const [activeCategory, setActiveCategory] = useState('Overall Reality');
  const [showMethodology, setShowMethodology] = useState(false);

  // Dynamic sorting based on category
  const ranked = [...COLLEGES].sort((a, b) => {
    if (activeCategory === 'Highest ROI') return (b.medianPackage / b.totalFees) - (a.medianPackage / a.totalFees);
    if (activeCategory === 'Placement Power') return b.placementPercent - a.placementPercent;
    if (activeCategory === 'High Value (Under ₹2L)') return a.totalFees - b.totalFees;
    return b.realityScore - a.realityScore;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Header Banner — Deep Navy with radial electric blue glow */}
      <div className="relative bg-[#0B1F3A] text-white pt-12 pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3">
                <Trophy size={13} className="text-amber-400" />
                Verified Institutional Benchmarks
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">
                National College Reality Rankings
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Ranked using 100% verified placement audits, genuine salary RTI records, fee-to-compensation ratios, and audited student sentiment.
              </p>
            </div>

            <button
              onClick={() => setShowMethodology(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition-all self-start md:self-auto"
            >
              <Info size={14} className="text-blue-400" />
              Ranking Methodology & Weights
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Category selector pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Rankings Table Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Institution</div>
            <div className="col-span-2 text-center">Reality Score</div>
            <div className="col-span-1 text-center">Rating</div>
            <div className="col-span-1 text-center">Placed</div>
            <div className="col-span-1 text-right">Median</div>
            <div className="col-span-1 text-right">Tuition/Yr</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {ranked.map((college, i) => {
              const isTop3 = i < 3;
              const rankNumber = i + 1;
              const formattedRank = rankNumber < 10 ? `0${rankNumber}` : `${rankNumber}`;

              return (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-12 px-6 py-4.5 hover:bg-blue-50/30 transition-colors items-center group"
                >
                  {/* Rank Badge */}
                  <div className="col-span-1 flex justify-center">
                    <span
                      className={`inline-flex items-center justify-center font-display font-extrabold text-xs px-2.5 py-1 rounded-lg ${
                        i === 0
                          ? 'bg-amber-100/80 text-amber-900 border border-amber-300/80 font-black'
                          : i === 1
                          ? 'bg-slate-200 text-slate-800 border border-slate-300 font-bold'
                          : i === 2
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                          : 'text-slate-400 font-bold'
                      }`}
                    >
                      {formattedRank}
                    </span>
                  </div>

                  {/* College Monogram & Name */}
                  <div className="col-span-5 pr-4">
                    <Link
                      href={`/colleges/${college.id}`}
                      className="flex items-center gap-3.5 group/link"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white font-display font-black text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover/link:scale-105 transition-transform">
                        {getMonogram(college.shortName)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-bold text-sm text-slate-900 group-hover/link:text-blue-600 transition-colors truncate">
                            {college.shortName}
                          </p>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {college.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {college.city}, {college.state} · NIRF #{college.nirfRank}
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Reality Score */}
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      <span className="font-display font-black text-xs tracking-tight">{college.realityScore}</span>
                      <span className="text-[10px] text-emerald-600 font-medium">/ 100</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="col-span-1 text-center">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{college.studentRating}</span>
                    </div>
                  </div>

                  {/* Placed */}
                  <div className="col-span-1 text-center">
                    <span className="font-display font-bold text-xs text-slate-800">
                      {college.placementPercent}%
                    </span>
                  </div>

                  {/* Median Package */}
                  <div className="col-span-1 text-right">
                    <span className="font-display font-extrabold text-xs text-[#0B1F3A]">
                      {formatPackage(college.medianPackage)}
                    </span>
                  </div>

                  {/* Fees */}
                  <div className="col-span-1 text-right">
                    <span className="text-xs font-semibold text-slate-600">
                      ₹{college.totalFees}L
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Methodology Modal */}
      <AnimatePresence>
        {showMethodology && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMethodology(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-base">Reality Score Methodology</h3>
                    <p className="text-[11px] text-slate-400">Weighted scientific criteria</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMethodology(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-4 mb-4 leading-relaxed">
                Rankings are algorithmically computed using verified data sources including NIRF submissions, mandatory AICTE disclosures, audited placement reports, and authenticated student review sentiments.
              </p>

              <div className="space-y-2.5">
                {[
                  ['Placement Outcomes', '30%', 'Audited placement %, median and average packages, recruiter tier distribution'],
                  ['Return on Investment (ROI)', '20%', 'Salary-to-tuition ratio and estimated payback period in months'],
                  ['Academic Quality & Faculty', '15%', 'Faculty-to-student ratio, PhD qualifications, citations and research grants'],
                  ['Audited Student Sentiment', '15%', 'Verified student reviews across academics, campus life, and peer quality'],
                  ['Reporting Transparency', '10%', 'Consistency of data submissions, RTI disclosures, and absence of misleading claims'],
                  ['Campus & Living Experience', '10%', 'Laboratory infrastructure, sports grounds, residential hostels, and library holdings'],
                ].map(([cat, weight, desc]) => (
                  <div key={cat} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-display font-extrabold text-xs text-blue-600 w-10 shrink-0">{weight}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cat}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowMethodology(false)}
                  className="px-4 py-2 bg-[#0B1F3A] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors"
                >
                  Close & Continue
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
