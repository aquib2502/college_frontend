'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, CheckCircle, Bookmark, GitCompare, Share2, Star, AlertTriangle,
  ChevronRight, TrendingUp, Sparkles, Info, ArrowUpRight, Shield,
  GraduationCap, Building, BookOpen, Users, Award, ThumbsUp, ThumbsDown,
  X, ExternalLink, Calendar, Clock, DollarSign, Wifi, Dumbbell, Coffee,
  Home, HelpCircle, MessageSquare, Plus, FileText, Check, AlertCircle,
  Percent, ArrowRight
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import Navbar from '@/components/layout/Navbar';
import SaveButton from '@/components/saved/SaveButton';
import Footer from '@/components/layout/Footer';
import { getCollegeById, simulateAIMatch, STUDENT_PROFILE, College } from '@/lib/mockData';
import { formatPackage, getScoreColor, getProbabilityLabel } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const TABS = [
  'Overview',
  'Courses & Fees',
  'Admission',
  'Cutoff',
  'Placements',
  'Rankings',
  'Reviews',
  'Campus',
  'Hostel',
  'Scholarships',
  'Q&A',
  'ROI',
  'Red Flags',
];

// ─── Score Ring Component ─────────────────────────────────────────────────────
function ScoreRing({ score, size = 80, label, hideValue = false }: { score: number; size?: number; label?: string; hideValue?: boolean }) {
  const color = getScoreColor(score);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </svg>
      {!hideValue && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center justify-center" style={{ width: size, height: size }}>
          <span className="text-xl font-bold" style={{ color }}>{score}</span>
        </div>
      )}
      {label && <p className="text-[10px] text-slate-500 font-medium text-center">{label}</p>}
    </div>
  );
}

