'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitCompare, ChevronRight, Plus, ArrowUpRight, Sparkles, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { COLLEGES } from '@/lib/mockData';
import { useToast } from '@/components/ui/Toast';

export default function StudentComparisonsPage() {
  const { compareList, removeFromCompare } = useApp();
  const { showToast } = useToast();

  const activeColleges = COLLEGES.filter(c => compareList.includes(c.id));

  const savedPresets = [
    { title: 'Top Maharashtra Autonomous Colleges', colleges: ['coep', 'vjti'], note: 'Top state government engineering colleges with low fees & high ROI' },
    { title: 'Premier Tech & B.Tech Institutes', colleges: ['iit-bombay', 'bits-pilani', 'coep'], note: 'Benchmark comparison across tier-1 central, deemed, and state colleges' },
  ];

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      <div className="bg-ink text-white pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight size={12} />
            <Link href="/student/dashboard" className="hover:text-slate-200">Student Dashboard</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Comparisons</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
                <GitCompare size={13} />
                Comparison Sets
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                My College Comparisons
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Manage your active comparison matrix and launch side-by-side AI decision analysis.
              </p>
            </div>

            <Link
              href="/compare"
              className="px-4 py-2.5 bg-accent hover:bg-accent text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              Open Full Compare Matrix <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Active Comparison Set */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Comparison List ({activeColleges.length}/5)</h2>
              <p className="text-xs text-slate-400">These institutions are currently loaded in your side-by-side comparison matrix</p>
            </div>
            {activeColleges.length >= 2 && (
              <Link
                href="/compare"
                className="px-3.5 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent transition-colors"
              >
                Compare Now →
              </Link>
            )}
          </div>

          {activeColleges.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500 mb-3">No colleges in your comparison list yet.</p>
              <Link href="/colleges" className="px-3.5 py-2 bg-accent text-white rounded-xl text-xs font-semibold">
                Browse Colleges to Add
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeColleges.map(c => (
                <div key={c.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{c.logo}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{c.shortName}</h4>
                      <p className="text-[11px] text-slate-400">Score: {c.realityScore} · {c.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCompare(c.id);
                      showToast(`Removed ${c.shortName} from comparison`);
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preset Comparison Collections */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">Curated Comparison Collections</h2>
          <p className="text-xs text-slate-400 mb-4">One-click benchmark comparisons generated for your stream</p>

          <div className="space-y-3">
            {savedPresets.map((preset, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-xl bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{preset.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{preset.note}</p>
                </div>
                <Link
                  href="/compare"
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-accent rounded-lg text-xs font-semibold transition-all self-start sm:self-center"
                >
                  Load Comparison →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
