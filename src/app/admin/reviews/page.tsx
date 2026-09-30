'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Shield, ArrowLeft, Check, X, Flag, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminReviewsModerationPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([
    { id: 'm1', student: 'Verified Current Student', college: 'COEP Pune', course: 'B.Tech CSE', rating: 4.8, flagReason: 'High placement salary cited (₹50.5L)', status: 'flagged' },
    { id: 'm2', student: 'Alumnus', college: 'VJTI Mumbai', course: 'B.Tech Mechanical', rating: 4.2, flagReason: 'Hostel mess complaint', status: 'pending' },
    { id: 'm3', student: 'Student', college: 'Private Tech Institute', course: 'B.Tech IT', rating: 1.5, flagReason: 'Reported by College Admin as disputed', status: 'disputed' },
  ]);

  function handleAction(id: string, newStatus: string) {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    showToast(`Review status updated to: ${newStatus}`);
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Review Moderation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Student Review Moderation Queue (Section 42)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit flagged student reviews, institutional dispute claims, and verify authentic student enrollment.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-3">
            {reviews.map(r => (
              <div key={r.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{r.college}</span>
                    <span className="text-xs text-slate-500">({r.course})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">Reviewer: {r.student} · Rating: ★ {r.rating}</p>
                  <p className="text-xs text-amber-800 font-medium">Scrutiny Reason: {r.flagReason}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(r.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Check size={12} /> Approve Review
                  </button>
                  <button
                    onClick={() => handleAction(r.id, 'hidden')}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <X size={12} /> Hide Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
