'use client';

import Link from 'next/link';
import { DollarSign, ArrowLeft, CheckCircle, Save, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function CollegeFeesAdminPage() {
  const { showToast } = useToast();

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
              <span className="text-slate-700 font-bold">Fee Structure</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Tuition & Hostel Fee Regulation</h1>
          </div>

          <button
            onClick={() => showToast('Fee revisions saved & logged to State Regulating Authority!')}
            className="px-4 py-2 bg-[#1a56db] text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Save Fee Table
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2">Academic Year 2026-27 Approved Fees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-1">Undergraduate B.Tech Tuition Fee</p>
              <p className="text-xl font-bold text-[#1a56db]">₹1,40,000 / year</p>
              <p className="text-[10px] text-slate-400 mt-1">State FRA Approved Notification Ref: FRA/2026/894</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-1">Postgraduate M.Tech Tuition Fee</p>
              <p className="text-xl font-bold text-violet-700">₹1,10,000 / year</p>
              <p className="text-[10px] text-slate-400 mt-1">GATE fellowship eligible</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-1">Hostel Room Rent (Annual)</p>
              <p className="text-xl font-bold text-amber-700">₹45,000 / year</p>
              <p className="text-[10px] text-slate-400 mt-1">Includes 24/7 Wi-Fi, electricity & maintenance</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-700 mb-1">Mess Food Advance (Annual)</p>
              <p className="text-xl font-bold text-emerald-700">₹36,000 / year</p>
              <p className="text-[10px] text-slate-400 mt-1">Adjustable on actual monthly consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
