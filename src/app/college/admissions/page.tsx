'use client';

import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle, TrendingUp } from 'lucide-react';

export default function CollegeAdmissionsAdminPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/college/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> College Dashboard
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Cutoffs & Admissions</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admissions & CAP Quota Management</h1>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2">Active Cutoff Benchmarks (MHT-CET 2026 CAP Rounds)</h2>
          <div className="space-y-3 text-xs">
            {[
              { branch: 'Computer Science & Engineering (CSE)', round1: '99.88 %ile', round2: '99.82 %ile', projected: '99.80 %ile', vacancies: 4 },
              { branch: 'Artificial Intelligence & Robotics', round1: '99.65 %ile', round2: '99.52 %ile', projected: '99.45 %ile', vacancies: 2 },
              { branch: 'Electronics & Telecommunication', round1: '99.30 %ile', round2: '99.15 %ile', projected: '99.05 %ile', vacancies: 7 },
              { branch: 'Mechanical Engineering', round1: '98.50 %ile', round2: '98.20 %ile', projected: '98.00 %ile', vacancies: 12 },
            ].map((row, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{row.branch}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Round 1: {row.round1} · Round 2: {row.round2}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1a56db]">{row.projected}</span>
                  <p className="text-[10px] text-emerald-600 font-semibold">{row.vacancies} seats remaining</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
