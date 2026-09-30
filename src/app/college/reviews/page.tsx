'use client';

import Link from 'next/link';
import { Star, ArrowLeft, CheckCircle, Flag, ThumbsUp } from 'lucide-react';

export default function CollegeReviewsAdminPage() {
  const reviews = [
    {
      student: 'Verified Current Student',
      branch: 'B.Tech CSE',
      batch: '2025',
      rating: 4.8,
      status: 'Verified',
      content: 'Incredible peer group and top placements. COEP gives exceptional value for tuition fees.',
      helpful: 84,
    },
    {
      student: 'Alumnus',
      branch: 'B.Tech Mechanical',
      batch: '2023',
      rating: 4.2,
      status: 'Verified',
      content: 'Core placements were steady with Tata Motors and Bajaj Auto. Infrastructure in older labs has been upgraded.',
      helpful: 42,
    },
  ];

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
              <span className="text-slate-700 font-bold">Feedback Intelligence</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Student Reviews & Institutional Sentiment</h1>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2">Recent Verified Reviews ({reviews.length})</h2>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{r.student} ({r.branch}, {r.batch})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                    <CheckCircle size={10} /> {r.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className={s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{r.rating}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
