'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle, Plus, Edit3, Shield, ChevronRight, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/Toast';

export default function StudentReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      college: 'College of Engineering Pune (COEP)',
      course: 'B.Tech CSE',
      batch: '2025',
      rating: 4.8,
      status: 'Verified & Published',
      date: 'Aug 2025',
      reviewText: 'Exceptional ROI. The curriculum is rigorous and companies like Microsoft and Goldman Sachs actively hire. Hostel Block C could use minor maintenance.',
      helpfulCount: 38,
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [collegeName, setCollegeName] = useState('COEP Technological University');
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState('');

  function handleCreateReview(e: React.FormEvent) {
    e.preventDefault();
    setReviews(prev => [
      {
        id: `rev-${Date.now()}`,
        college: collegeName,
        course: 'B.Tech CSE',
        batch: '2026',
        rating,
        status: 'Submitted for Verification Scrutiny',
        date: 'Just now',
        reviewText: reviewBody,
        helpfulCount: 0,
      },
      ...prev,
    ]);
    setReviewBody('');
    setModalOpen(false);
    showToast('Review submitted! It will appear after institutional student-ID verification.');
  }

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
            <span className="text-blue-400">Reviews</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
                <Star size={13} />
                Student Experience Intelligence
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                My Reviews & Verification
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Help future students with transparent, verified reviews of your campus experience and placements.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 bg-accent hover:bg-accent text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Plus size={14} /> Write Verified Review
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Authored Reviews ({reviews.length})</h2>

          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{r.college}</h3>
                    <p className="text-[11px] text-slate-400">{r.course} · Batch {r.batch} · {r.date}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle size={10} /> {r.status}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className={s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{r.rating}.0</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{r.reviewText}</p>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1">
                  <ThumbsUp size={11} className="text-accent" /> {r.helpfulCount} students found this helpful
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Write a Verified Student Review</h3>
            <form onSubmit={handleCreateReview} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Institution</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={e => setCollegeName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rating (1 to 5 Stars)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border text-xs font-bold ${
                        rating === s ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      ★ {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Student Experience</label>
                <textarea
                  value={reviewBody}
                  onChange={e => setReviewBody(e.target.value)}
                  placeholder="Share details on faculty, campus placements, mess food, and real hostel conditions..."
                  className="w-full p-3 border border-slate-200 rounded-xl h-24 outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-white rounded-xl font-bold"
                >
                  Submit for Scrutiny
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