// ─── Reality Score Section ────────────────────────────────────────────────────
function RealityScoreSection({ college }: { college: College }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const dimensions = [
    { label: 'Placement', score: 92 },
    { label: 'ROI', score: 88 },
    { label: 'Academics', score: 91 },
    { label: 'Faculty', score: 87 },
    { label: 'Campus', score: 84 },
    { label: 'Student Satisfaction', score: Math.round(college.studentRating * 20) },
    { label: 'Internships', score: 79 },
    { label: 'Transparency', score: 95 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Reality Score</h3>
        <button
          onClick={() => setShowExplanation(true)}
          className="text-xs text-accent hover:underline flex items-center gap-1"
        >
          <Info size={12} />
          How is this calculated?
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <ScoreRing score={college.realityScore} size={96} hideValue />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: getScoreColor(college.realityScore) }}>
                {college.realityScore}
              </p>
              <p className="text-[9px] text-slate-400 font-medium">/100</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-2.5">
          {dimensions.map((dim, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[11px] text-slate-500 w-28 shrink-0">{dim.label}</span>
              <div className="flex-1 stat-bar">
                <motion.div
                  className="stat-bar-fill"
                  style={{ background: getScoreColor(dim.score) }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${dim.score}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-700 w-6 text-right">{dim.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExplanation(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">How Reality Score is Calculated</h3>
                <button onClick={() => setShowExplanation(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The College Reality Score is an evidence-weighted composite score (0–100) combining verified institutional data and authentic student feedback.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Placement Performance (NIRF + Audit)</span>
                  <span className="font-bold text-accent">30%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Return on Investment (Median salary vs cost)</span>
                  <span className="font-bold text-accent">20%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Academics & Faculty Credentials</span>
                  <span className="font-bold text-accent">15%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Verified Student Satisfaction</span>
                  <span className="font-bold text-accent">15%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Data Transparency & Audit Integrity</span>
                  <span className="font-bold text-accent">10%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Campus Infrastructure</span>
                  <span className="font-bold text-accent">10%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                All data points are cross-referenced with official NIRF disclosures, AICTE mandatory filings, and verified alumni audits.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ college, match }: { college: College; match: ReturnType<typeof simulateAIMatch> }) {
  const prob = match.admissionProbability;
  const probLabel = getProbabilityLabel(prob);

  return (
    <div className="space-y-6">
      {/* Top metric row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Reality Score', value: `${college.realityScore}/100`, color: getScoreColor(college.realityScore), sub: 'Composite quality' },
          { label: 'Profile fit (demo)', value: `${match.matchPercent}%`, color: '#2b4fe0', sub: 'Profile fit' },
          { label: 'Total Fees / Year', value: `₹${college.totalFees}L`, color: '#1a56db', sub: 'Tuition + est. living' },
          { label: 'Median CTC', value: formatPackage(college.medianPackage), color: '#059669', sub: `${college.placementPercent}% placed` },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] text-slate-400 mb-1">{item.label}</p>
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Overview summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-2">About {college.shortName}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{college.overviewSummary}</p>
      </div>

      {/* Reality Score Breakdown */}
      <RealityScoreSection college={college} />

      {/* AI Match Explanation */}
      <div className="bg-accent-soft/50 border border-line rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-ink text-sm">Why This Matches You ({match.matchPercent}% Match)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-emerald-800 mb-2">Strengths for Your Profile</p>
            <ul className="space-y-1.5">
              {match.whyMatches.map((w, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-2">Considerations / Potential Concerns</p>
            <ul className="space-y-1.5">
              {match.concerns.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <AlertTriangle size={12} className="text-amber-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Best For / Not Ideal For */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
          <h4 className="font-bold text-emerald-900 text-sm mb-3">Best For</h4>
          <ul className="space-y-2">
            {college.bestFor.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5">
          <h4 className="font-bold text-amber-900 text-sm mb-3">May Not Be Ideal For</h4>
          <ul className="space-y-2">
            {college.notIdealFor.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-600" />
            Data sources
          </h4>
          <span className="text-[11px] text-slate-400">Demo data in this prototype</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Placement Data', status: 'Sourced', source: 'NIRF / Official Report' },
            { label: 'Accreditation', status: 'Sourced', source: `${college.naacGrade} NAAC Portal` },
            { label: 'Fee Structure', status: 'Sourced', source: 'State Fee Regulating Auth' },
            { label: 'Student Reviews', status: 'Sourced', source: 'Enrolment-checked reviews' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400">{item.label}</p>
              <p className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <CheckCircle size={11} className="text-emerald-600" /> {item.status}
              </p>
              <p className="text-[9px] text-slate-400 mt-1 truncate">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admission Tab ────────────────────────────────────────────────────────────
function AdmissionTab({ college }: { college: College }) {
  return (
    <div className="space-y-6">
      {/* Admission Overview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-2">Admission Process & Eligibility</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          Admissions to undergraduate B.Tech programs at {college.name} are conducted strictly through merit-based centralized counseling based on entrance exam scores.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
            <span className="text-[10px] text-accent uppercase font-bold block">Primary Entrance Exam</span>
            <span className="text-sm font-bold text-accent">
              {college.courses[0]?.entranceExam || 'JEE Main / CET'}
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Minimum Qualifying 10+2</span>
            <span className="text-sm font-bold text-slate-800">Min 75% in PCM (or top 20%ile)</span>
          </div>
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
            <span className="text-[10px] text-emerald-600 uppercase font-bold block">Counselling System</span>
            <span className="text-sm font-bold text-emerald-800">
              {college.ownership === 'Central' ? 'JoSAA / CSAB' : 'State CET CAP Rounds'}
            </span>
          </div>
        </div>
      </div>

      {/* Step-by-step admission roadmap */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-accent" />
          Key Admission Stages (2026-27)
        </h3>

        <div className="space-y-3">
          {[
            { stage: 'Stage 1', title: 'Appear for Entrance Exam', dates: 'Jan – May 2026', desc: 'Secure valid scorecard in JEE Advanced, JEE Main, or State CET exam.' },
            { stage: 'Stage 2', title: 'Register on Centralized Portal', dates: 'June 2026', desc: 'Register for JoSAA (for IITs/NITs) or Maharashtra CET CAP counseling.' },
            { stage: 'Stage 3', title: 'Choice Filling & Option Lock', dates: 'June – July 2026', desc: `Select ${college.shortName} as top preference for desired engineering branch.` },
            { stage: 'Stage 4', title: 'Seat Allotment & Document Verification', dates: 'July – August 2026', desc: 'Online scrutiny of marksheets, category validity, and seat acceptance fee payment.' },
            { stage: 'Stage 5', title: 'Campus Physical Reporting', dates: 'August 2026', desc: 'Physical hostel allotment, identity verification, and commencement of academic semester.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-accent text-[10px] font-bold shrink-0 mt-0.5">
                {item.stage}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">{item.dates}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Quotas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Seat Reservation Matrix (As per Govt. Norms)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {[
            { cat: 'General (Open)', quota: '40.5%' },
            { cat: 'OBC-NCL', quota: '27.0%' },
            { cat: 'SC Category', quota: '15.0%' },
            { cat: 'ST Category', quota: '7.5%' },
            { cat: 'GEN-EWS', quota: '10.0%' },
          ].map((q, i) => (
            <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400">{q.cat}</p>
              <p className="font-semibold text-sm text-accent mt-1">{q.quota}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cutoff Tab ───────────────────────────────────────────────────────────────
function CutoffTab({ college }: { college: College }) {
  const [selectedExam, setSelectedExam] = useState<string>('ALL');
  const [selectedCat, setSelectedCat] = useState<string>('General');

  const cutoffs = college.cutoffs || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Historical Cutoff Trends</h3>
            <p className="text-xs text-slate-400">Closing ranks and percentile benchmarks across admission cycles</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Category:</span>
            {['General', 'OBC', 'SC/ST'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat ? 'bg-accent text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cutoff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Program / Branch</th>
                <th className="pb-3">Exam</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">2024 Closing Benchmark</th>
                <th className="pb-3">2025 Projected</th>
                <th className="pb-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cutoffs.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-800">{item.course}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-accent font-semibold text-[10px]">
                      {item.exam}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600">{item.category}</td>
                  <td className="py-3 font-semibold text-slate-900">{item.cutoff}</td>
                  <td className="py-3 text-emerald-600 font-semibold">{item.cutoff} (Est.)</td>
                  <td className="py-3 text-right">
                    <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">
                      High Competition
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-accent" />
            <p className="text-xs text-slate-700">Want to know if your rank is sufficient for {college.shortName}?</p>
          </div>
          <Link
            href="/admission-probability"
            className="px-3.5 py-1.5 bg-accent hover:bg-accent text-white rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            Check Admission Chance <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Placements Tab ───────────────────────────────────────────────────────────
function PlacementsTab({ college }: { college: College }) {
  const [aiQ, setAiQ] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{ answer: string; confidence: string; sources: string[] } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const lineData = {
    labels: college.placements.yearWise.map(y => y.year),
    datasets: [
      {
        label: 'Placement %',
        data: college.placements.yearWise.map(y => y.percent),
        borderColor: '#1a56db',
        backgroundColor: 'rgba(26,86,219,0.08)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Average CTC (₹L)',
        data: college.placements.yearWise.map(y => y.avg),
        borderColor: '#059669',
        backgroundColor: 'transparent',
        borderDash: [4, 4],
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: college.placements.branchWise.map(b => b.branch),
    datasets: [
      {
        label: 'Avg Package (₹L)',
        data: college.placements.branchWise.map(b => b.avg),
        backgroundColor: '#1a56db',
        borderRadius: 6,
      },
    ],
  };

  function askAI(q: string) {
    setLoadingAI(true);
    setTimeout(() => {
      const found = college.placements.aiInsights.find(i => i.question.toLowerCase().includes(q.toLowerCase()));
      if (found) {
        setAiAnswer(found);
      } else {
        setAiAnswer({
          answer: `Based on verified 2025 placement records for ${college.shortName}, placement rate stands at ${college.placementPercent}%, with strong hiring across product companies and core engineering sectors.`,
          confidence: 'high',
          sources: [`${college.shortName} Placement Report 2025`, 'NIRF Data 2024'],
        });
      }
      setLoadingAI(false);
    }, 600);
  }

  return (
    <div className="space-y-6">
      {/* Placement KPI bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Placement %', value: `${college.placementPercent}%`, color: '#1a56db' },
          { label: 'Median Package', value: formatPackage(college.medianPackage), color: '#059669' },
          { label: 'Average Package', value: formatPackage(college.averagePackage), color: '#2b4fe0' },
          { label: 'Highest Package', value: formatPackage(college.highestPackage), color: '#d97706' },
        ].map((m, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">{m.label}</p>
            <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-800 text-sm">Placement Trend (2022–2025)</h3>
          <span className="verified-badge"><CheckCircle size={9} /> Verified</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-4">Source: Official placement reports · Last verified Oct 2025</p>
        <Line data={lineData} options={{
          responsive: true,
          plugins: { legend: { position: 'top', labels: { font: { size: 11 } } }, tooltip: { mode: 'index' } },
          scales: { y: { beginAtZero: false, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } },
        }} />
      </div>

      {/* Branch-wise */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Average Package by Branch</h3>
        <Bar data={barData} options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } },
        }} />
      </div>

      {/* Top Recruiters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-3">Top Recruiters</h3>
        <div className="flex flex-wrap gap-2">
          {college.topRecruiters.map((r, i) => (
            <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Ask about placements */}
      <div className="bg-accent-soft/50 border border-line rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-ink text-sm">Ask about placements</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {college.placements.aiInsights.map((insight, i) => (
            <button
              key={i}
              onClick={() => askAI(insight.question)}
              className="px-3 py-2 bg-white border border-line rounded-lg text-xs font-medium text-accent-deep hover:bg-accent-soft transition-colors"
            >
              {insight.question}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={aiQ}
            onChange={e => setAiQ(e.target.value)}
            placeholder="Ask about placements (e.g. CSE average, tech companies)..."
            className="flex-1 px-3 py-2 bg-white border border-line rounded-lg text-sm outline-none focus:border-accent"
          />
          <button
            onClick={() => aiQ && askAI(aiQ)}
            className="px-4 py-2 bg-accent hover:bg-accent-deep text-white rounded-lg text-sm font-medium transition-colors"
          >
            Ask
          </button>
        </div>

        {loadingAI && (
          <div className="flex items-center gap-2 text-sm text-accent">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            Analysing placement data...
          </div>
        )}

        {aiAnswer && !loadingAI && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-line rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wide px-2 py-0.5 bg-accent-soft rounded-full">
                AI Interpretation
              </span>
              <span className="text-[10px] text-slate-400">
                Confidence: {aiAnswer.confidence}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{aiAnswer.answer}</p>
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {aiAnswer.sources.map((src, i) => (
                <span key={i} className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded">
                  <Shield size={8} /> {src}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Rankings Tab ─────────────────────────────────────────────────────────────
function RankingsTab({ college }: { college: College }) {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Institutional Accreditations & Rankings</h3>
            <p className="text-xs text-slate-400">Verified official rankings across national and international survey bodies</p>
          </div>
          <button
            onClick={() => setShowMethodology(true)}
            className="px-3 py-1.5 text-xs text-accent border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 font-semibold"
          >
            Ranking Methodology
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {college.rankings.map((r, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-accent text-[10px] font-bold">
                  {r.year} Ranking
                </span>
                <h4 className="font-semibold text-slate-900 text-base mt-1">{r.body}</h4>
                <p className="text-xs text-slate-500">{r.category} Category</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-accent">#{r.rank}</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">National Rank</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Modal */}
      <AnimatePresence>
        {showMethodology && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMethodology(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">National Institutional Ranking Framework (NIRF)</h3>
                <button onClick={() => setShowMethodology(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rankings on CollegeIQ are audited against official Ministry of Education NIRF methodology parameters:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span>Teaching, Learning & Resources (TLR)</span>
                  <span className="font-bold text-accent">30%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span>Research and Professional Practice (RPC)</span>
                  <span className="font-bold text-accent">30%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span>Graduation Outcomes & Placements (GO)</span>
                  <span className="font-bold text-accent">20%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span>Outreach and Inclusivity (OI)</span>
                  <span className="font-bold text-accent">10%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                  <span>Perception & Industry Reputation (PR)</span>
                  <span className="font-bold text-accent">10%</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────
function ReviewsTab({ college }: { college: College }) {
  const COMPLAINT_THEMES = [
    { theme: 'Hostel Facilities & Maintenance', percent: 34, icon: '🏠' },
    { theme: 'Administrative Scrutiny', percent: 28, icon: '📋' },
    { theme: 'Food Variety in Mess', percent: 22, icon: '🍽️' },
    { theme: 'Core vs Tech Package Variance', percent: 18, icon: '💼' },
  ];
  const PRAISE_THEMES = [
    { theme: 'Faculty Quality & Research Mentorship', percent: 84, icon: '👨‍🏫' },
    { theme: 'Campus Life & Annual Fests', percent: 79, icon: '🌱' },
    { theme: 'Placement Support & Alumni Connect', percent: 73, icon: '💼' },
    { theme: 'High Computing Infrastructure', percent: 65, icon: '🏛️' },
  ];

  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-accent">Review summary</span>
          <span className="text-[10px] text-slate-400">· {college.totalReviews.toLocaleString()} verified student reviews · 2023–2026</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Students generally appreciate the faculty, campus environment and placement opportunities.
          The most frequently reported concerns relate to hostel facilities and administrative processes.
        </p>
        <p className="text-[11px] text-slate-400 mt-2 italic">
          This is an AI-generated synthesis of verified student reviews — not isolated opinions.
        </p>
      </div>

      {/* Praise themes */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
          <ThumbsUp size={14} className="text-emerald-500" />
          What Students Like Most
        </h3>
        <div className="space-y-3">
          {PRAISE_THEMES.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg w-6 shrink-0">{t.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{t.theme}</span>
                  <span className="text-xs text-slate-400">{t.percent}% mention</span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-bar-fill bg-emerald-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complaint themes */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
          <ThumbsDown size={14} className="text-amber-500" />
          What Students Complain About Most
        </h3>
        <p className="text-[11px] text-slate-400 mb-4">
          These themes represent recurring patterns across verified reviews and should not be interpreted from a single review.
        </p>
        <div className="space-y-3">
          {COMPLAINT_THEMES.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg w-6 shrink-0">{t.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{t.theme}</span>
                  <span className="text-xs text-slate-400">{t.percent}% mention</span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-bar-fill bg-amber-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Reviews */}
      {college.reviews.map((review, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-700">{review.studentType}</span>
                {review.verified && <span className="verified-badge"><CheckCircle size={9} /> Verified</span>}
                <span className="text-xs text-slate-400">{review.course} · Batch {review.batch}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} className={s <= review.overallRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                ))}
                <span className="text-xs text-slate-500 ml-1">{review.overallRating.toFixed(1)}</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">{new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            {[
              { l: 'Faculty', v: review.facultyRating },
              { l: 'Placement', v: review.placementRating },
              { l: 'Infra', v: review.infrastructureRating },
              { l: 'Hostel', v: review.hostelRating },
              { l: 'Campus', v: review.campusRating },
              { l: 'ROI', v: review.roiRating },
            ].map(({ l, v }) => (
              <div key={l} className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-slate-400">{l}</p>
                <p className="text-sm font-bold text-slate-700">{v.toFixed(1)}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-3">{review.experience}</p>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-accent">
              <ThumbsUp size={12} /> Helpful ({review.helpfulCount})
            </button>
            <button className="text-slate-400 hover:text-red-500">Report</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Campus Tab ───────────────────────────────────────────────────────────────
function CampusTab({ college }: { college: College }) {
  const facilities = [
    { title: 'Central Academic Library', desc: 'Over 500,000 physical volumes, 24/7 digital IEEE/ACM database access, and 800+ quiet study pods.', icon: BookOpen },
    { title: 'Olympic Sports Complex', desc: 'Olympic standard swimming pool, 400m synthetic running track, floodlit tennis and cricket grounds.', icon: Dumbbell },
    { title: 'Advanced Research Labs', desc: 'High-performance computing clusters with NVIDIA DGX systems, robotics testbeds, and cleanroom facilities.', icon: Sparkles },
    { title: 'Campus Healthcare Center', desc: '24/7 operational hospital facility with resident medical officers, emergency ambulance, and pharmacy.', icon: Shield },
    { title: 'High-Speed Wi-Fi Infrastructure', desc: '10 Gbps gigabit backbone spanning all lecture halls, laboratories, hostels, and open commons.', icon: Wifi },
    { title: 'Cafeterias & Food Courts', desc: 'Multi-cuisine vegetarian and non-vegetarian food courts, popular coffee lounges, and night canteens.', icon: Coffee },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Campus Life & Infrastructure</h3>
            <p className="text-xs text-slate-400">{college.campus} sprawling comprehensive university ecosystem</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1">
            <CheckCircle size={12} /> Verified Infrastructure
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facilities.map((fac, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-accent flex items-center justify-center shrink-0 mt-0.5">
                <fac.icon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{fac.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hostel Tab ───────────────────────────────────────────────────────────────
function HostelTab({ college }: { college: College }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-1">Hostel & Residential Facilities</h3>
        <p className="text-xs text-slate-400 mb-6">On-campus accommodation specifications, mess food audits, and curfew policies</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Hostel Fee</span>
            <span className="text-sm font-bold text-slate-900">₹{college.hostelFees}L / year</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sharing Options</span>
            <span className="text-sm font-bold text-slate-900">Single, Double & Triple</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Mess Rating</span>
            <span className="text-sm font-bold text-amber-600">★ 3.8 / 5.0</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Campus Curfew</span>
            <span className="text-sm font-bold text-slate-900">10:30 PM (Biometric)</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Hostel Amenities & Governance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              '24/7 High-Speed Wi-Fi in all hostel rooms (100 Mbps)',
              'Common recreation room with TT, Carrom & Smart TV',
              'Automated laundry washing machines & dry cleaning',
              '24/7 Security guards with CCTV coverage',
              'Nutritious 4-meal daily mess (Breakfast, Lunch, Snacks, Dinner)',
              'Resident wardens and psychological counselors on call',
            ].map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg text-slate-700">
                <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scholarships Tab ─────────────────────────────────────────────────────────
function ScholarshipsTab({ college }: { college: College }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-1">Scholarships & Financial Aid</h3>
        <p className="text-xs text-slate-400 mb-6">Need-based fee waivers, merit awards, and government assistance programs</p>

        <div className="space-y-4">
          {college.scholarships.map((s, idx) => (
            <div key={idx} className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {s.type}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{s.name}</h4>
                </div>
                <p className="text-xs text-slate-600 mt-1"><span className="font-semibold">Eligibility:</span> {s.eligibility}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-emerald-700">{s.amount}</p>
                <p className="text-[10px] text-slate-400">Award Value</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Q&A Tab ──────────────────────────────────────────────────────────────────
function QATab({ college }: { college: College }) {
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      question: 'How is the hostel mess food quality and internet speed for first years?',
      author: 'Aarav Shah',
      role: 'Prospective Student',
      date: '2 weeks ago',
      upvotes: 42,
      answer: 'Mess food is quite decent compared to most state colleges. Breakfast and evening snacks are consistently good. High-speed LAN is available in every room with 100 Mbps speed, though torrents are blocked.',
      answerAuthor: 'Vikram Joshi',
      answerRole: 'Verified Current Student (3rd Year CSE)',
    },
    {
      id: 'q2',
      question: 'Do core engineering students (Mech, Civil, EE) get opportunities in software companies during placements?',
      author: 'Priya Deshmukh',
      role: 'JEE Main Candidate',
      date: '1 month ago',
      upvotes: 68,
      answer: 'Yes! About 75% of IT/product companies open their coding rounds for all engineering branches provided you meet the CGPA cutoff (usually 7.0+). Many mechanical and electrical students successfully land software engineer roles.',
      answerAuthor: 'Sneha Patel',
      answerRole: 'Verified Alumna (Batch 2023, Software Engineer at Oracle)',
    },
  ]);

  const [askModalOpen, setAskModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const { showToast } = useToast();

  function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions(prev => [
      {
        id: `q-${Date.now()}`,
        question: newQuestion,
        author: 'Arjun Mehta',
        role: 'Verified Candidate',
        date: 'Just now',
        upvotes: 1,
        answer: 'Thank you for asking! A verified student or alumnus from this institution will respond shortly.',
        answerAuthor: 'Community Bot',
        answerRole: 'Moderation System',
      },
      ...prev,
    ]);
    setNewQuestion('');
    setAskModalOpen(false);
    showToast('Question submitted to verified student community');
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Student Community Q&A</h3>
            <p className="text-xs text-slate-400">Direct questions answered by verified students and alumni</p>
          </div>
          <button
            onClick={() => setAskModalOpen(true)}
            className="px-3.5 py-1.5 bg-accent hover:bg-accent text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={13} /> Ask Question
          </button>
        </div>

        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-medium">{q.author} ({q.role}) · {q.date}</span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5">{q.question}</h4>
              </div>

              <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">{q.answerAuthor}</span>
                  <span className="text-[10px] text-slate-400">({q.answerRole})</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{q.answer}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <button className="flex items-center gap-1 hover:text-accent">
                  <ThumbsUp size={12} /> Upvote ({q.upvotes})
                </button>
                <span>·</span>
                <button className="hover:text-slate-600">Reply</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ask Modal */}
      <AnimatePresence>
        {askModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAskModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Ask a Question to Current Students</h3>
                <button onClick={() => setAskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <textarea
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  placeholder="e.g. How is the attendance policy? Are professors strict with 75% rule?"
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-blue-400 h-28"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-accent text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Submit Question
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ROI Tab ──────────────────────────────────────────────────────────────────
function ROITab({ college }: { college: College }) {
  const [tuition, setTuition] = useState(college.totalFees);
  const [hostel, setHostel] = useState(college.hostelFees);
  const [medSalary, setMedSalary] = useState(college.medianPackage);

  const totalCost = (tuition + hostel) * 4;
  const ratio = (medSalary / (totalCost || 1)).toFixed(2);
  const payback = ((totalCost || 1) / medSalary).toFixed(1);
  const roiScore = Math.min(Math.round(parseFloat(ratio) * 40 + (100 - parseFloat(payback) * 8)), 100);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-1">Return on Investment (ROI) Calculator</h3>
        <p className="text-xs text-slate-400 mb-6">Interactive analysis comparing 4-year aggregate cost against first-year median compensation</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Tuition / yr (₹ Lakhs)</label>
            <input
              type="number"
              step="0.1"
              value={tuition}
              onChange={e => setTuition(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Hostel / yr (₹ Lakhs)</label>
            <input
              type="number"
              step="0.1"
              value={hostel}
              onChange={e => setHostel(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Median CTC (₹ Lakhs)</label>
            <input
              type="number"
              step="0.5"
              value={medSalary}
              onChange={e => setMedSalary(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: 'Total 4-Yr Cost', value: `₹${totalCost.toFixed(1)}L`, color: '#dc2626' },
            { label: 'Median First Salary', value: formatPackage(medSalary), color: '#059669' },
            { label: 'Salary-to-Cost Ratio', value: `${ratio}x`, color: '#1a56db' },
            { label: 'Payback Period', value: `${payback} Years`, color: '#d97706' },
          ].map((m, i) => (
            <div key={i} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] text-slate-400 block mb-1">{m.label}</span>
              <span className="text-lg font-semibold" style={{ color: m.color }}>{m.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-900">Calculated ROI Score: {roiScore}/100</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              At a median salary of {formatPackage(medSalary)}, the complete educational investment is recouped in approximately {payback} years.
            </p>
          </div>
          <Link
            href="/roi-calculator"
            className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm"
          >
            Detailed Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Red Flags Tab ────────────────────────────────────────────────────────────
function RedFlagsTab({ college }: { college: College }) {
  const flags = [
    { item: 'Official Placement Report', status: 'Verified' as const, reason: 'Audited against official NIRF 2024 institutional disclosure filing.', source: 'MoE NIRF 2024 Portal', lastVerified: 'Oct 2025' },
    { item: 'NAAC / NBA Accreditation', status: 'Verified' as const, reason: 'Valid A++ accreditation certificate verified on NAAC portal.', source: 'NAAC National Registry', lastVerified: 'Sep 2025' },
    { item: 'Hostel Occupancy & Maintenance', status: 'Needs Verification' as const, reason: 'Recent student reviews cite periodic maintenance delays in Old Hostel Blocks 3 & 4.', source: 'Verified Student Survey', lastVerified: 'Oct 2025' },
    { item: 'State Fee Committee Sanction', status: 'Verified' as const, reason: 'Published tuition fee strictly conforms to State Fee Regulating Authority mandate.', source: 'State FRA Gazette', lastVerified: 'Aug 2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-1">College Data Health & Red Flag System</h3>
        <p className="text-xs text-slate-400 mb-6">Transparent scrutiny of all published data points, audit integrity, and potential concerns</p>

        <div className="space-y-3">
          {flags.map((flag, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{flag.item}</h4>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    flag.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {flag.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{flag.reason}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                <span>Source: {flag.source}</span>
                <span>Last Verified: {flag.lastVerified}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main College Detail Page ─────────────────────────────────────────────────
export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const college = getCollegeById(id);
  if (!college) notFound();

  const { addToCompare, removeFromCompare, compareList } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Overview');
  const match = simulateAIMatch(college.id, STUDENT_PROFILE);

  const inCompare = compareList.includes(college.id);

  function handleCompare() {
    if (!college) return;
    if (inCompare) {
      removeFromCompare(college.id);
      showToast('Removed from comparison');
    } else {
      addToCompare(college.id);
      showToast(`${college.shortName} added to comparison`);
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Profile header */}
      <header className="border-b border-line">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/colleges" className="hover:text-ink transition-colors">Colleges</Link>
            <ChevronRight size={12} />
            <span className="text-ink">{college.shortName}</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="min-w-0">
              <p className="label">
                {college.type} · {college.naacGrade} NAAC · Est. {college.established}
                {college.rankings.find(r => r.body === 'NIRF') && ` · NIRF #${college.rankings.find(r => r.body === 'NIRF')!.rank} ${college.rankings.find(r => r.body === 'NIRF')!.category}`}
              </p>
              <h1 className="font-display mt-3 text-[2.4rem] sm:text-6xl font-semibold tracking-[-0.03em] leading-[0.98] text-ink max-w-4xl">
                {college.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-muted">
                <MapPin size={15} /> {college.location} · {college.campus}
              </p>
            </div>
            <div className="flex items-end gap-6">
              <div className="lg:text-right">
                <p className="label">Reality Score</p>
                <p className="figure text-7xl sm:text-8xl font-semibold tracking-[-0.04em] leading-[0.85] text-accent nums">{college.realityScore}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <SaveButton collegeId={college.id} collegeName={college.shortName} variant="labelled" />
            <button
              onClick={handleCompare}
              aria-pressed={inCompare}
              className={`h-9 px-3 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                inCompare ? 'bg-accent-soft border-accent/30 text-accent-deep' : 'bg-surface border-line hover:border-ink-2'
              }`}
            >
              <GitCompare size={14} /> {inCompare ? 'In compare' : 'Compare'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('College profile link copied');
              }}
              className="h-9 px-3 rounded-lg border border-line bg-surface text-xs font-medium inline-flex items-center gap-1.5 hover:border-ink-2 transition-colors cursor-pointer"
            >
              <Share2 size={14} /> Share
            </button>
            {inCompare && (
              <Link href="/compare" className="h-9 px-3 text-xs font-medium inline-flex items-center text-accent hover:underline">
                Open comparison →
              </Link>
            )}
          </div>

          {/* Key modules */}
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-5 border-t border-ink nums">
            {[
              { k: 'Placement', v: `${college.placementPercent}%`, tone: 'text-positive' },
              { k: 'Median CTC', v: `₹${college.medianPackage}L` },
              { k: 'Tuition / yr', v: `₹${college.totalFees}L` },
              { k: 'Hostel / yr', v: college.hasHostel ? `₹${college.hostelFees}L` : 'Off-campus' },
              { k: 'Student rating', v: `${college.studentRating} / 5`, sub: `${college.totalReviews.toLocaleString('en-IN')} reviews` },
            ].map((m, i) => (
              <div key={m.k} className={`py-5 pr-4 ${i > 0 ? 'md:pl-5 md:border-l md:border-line' : ''} ${i % 2 === 1 ? 'pl-4 border-l border-line md:pl-5' : ''}`}>
                <dt className="label">{m.k}</dt>
                <dd className={`mt-1 figure text-3xl sm:text-4xl font-semibold tracking-[-0.025em] ${m.tone ?? ''}`}>{m.v}</dd>
                {m.sub && <dd className="text-xs text-muted mt-0.5">{m.sub}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Section tabs */}
      <div className="sticky top-14 z-30 bg-paper/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div role="tablist" aria-label="College sections" className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 py-3.5 text-[13.5px] whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.span layoutId="profile-tab" className="absolute left-3 right-3 bottom-0 h-[2px] rounded-full bg-accent" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Overview' && <OverviewTab college={college} match={match} />}
                {activeTab === 'Courses & Fees' && (
                  <div className="space-y-4">
                    {college.courses.map((course, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{course.name}</h3>
                            <span className="text-[11px] text-slate-400">{course.level} · {course.duration}</span>
                          </div>
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                            {course.seats} seats
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-400">Tuition/yr</p>
                            <p className="text-sm font-bold text-slate-800">₹{course.tuition}L</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-400">Hostel/yr</p>
                            <p className="text-sm font-bold text-slate-800">₹{course.hostelFees}L</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-400">Total 4yr Cost</p>
                            <p className="text-sm font-bold text-slate-800">₹{course.totalCost}L</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-[10px] text-slate-400">Entrance Exam</p>
                            <p className="text-sm font-bold text-slate-800">{course.entranceExam}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">
                          <span className="font-medium">Eligibility:</span> {course.eligibility}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'Admission' && <AdmissionTab college={college} />}
                {activeTab === 'Cutoff' && <CutoffTab college={college} />}
                {activeTab === 'Placements' && <PlacementsTab college={college} />}
                {activeTab === 'Rankings' && <RankingsTab college={college} />}
                {activeTab === 'Reviews' && <ReviewsTab college={college} />}
                {activeTab === 'Campus' && <CampusTab college={college} />}
                {activeTab === 'Hostel' && <HostelTab college={college} />}
                {activeTab === 'Scholarships' && <ScholarshipsTab college={college} />}
                {activeTab === 'Q&A' && <QATab college={college} />}
                {activeTab === 'ROI' && <ROITab college={college} />}
                {activeTab === 'Red Flags' && <RedFlagsTab college={college} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Quick Info Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Key Facts</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Fees (Total/yr)', value: `₹${college.totalFees}L` },
                  { label: 'Median Package', value: formatPackage(college.medianPackage) },
                  { label: 'Placement %', value: `${college.placementPercent}%` },
                  { label: 'Student Rating', value: `★ ${college.studentRating}` },
                  { label: 'Reality Score', value: `${college.realityScore}/100` },
                  { label: 'Profile fit (demo)', value: `${match.matchPercent}% Match` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-bold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships Quick Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Scholarships</h3>
              <div className="space-y-2">
                {college.scholarships.slice(0, 2).map((s, i) => (
                  <div key={i} className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-xs font-semibold text-emerald-800">{s.name}</p>
                    <p className="text-xs text-emerald-600 mt-0.5">{s.amount} · {s.type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare CTA */}
            <div className="bg-gradient-to-br from-ink to-ink-2 text-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-sm mb-1">Side-by-Side Comparison</h3>
              <p className="text-xs text-slate-400 mb-4">Compare {college.shortName} with up to 4 other top institutions with AI decision guidance.</p>
              <Link
                href="/compare"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent hover:bg-accent rounded-xl text-xs font-semibold transition-colors"
              >
                Open Comparison Assistant <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
