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

// Aggregate mock reviews across colleges with enriched details
const INITIAL_REVIEWS: (Review & { collegeName: string; collegeId: string; collegeLogo: string })[] = [
  {
    id: 'rev-1',
    collegeId: 'coep',
    collegeName: 'College of Engineering Pune (COEP)',
    collegeLogo: '🏛️',
    studentType: 'Current Student',
    course: 'B.Tech Computer Engineering',
    batch: '2025',
    verified: true,
    overallRating: 4.6,
    facultyRating: 4.4,
    placementRating: 4.8,
    infrastructureRating: 4.2,
    hostelRating: 3.5,
    campusRating: 4.7,
    roiRating: 4.9,
    pros: [
      'Unbelievable ROI with fees under ₹1.5L/year and average CSE package ₹16.4L',
      'Extremely active technical clubs (MindSpark, CoEP Robotics)',
      'High industry prestige across Pune and Bangalore tech circles',
    ],
    cons: [
      'Hostel accommodation capacity is strictly limited for non-local students',
      'Bureaucratic administrative paperwork during scholarship submissions',
    ],
    experience:
      'COEP has a legacy that opens doors in tech giants. The coding culture is driven by student communities. Faculty in the computer department are research-focused and encourage patents. The Boat Club and heritage campus make student life genuinely memorable, even if hostel allotments are competitive.',
    helpfulCount: 142,
    reportCount: 0,
    date: '2026-03-12',
  },
  {
    id: 'rev-2',
    collegeId: 'iit-bombay',
    collegeName: 'IIT Bombay',
    collegeLogo: '🏛️',
    studentType: 'Verified Alumnus',
    course: 'B.Tech CSE',
    batch: '2023',
    verified: true,
    overallRating: 4.9,
    facultyRating: 4.8,
    placementRating: 5.0,
    infrastructureRating: 4.7,
    hostelRating: 4.0,
    campusRating: 4.9,
    roiRating: 5.0,
    pros: [
      'Unmatched global peer group and entrepreneurship ecosystem (E-Cell)',
      'Direct access to top global HFTs, Google Brain, and venture funds',
      '550-acre scenic campus nestled next to Powai Lake',
    ],
    cons: [
      'Relentless academic competition can be emotionally demanding',
      'Older hostel wings have smaller rooms compared to newly built blocks',
    ],
    experience:
      'IIT Bombay changes your mental horizon permanently. You are surrounded by Olympiad medalists and future founders. The placement season offers global roles with median packages of ₹28L. If you can handle the academic rigor, there is no better launching pad in Asia.',
    helpfulCount: 318,
    reportCount: 0,
    date: '2026-01-20',
  },
  {
    id: 'rev-3',
    collegeId: 'vjti',
    collegeName: 'Veermata Jijabai Technological Institute (VJTI)',
    collegeLogo: '⚙️',
    studentType: 'Current Student',
    course: 'B.Tech Information Technology',
    batch: '2026',
    verified: true,
    overallRating: 4.5,
    facultyRating: 4.2,
    placementRating: 4.7,
    infrastructureRating: 3.9,
    hostelRating: 3.2,
    campusRating: 4.0,
    roiRating: 4.9,
    pros: [
      'Strategic Mumbai location offers unbeatable internship access to fintech and IT headquarters',
      'Very affordable government fees with massive alumni support',
      'Strong placement consistency with 93% placed students',
    ],
    cons: [
      'Campus infrastructure is heritage and needs modernization in some labs',
      'Hostel mess menu is repetitive and facilities are average',
    ],
    experience:
      'VJTI is one of Maharashtra’s gems. The sheer location advantage in Matunga, Mumbai means tech firms interview on campus continuously. Professors in IT are very supportive for hackathons. The hostel is strict with entry times and mess food is decent but basic.',
    helpfulCount: 97,
    reportCount: 0,
    date: '2026-02-18',
  },
  {
    id: 'rev-4',
    collegeId: 'bits-pilani',
    collegeName: 'BITS Pilani',
    collegeLogo: '💡',
    studentType: 'Alumni',
    course: 'B.E. Computer Science',
    batch: '2024',
    verified: true,
    overallRating: 4.8,
    facultyRating: 4.7,
    placementRating: 4.8,
    infrastructureRating: 4.9,
    hostelRating: 4.5,
    campusRating: 4.8,
    roiRating: 4.3,
    pros: [
      'Zero attendance policy fosters self-driven projects and entrepreneurship',
      'Practice School (PS-1 & PS-2) guarantees 6-month industry internships',
      'Phenomenal BITSian alumni network worldwide',
    ],
    cons: [
      'Tuition fees have risen significantly in recent years (around ₹5.8L/year)',
      'Pilani remote location requires 4-hour cab/train travel to Delhi',
    ],
    experience:
      'The flexibility at BITS is unmatched. Zero attendance taught me discipline because grades still matter, but you have the freedom to build startups, join clubs, or prepare for research. Practice School 2 placed me directly at an American semiconductor firm.',
    helpfulCount: 204,
    reportCount: 0,
    date: '2025-11-04',
  },
  {
    id: 'rev-5',
    collegeId: 'manipal',
    collegeName: 'Manipal Academy of Higher Education',
    collegeLogo: '🌊',
    studentType: 'Current Student',
    course: 'B.Tech Data Science & Engineering',
    batch: '2025',
    verified: true,
    overallRating: 4.3,
    facultyRating: 4.1,
    placementRating: 4.2,
    infrastructureRating: 4.8,
    hostelRating: 4.7,
    campusRating: 4.9,
    roiRating: 3.8,
    pros: [
      'World-class university town vibe with state-of-the-art sports complex (MARENA)',
      'Modern labs with cloud computing and GPU clusters for AI research',
      'Diverse student body from across India and 40+ countries',
    ],
    cons: [
      'Higher fee structure compared to government institutions',
      'Need to stand out actively from large batch sizes during campus placements',
    ],
    experience:
      'Manipal offers arguably the best campus life in India. The library is open late, sports facilities are Olympic standard, and hostels are air-conditioned and well managed. CSE & Data Science placements are robust with 88% placed.',
    helpfulCount: 88,
    reportCount: 0,
    date: '2026-03-01',
  },
  {
    id: 'rev-6',
    collegeId: 'nmims',
    collegeName: 'NMIMS Mukesh Patel School of Technology (MPSTME)',
    collegeLogo: '🏢',
    studentType: 'Current Student',
    course: 'MBA Tech Computer Engineering',
    batch: '2025',
    verified: true,
    overallRating: 4.2,
    facultyRating: 4.3,
    placementRating: 4.1,
    infrastructureRating: 4.6,
    hostelRating: 3.6,
    campusRating: 4.1,
    roiRating: 3.7,
    pros: [
      'Integrated B.Tech + MBA Tech curriculum saves one full academic year',
      'Prime Juhu/Vile Parle Mumbai location with corporate guest lecturers weekly',
      'Strong corporate networking and Bloomberg terminal labs',
    ],
    cons: [
      'Hostel accommodation in Mumbai is expensive with limited institutional rooms',
      'Strict 80% attendance criteria strictly enforced with biometric tracking',
    ],
    experience:
      'If you want a corporate head-start blending technology with business management, NMIMS MPSTME is structured effectively. Case study methodologies are used throughout. The attendance policy is strict, so balance your schedule well.',
    helpfulCount: 65,
    reportCount: 0,
    date: '2026-02-11',
  },
];

