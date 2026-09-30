'use client';

import Link from 'next/link';
import { HelpCircle, ArrowLeft, MessageSquare, Check } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function CollegeQAAdminPage() {
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
              <span className="text-slate-700 font-bold">Community Inquiries</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Student Q&A Desk</h1>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2">Prospective Student Inquiries</h2>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Aarav Mehta (MH-CET Aspirant)</span>
              <span className="text-[10px] text-slate-400">Received 2 hours ago</span>
            </div>
            <p className="text-xs text-slate-700 font-semibold">
              Is hostel accommodation guaranteed for all first-year outstation students from Vidarbha region?
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => showToast('Official institutional response dispatched to student')}
                className="px-3.5 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-semibold"
              >
                Send Verified Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
