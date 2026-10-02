'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Sparkles, CheckCircle, ThumbsUp, Flag, Search, Filter,
  MessageSquare, AlertCircle, Building2, GraduationCap, ChevronDown,
  Plus, X, ShieldCheck, Heart, Award
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES, Review } from '@/lib/mockData';

import { INITIAL_REVIEWS } from '@/lib/reviewsData';
import PageHeader from '@/components/layout/PageHeader';
import Monogram from '@/components/college/Monogram';
import SentimentResearch from '@/components/reviews/SentimentResearch';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStudentType, setSelectedStudentType] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'helpful' | 'rating' | 'recent'>('helpful');

  // Modal State
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [reportedReviews, setReportedReviews] = useState<Record<string, boolean>>({});

  // New review form state
  const [formData, setFormData] = useState({
    collegeId: 'coep',
    course: 'B.Tech Computer Science',
    batch: '2026',
    studentType: 'Current Student' as const,
    overallRating: 5,
    pros: '',
    cons: '',
    experience: '',
  });

  function handleHelpful(id: string) {
    if (votedReviews[id]) return;
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setVotedReviews(prev => ({ ...prev, [id]: true }));
  }

  function handleReport(id: string) {
    setReportedReviews(prev => ({ ...prev, [id]: true }));
  }

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.experience.trim()) return;

    const col = COLLEGES.find(c => c.id === formData.collegeId) || COLLEGES[0];
    const newRev = {
      id: `rev-${Date.now()}`,
      collegeId: col.id,
      collegeName: col.name,
      collegeLogo: col.logo,
      studentType: formData.studentType,
      course: formData.course,
      batch: formData.batch,
      verified: true,
      overallRating: Number(formData.overallRating),
      facultyRating: Number(formData.overallRating),
      placementRating: Number(formData.overallRating),
      infrastructureRating: 4.5,
      hostelRating: 4.0,
      campusRating: 4.5,
      roiRating: 4.5,
      pros: formData.pros.split('\n').filter(Boolean),
      cons: formData.cons.split('\n').filter(Boolean),
      experience: formData.experience,
      helpfulCount: 1,
      reportCount: 0,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([newRev, ...reviews]);
    setWriteModalOpen(false);
    setFormData({
      collegeId: 'coep',
      course: 'B.Tech Computer Science',
      batch: '2026',
      studentType: 'Current Student',
      overallRating: 5,
      pros: '',
      cons: '',
      experience: '',
    });
  }

  // Filter logic
  const filteredReviews = reviews.filter(r => {
    if (selectedCollege !== 'all' && r.collegeId !== selectedCollege) return false;
    if (selectedRating !== 'all' && r.overallRating < Number(selectedRating)) return false;
    if (selectedStudentType !== 'all' && r.studentType !== selectedStudentType) return false;
    if (verifiedOnly && !r.verified) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        r.experience.toLowerCase().includes(q) ||
        r.collegeName.toLowerCase().includes(q) ||
        r.course.toLowerCase().includes(q) ||
        r.pros.some(p => p.toLowerCase().includes(q)) ||
        r.cons.some(c => c.toLowerCase().includes(q));
      if (!matchText) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
    if (sortBy === 'rating') return b.overallRating - a.overallRating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <PageHeader
        label="Student reviews · demo data"
        title="What students actually say."
        description="Patterns first, then the reviews behind them. Filter by college, reviewer and rating."
        actions={
          <button
            onClick={() => setWriteModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-ink text-paper text-sm inline-flex items-center gap-2 hover:bg-accent transition-colors cursor-pointer"
          >
            <Plus size={15} /> Write a review
          </button>
        }
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12">
        <SentimentResearch />

        {/* Filter & Search Bar */}
        <div className="bg-surface border border-line rounded-[20px] p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews (e.g. placements, coding club, mess food)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {/* College Filter */}
              <select
                value={selectedCollege}
                onChange={e => setSelectedCollege(e.target.value)}
                className="h-10 px-3 text-sm bg-paper border border-line rounded-xl text-ink-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Colleges ({COLLEGES.length})</option>
                {COLLEGES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.shortName}
                  </option>
                ))}
              </select>

              {/* Student Type */}
              <select
                value={selectedStudentType}
                onChange={e => setSelectedStudentType(e.target.value)}
                className="h-10 px-3 text-sm bg-paper border border-line rounded-xl text-ink-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Reviewers</option>
                <option value="Current Student">Current Students</option>
                <option value="Verified Alumnus">Verified Alumni</option>
                <option value="Alumni">Alumni</option>
              </select>

              {/* Rating */}
              <select
                value={selectedRating}
                onChange={e => setSelectedRating(e.target.value)}
                className="h-10 px-3 text-sm bg-paper border border-line rounded-xl text-ink-2 focus:outline-none focus:border-accent"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">★ 4.5+ Stars</option>
                <option value="4.0">★ 4.0+ Stars</option>
                <option value="3.5">★ 3.5+ Stars</option>
              </select>

              {/* Verified Toggle */}
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  verifiedOnly
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckCircle size={13} className={verifiedOnly ? 'text-accent' : 'text-slate-400'} />
                Verified Only
              </button>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
              >
                <option value="helpful">Sort: Most Helpful</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="recent">Sort: Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing <strong className="text-slate-800">{filteredReviews.length}</strong> verified reviews</span>
            <span>All reviews undergo automated verification against college enrolments</span>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <MessageSquare size={36} className="mx-auto text-slate-300 mb-3" />
              <h3 className="font-bold text-slate-800 text-base">No reviews match your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing some filters or searching with different keywords.
              </p>
              <button
                onClick={() => {
                  setSelectedCollege('all');
                  setSelectedRating('all');
                  setSelectedStudentType('all');
                  setVerifiedOnly(false);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredReviews.map(r => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-line rounded-[22px] p-6 sm:p-8"
              >
                <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <Monogram name={r.collegeName} size="md" />
                    <div className="min-w-0">
                      <Link href={`/colleges/${r.collegeId}`} className="font-medium text-[15px] hover:text-accent transition-colors">
                        {r.collegeName}
                      </Link>
                      <p className="text-sm text-muted mt-0.5">
                        {r.studentType} · {r.course} · Batch {r.batch}
                        {r.verified && <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-positive">Enrolment checked</span>}
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="figure text-3xl font-semibold tracking-[-0.02em] nums">
                      {r.overallRating.toFixed(1)}<span className="text-base text-muted font-normal"> / 5</span>
                    </p>
                    <p className="text-xs text-muted nums">{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </header>

                <dl className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-3 nums">
                  {([
                    ['Faculty', r.facultyRating],
                    ['Placement', r.placementRating],
                    ['Infrastructure', r.infrastructureRating],
                    ['Hostel', r.hostelRating],
                    ['Campus', r.campusRating],
                    ['ROI', r.roiRating],
                  ] as const).map(([label, v]) => (
                    <div key={label}>
                      <dt className="label !text-[10px]">{label}</dt>
                      <dd className="mt-1 flex items-center gap-2">
                        <span className="figure font-medium text-sm">{v.toFixed(1)}</span>
                        <span className="flex-1 h-1 rounded-full bg-paper-2 overflow-hidden">
                          <span className={`block h-full rounded-full ${v >= 4.5 ? 'bg-positive' : v >= 4 ? 'bg-ink/70' : 'bg-caution'}`} style={{ width: `${(v / 5) * 100}%` }} />
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-[15px] leading-relaxed text-ink-2">{r.experience}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-line">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-positive">Liked</p>
                    <ul className="mt-2 space-y-1.5">
                      {r.pros.map((p, idx) => (
                        <li key={idx} className="text-sm text-ink-2 pl-4 relative before:absolute before:left-0 before:top-[9px] before:h-1 before:w-2 before:bg-positive before:rounded-full">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-caution">Warned about</p>
                    <ul className="mt-2 space-y-1.5">
                      {r.cons.map((c, idx) => (
                        <li key={idx} className="text-sm text-ink-2 pl-4 relative before:absolute before:left-0 before:top-[9px] before:h-1 before:w-2 before:bg-caution before:rounded-full">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className="mt-6 flex items-center justify-between gap-3 text-sm">
                  <button
                    onClick={() => handleHelpful(r.id)}
                    aria-pressed={!!votedReviews[r.id]}
                    className={`h-10 px-3.5 rounded-lg border inline-flex items-center gap-2 transition-colors cursor-pointer ${
                      votedReviews[r.id] ? 'bg-accent-soft border-accent/30 text-accent-deep' : 'border-line hover:border-ink-2'
                    }`}
                  >
                    <ThumbsUp size={14} /> Helpful <span className="figure font-medium nums">{r.helpfulCount}</span>
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleReport(r.id)}
                      disabled={reportedReviews[r.id]}
                      className="inline-flex items-center gap-1.5 text-muted hover:text-concern transition-colors cursor-pointer disabled:cursor-default"
                    >
                      <Flag size={13} /> {reportedReviews[r.id] ? 'Reported' : 'Report'}
                    </button>
                    <Link href={`/colleges/${r.collegeId}`} className="text-accent hover:underline">
                      College profile →
                    </Link>
                  </div>
                </footer>
              </motion.article>
            ))
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {writeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWriteModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Write a Student Review</h3>
                  <p className="text-xs text-slate-400">Share your verified experience to help junior students</p>
                </div>
                <button
                  onClick={() => setWriteModalOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="p-6 overflow-y-auto space-y-4">
                {/* College selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select College</label>
                  <select
                    value={formData.collegeId}
                    onChange={e => setFormData({ ...formData, collegeId: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent"
                  >
                    {COLLEGES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Course & Batch */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course / Program</label>
                    <input
                      type="text"
                      value={formData.course}
                      onChange={e => setFormData({ ...formData, course: e.target.value })}
                      placeholder="e.g. B.Tech Computer Engg"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Batch</label>
                    <input
                      type="text"
                      value={formData.batch}
                      onChange={e => setFormData({ ...formData, batch: e.target.value })}
                      placeholder="e.g. 2026"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, overallRating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={
                            star <= formData.overallRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {formData.overallRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Detailed Experience */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Detailed Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Describe academics, placement reality, crowd, campus culture, and honest day-to-day life..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-800 mb-1">Top Pros (One per line)</label>
                    <textarea
                      rows={2}
                      value={formData.pros}
                      onChange={e => setFormData({ ...formData, pros: e.target.value })}
                      placeholder="Great coding culture&#10;Affordable fee structure"
                      className="w-full px-3 py-2 text-xs bg-emerald-50/30 border border-emerald-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-800 mb-1">Top Cons (One per line)</label>
                    <textarea
                      rows={2}
                      value={formData.cons}
                      onChange={e => setFormData({ ...formData, cons: e.target.value })}
                      placeholder="Strict attendance&#10;Limited hostel seats"
                      className="w-full px-3 py-2 text-xs bg-amber-50/30 border border-amber-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setWriteModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-accent hover:bg-accent text-white rounded-xl shadow-md"
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
