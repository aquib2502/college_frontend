'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart2, ArrowLeft, Save, Sliders, CheckCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminRankingsAlgorithmPage() {
  const { showToast } = useToast();
  const [weights, setWeights] = useState({
    placement: 30,
    roi: 20,
    academics: 15,
    satisfaction: 15,
    transparency: 10,
    campus: 10,
  });

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (total !== 100) {
      showToast('Weights must sum exactly to 100%');
      return;
    }
    showToast('Platform ranking algorithm weights updated & recalculated!');
  }

  function handleReset() {
    setWeights({
      placement: 30,
      roi: 20,
      academics: 15,
      satisfaction: 15,
      transparency: 10,
      campus: 10,
    });
    showToast('Reset to default algorithm weights');
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> Admin Portal
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Algorithm Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Reality Score Algorithm Configuration (Section 43)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tune mathematical dimension weightages governing institutional reality scores and category rankings.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
          >
            <RotateCcw size={13} /> Reset Default
          </button>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Dimension Weight Distribution</h2>
              <p className="text-xs text-slate-400">Sum must equal 100%</p>
            </div>
            <span className={`text-base font-extrabold ${total === 100 ? 'text-emerald-600' : 'text-red-500'}`}>
              Total: {total}%
            </span>
          </div>

          <div className="space-y-4">
            {[
              { key: 'placement', label: 'Placement Performance (Median package, placed %, tier-1 recruiters)', defaultVal: 30 },
              { key: 'roi', label: 'Return on Investment (Median CTC vs 4-year aggregate tuition)', defaultVal: 20 },
              { key: 'academics', label: 'Academics & Faculty Credentials (Ph.D. faculty ratio, patents)', defaultVal: 15 },
              { key: 'satisfaction', label: 'Verified Student Satisfaction (Sentiment analysis on reviews)', defaultVal: 15 },
              { key: 'transparency', label: 'Data Transparency & Audit Compliance (NIRF & AICTE filings)', defaultVal: 10 },
              { key: 'campus', label: 'Campus Infrastructure & Laboratory Quality (Acreage, equipment)', defaultVal: 10 },
            ].map(dim => (
              <div key={dim.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{dim.label}</span>
                  <span className="font-extrabold text-[#1a56db] text-sm">{weights[dim.key as keyof typeof weights]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={weights[dim.key as keyof typeof weights]}
                  onChange={e => setWeights({ ...weights, [dim.key]: parseInt(e.target.value) || 0 })}
                  className="w-full accent-[#1a56db]"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Save size={14} /> Save & Recalculate National Rankings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