const THEMES_LIKE = [
  { name: 'Faculty & Mentorship', pct: 94, mentions: 1120, highlight: 'Accessible professors, research guidance, and industry-oriented teaching.' },
  { name: 'Campus Life & Culture', pct: 89, mentions: 980, highlight: 'Vibrant cultural & tech fests, student-led clubs, and collaborative peer groups.' },
  { name: 'Placement Support', pct: 91, mentions: 1040, highlight: 'Dedicated training & placement cells, mock interviews, and tier-1 recruiters.' },
  { name: 'Lab & Tech Infrastructure', pct: 86, mentions: 860, highlight: 'High-speed Wi-Fi, modern computer centers, and updated libraries.' },
];

const THEMES_CONCERNS = [
  { name: 'Hostel Allotment & Facilities', pct: 41, mentions: 410, concern: 'Limited room availability for second-year students and older hostel washrooms.' },
  { name: 'Administrative Bureaucracy', pct: 34, mentions: 320, concern: 'Slow approval cycles for document verification, transcript requests, and scholarship paperwork.' },
  { name: 'Mess & Food Consistency', pct: 29, mentions: 290, concern: 'Repetitive food menus and limited culinary varieties across non-veg offerings.' },
  { name: 'Branch Placement Disparities', pct: 24, mentions: 210, concern: 'CSE and IT receive majority of ₹20L+ packages compared to Civil and Metallurgy.' },
];

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
    <div className="min-h-screen bg-[#F8F9FB] text-slate-800">
      <Navbar />

      {/* Hero Header — Deep Navy with radial electric blue glow */}
      <section className="relative bg-[#0B1F3A] text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles size={12} className="text-blue-400" />
                Audited Student Sentiment Index
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">
                Authentic Student Reviews
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Aggregated, sentiment-analyzed, and student-verified insights across 1,284 authentic reviews from 2023–2026. Zero sponsored fluff.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setWriteModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-950/40 transition-all"
              >
                <Plus size={15} />
                Write Verified Review
              </button>
            </div>
          </div>

          {/* AI Intelligence Synthesis Card */}
          <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-display font-bold text-white text-sm">AI Sentiment Consensus</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    1,284 Verified Reviews Synthesized
                  </span>
                  <span className="text-[11px] text-slate-400">Coverage: 2023–2026</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  &ldquo;Students broadly praise faculty accessibility, peer learning cultures, and high-prestige campus placement drives (particularly in Computer Engineering and Data Science). The most statistically recurrent friction points center on hostel allotment limits for outstation students and administrative response times during fee reimbursement cycles.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Sentiment Analysis Grid: What Students Like Most vs What Students Complain About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* What Students Like Most */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">What Students Like Most</h3>
                  <p className="text-xs text-slate-400">Dominant positive sentiment clusters</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                +89% Positive
              </span>
            </div>

            <div className="space-y-3.5">
              {THEMES_LIKE.map((t, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{t.name}</span>
                    <span className="text-emerald-600 font-bold">{t.pct}% Positive ({t.mentions} mentions)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${t.pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-500">{t.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Students Complain About Most */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">What Students Complain About Most</h3>
                  <p className="text-xs text-slate-400">Recurrent friction points & concerns</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-700 rounded-lg">
                Calm Warning Index
              </span>
            </div>

            <div className="space-y-3.5">
              {THEMES_CONCERNS.map((t, i) => (
                <div key={i} className="p-3 rounded-xl bg-amber-50/40 border border-amber-100 hover:border-amber-200 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{t.name}</span>
                    <span className="text-amber-700 font-bold">{t.pct}% Flagged ({t.mentions} mentions)</span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${t.pct * 2}%` }} />
                  </div>
                  <p className="text-xs text-slate-600">{t.concern}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
              <ShieldCheck size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>
                These themes represent patterns verified across multiple reviews. They should be considered in context and not judged based on a single voice.
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews (e.g. placements, coding club, mess food)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] transition-all"
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
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#1a56db]"
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
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#1a56db]"
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
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#1a56db]"
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
                <CheckCircle size={13} className={verifiedOnly ? 'text-blue-600' : 'text-slate-400'} />
                Verified Only
              </button>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
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
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header: College Info & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white font-display font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {r.collegeName.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/colleges/${r.collegeId}`}
                          className="font-bold text-slate-900 text-sm hover:text-[#1a56db] transition-colors"
                        >
                          {r.collegeName}
                        </Link>
                        {r.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle size={11} />
                            Verified Student
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span>{r.course}</span>
                        <span>•</span>
                        <span>Batch of {r.batch}</span>
                        <span>•</span>
                        <span>{r.studentType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= Math.round(r.overallRating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }
                          />
                        ))}
                        <span className="font-bold text-sm text-slate-900 ml-1">
                          {r.overallRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Published on {r.date}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-ratings Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 my-4 py-2.5 px-3 bg-slate-50/80 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Faculty</span>
                    <strong className="text-slate-800 font-semibold">{r.facultyRating} / 5</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Placement</span>
                    <strong className="text-slate-800 font-semibold">{r.placementRating} / 5</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Infrastructure</span>
                    <strong className="text-slate-800 font-semibold">{r.infrastructureRating} / 5</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Hostel</span>
                    <strong className="text-slate-800 font-semibold">{r.hostelRating} / 5</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Campus Life</span>
                    <strong className="text-slate-800 font-semibold">{r.campusRating} / 5</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROI</span>
                    <strong className="text-slate-800 font-semibold">{r.roiRating} / 5</strong>
                  </div>
                </div>

                {/* Detailed Experience */}
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {r.experience}
                </p>

                {/* Pros and Cons Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                    <p className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Strengths & Highlights
                    </p>
                    <ul className="space-y-1">
                      {r.pros.map((p, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">+</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-xl">
                    <p className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Constructive Concerns
                    </p>
                    <ul className="space-y-1">
                      {r.cons.map((c, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">−</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleHelpful(r.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                      votedReviews[r.id]
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsUp size={13} className={votedReviews[r.id] ? 'text-blue-600' : 'text-slate-400'} />
                    <span>Helpful ({r.helpfulCount})</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReport(r.id)}
                      disabled={reportedReviews[r.id]}
                      className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors text-[11px]"
                    >
                      <Flag size={12} />
                      <span>{reportedReviews[r.id] ? 'Reported for review' : 'Report'}</span>
                    </button>
                    <Link
                      href={`/colleges/${r.collegeId}`}
                      className="font-medium text-[#1a56db] hover:underline"
                    >
                      View College Profile →
                    </Link>
                  </div>
                </div>
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
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1a56db]"
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
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
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
                    className="px-5 py-2 text-xs font-semibold bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl shadow-md"
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
