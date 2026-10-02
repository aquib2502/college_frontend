'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Calendar, Clock, Award, CheckCircle2, ChevronRight,
  TrendingUp, Building, ExternalLink, Sparkles, Filter, Search,
  AlertCircle, BookOpen, Layers, Shield
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ExamInfo {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  stream: 'Engineering' | 'Management' | 'Medical' | 'Postgraduate';
  level: 'National' | 'State' | 'Institutional';
  frequency: string;
  mode: string;
  duration: string;
  registrationDates: string;
  examDate: string;
  daysRemaining: number;
  eligibility: string;
  markingScheme: string;
  totalMarks: number;
  participatingInstitutes: string;
  topColleges: { name: string; id: string }[];
  cutoffTrend: string;
  description: string;
}

const EXAMS_LIST: ExamInfo[] = [
  {
    id: 'jee-main',
    name: 'JEE Main 2026',
    fullName: 'Joint Entrance Examination (Main)',
    conductingBody: 'National Testing Agency (NTA)',
    stream: 'Engineering',
    level: 'National',
    frequency: '2 Sessions (Jan & Apr)',
    mode: 'Computer Based Test (CBT)',
    duration: '3 Hours (180 mins)',
    registrationDates: 'Nov 1 – Dec 4, 2025',
    examDate: 'Jan 22 – Feb 1, 2026 (Session 1)',
    daysRemaining: 18,
    eligibility: '10+2 with Physics, Mathematics & Chem/Bio/Tech (Min 75% aggregate or top 20 percentile in class 12 board)',
    markingScheme: '+4 for correct, -1 for incorrect, 0 unattempted',
    totalMarks: 300,
    participatingInstitutes: '31 NITs, 25 IIITs, 28 GFTIs + Qualifies for JEE Advanced',
    topColleges: [
      { name: 'NIT Trichy', id: 'iit-bombay' },
      { name: 'COEP Technological University', id: 'coep' },
      { name: 'VJTI Mumbai', id: 'vjti' },
    ],
    cutoffTrend: 'General 93.2 percentile, OBC-NCL 79.2 percentile, SC 51.9 percentile, EWS 81.3 percentile',
    description: 'The primary screening test for admission to undergraduate engineering programs (B.Tech/B.Arch) in National Institutes of Technology (NITs), IIITs, and premier state universities across India.',
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced 2026',
    fullName: 'Joint Entrance Examination (Advanced)',
    conductingBody: 'IIT Consortium (IIT Kanpur Organising)',
    stream: 'Engineering',
    level: 'National',
    frequency: 'Once a year (May)',
    mode: 'Computer Based Test (CBT)',
    duration: '6 Hours (Paper 1 & 2, 3 hrs each)',
    registrationDates: 'Late April 2026 (Post JEE Main)',
    examDate: 'May 17, 2026',
    daysRemaining: 84,
    eligibility: 'Top 2,50,000 rankers in JEE Main (Paper 1) + 75% in 10+2 board exam',
    markingScheme: 'Variable (+3/+4 correct, -1/-2 negative, partial marking for multi-correct)',
    totalMarks: 360,
    participatingInstitutes: '23 Indian Institutes of Technology (IITs)',
    topColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay' },
      { name: 'IIT Delhi', id: 'iit-delhi' },
      { name: 'IIT Madras', id: 'iit-bombay' },
    ],
    cutoffTrend: 'Rank < 63 for IIT Bombay CSE; Rank < 2,500 for Top 5 IIT Core Branches',
    description: 'The world-renowned gateway examination exclusively for admission into the 23 prestigious Indian Institutes of Technology (IITs). Consistently ranked among the most rigorous academic tests globally.',
  },
  {
    id: 'mht-cet',
    name: 'MHT-CET 2026',
    fullName: 'Maharashtra Common Entrance Test',
    conductingBody: 'State CET Cell, Maharashtra',
    stream: 'Engineering',
    level: 'State',
    frequency: 'Once a year (April–May)',
    mode: 'Computer Based Test (CBT)',
    duration: '3 Hours (180 mins)',
    registrationDates: 'Jan 10 – Mar 2, 2026',
    examDate: 'Apr 16 – Apr 30, 2026',
    daysRemaining: 42,
    eligibility: '10+2 with PCM (Min 45% for Open, 40% for Reserved Category Maharashtra State)',
    markingScheme: 'No negative marking! Mathematics +2/question, Physics & Chemistry +1/question',
    totalMarks: 200,
    participatingInstitutes: '350+ Engineering Colleges across Maharashtra (85% state quota seats)',
    topColleges: [
      { name: 'COEP Technological University', id: 'coep' },
      { name: 'VJTI Mumbai', id: 'vjti' },
      { name: 'PICT Pune', id: 'coep' },
    ],
    cutoffTrend: 'COEP CSE: 99.85+ percentile; VJTI CSE: 99.78+ percentile; IT branches: 99.2+ percentile',
    description: 'The crucial entrance examination for admission to engineering and pharmacy colleges across Maharashtra state, governed by the Centralized Admission Process (CAP rounds).',
  },
  {
    id: 'bitsat',
    name: 'BITSAT 2026',
    fullName: 'BITS Admission Test',
    conductingBody: 'Birla Institute of Technology and Science (BITS Pilani)',
    stream: 'Engineering',
    level: 'Institutional',
    frequency: '2 Iterations (May & June)',
    mode: 'Computer Based Test (CBT)',
    duration: '3 Hours (130 Questions + 12 Bonus Questions)',
    registrationDates: 'Jan 15 – Apr 10, 2026',
    examDate: 'May 20 – May 26, 2026 (Session 1)',
    daysRemaining: 68,
    eligibility: '10+2 with PCM (Min 75% aggregate in PCM with at least 60% in each subject)',
    markingScheme: '+3 for correct, -1 for incorrect',
    totalMarks: 390,
    participatingInstitutes: 'BITS Pilani, BITS Goa, BITS Hyderabad campuses',
    topColleges: [
      { name: 'BITS Pilani (Pilani Campus)', id: 'bits-pilani' },
      { name: 'BITS Goa Campus', id: 'bits-pilani' },
      { name: 'BITS Hyderabad', id: 'bits-pilani' },
    ],
    cutoffTrend: 'Pilani CSE: 331/390; Goa CSE: 301/390; Hyderabad CSE: 295/390',
    description: 'Direct institutional admission test for the globally recognized BITS campuses, featuring merit-based admission with bonus questions for high-speed accuracy.',
  },
  {
    id: 'cat',
    name: 'CAT 2026',
    fullName: 'Common Admission Test',
    conductingBody: 'Indian Institutes of Management (IIMs)',
    stream: 'Management',
    level: 'National',
    frequency: 'Once a year (Last Sunday of November)',
    mode: 'Computer Based Test (CBT)',
    duration: '2 Hours (40 mins per section: VARC, DILR, QA)',
    registrationDates: 'Aug 2 – Sep 15, 2026',
    examDate: 'Nov 29, 2026',
    daysRemaining: 210,
    eligibility: 'Bachelors degree with min 50% marks (45% for SC/ST/PwD)',
    markingScheme: '+3 for correct MCQs, -1 for wrong MCQs; Non-MCQs (TITA) have 0 negative marking',
    totalMarks: 198,
    participatingInstitutes: '21 IIMs, FMS Delhi, SPJIMR Mumbai, IIT SJMSOM, NMIMS, etc.',
    topColleges: [
      { name: 'NMIMS School of Business', id: 'nmims' },
      { name: 'Symbiosis SIBM', id: 'symbiosis' },
      { name: 'IIT Bombay SJMSOM', id: 'iit-bombay' },
    ],
    cutoffTrend: 'IIM Ahmedabad: 99.6+ percentile; Top non-IIMs: 95-98 percentile',
    description: 'India\'s premier postgraduate management entrance examination testing verbal ability, data interpretation, logical reasoning, and quantitative aptitude.',
  },
  {
    id: 'gate',
    name: 'GATE 2026',
    fullName: 'Graduate Aptitude Test in Engineering',
    conductingBody: 'IISc & IITs on rotational basis',
    stream: 'Postgraduate',
    level: 'National',
    frequency: 'Once a year (February)',
    mode: 'Computer Based Test (CBT)',
    duration: '3 Hours (65 Questions)',
    registrationDates: 'Aug 24 – Oct 5, 2025',
    examDate: 'Feb 7 – Feb 15, 2026',
    daysRemaining: 24,
    eligibility: 'Graduates in Engineering/Technology or final year B.Tech/B.S. students',
    markingScheme: '1-mark & 2-mark questions (+1/+2, negative 1/3rd for MCQs; 0 for NAT/MSQ)',
    totalMarks: 100,
    participatingInstitutes: 'All IITs, IISc Bangalore, NITs, Central PSUs (ONGC, IOCL, NTPC, BHEL)',
    topColleges: [
      { name: 'IIT Bombay M.Tech', id: 'iit-bombay' },
      { name: 'COEP Pune M.Tech', id: 'coep' },
    ],
    cutoffTrend: 'CS Qualifying Cutoff: ~28-32 marks; IIT Bombay CSE M.Tech Score: >780/1000',
    description: 'Mandatory benchmark examination for master\'s degrees (M.Tech/M.S./Ph.D.) and premier Public Sector Undertaking (PSU) executive recruitment.',
  },
  {
    id: 'neet-ug',
    name: 'NEET UG 2026',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    conductingBody: 'National Testing Agency (NTA)',
    stream: 'Medical',
    level: 'National',
    frequency: 'Once a year (First Sunday of May)',
    mode: 'Pen & Paper (OMR Based)',
    duration: '3 Hours 20 Minutes (200 Questions, attempt 180)',
    registrationDates: 'Feb 9 – Mar 16, 2026',
    examDate: 'May 3, 2026',
    daysRemaining: 72,
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotech (Min 50% for Unreserved)',
    markingScheme: '+4 for correct answer, -1 for wrong answer',
    totalMarks: 720,
    participatingInstitutes: 'All AIIMS, JIPMER, State & Private Medical Colleges (1,08,000+ MBBS seats)',
    topColleges: [
      { name: 'AIIMS New Delhi', id: 'iit-bombay' },
      { name: 'KMC Manipal', id: 'manipal' },
    ],
    cutoffTrend: 'General qualifying cutoff: ~137-720; Govt Medical College seat: 620+ marks',
    description: 'The sole unified nationwide medical entrance test for admission to MBBS, BDS, BAMS, BHMS, and veterinary degree programs across India.',
  }
];

export default function ExamsPage() {
  const [selectedStream, setSelectedStream] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<ExamInfo>(EXAMS_LIST[0]);

  const filteredExams = EXAMS_LIST.filter(exam => {
    if (selectedStream !== 'ALL' && exam.stream !== selectedStream) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        exam.name.toLowerCase().includes(q) ||
        exam.fullName.toLowerCase().includes(q) ||
        exam.conductingBody.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <div className="border-b border-line pt-10 sm:pt-14 pb-10 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto">
          <p className="label">Entrance exams</p>
          <h1 className="font-display mt-3 text-[2.5rem] sm:text-6xl font-semibold tracking-[-0.028em] leading-[0.98] text-ink">
            National and state entrance exams.
          </h1>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-3xl leading-relaxed">
            Transparent schedules, official exam formats, qualifying cutoffs, and participating institutions across Engineering, Management, and Medicine.
          </p>

          {/* Search & Stream Filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search examinations (e.g. JEE Main, MHT-CET, CAT)..."
                className="w-full h-11 pl-10 pr-4 bg-surface border border-line-2/80 rounded-xl text-ink placeholder:text-faint text-sm outline-none focus:border-accent/60 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['ALL', 'Engineering', 'Management', 'Medical', 'Postgraduate'].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStream(st)}
                  className={`h-10 px-3.5 rounded-lg text-[13px] whitespace-nowrap transition-colors cursor-pointer ${
                    selectedStream === st ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-surface'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Exam Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Showing {filteredExams.length} Examinations
              </span>
              <span className="text-xs text-slate-400">Click to view breakdown</span>
            </div>

            {filteredExams.map(exam => {
              const isSelected = selectedExam.id === exam.id;
              return (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExam(exam)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-accent shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-accent">
                          {exam.level}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {exam.conductingBody}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{exam.name}</h3>
                    </div>

                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-md shrink-0">
                      {exam.daysRemaining} days left
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {exam.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-accent" /> {exam.examDate}
                    </span>
                    <span className="font-semibold text-accent flex items-center gap-0.5">
                      Explore Details <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Exam In-Depth Dossier */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-accent rounded-full text-xs font-bold">
                      {selectedExam.stream}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {selectedExam.frequency}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">{selectedExam.fullName}</h2>
                  <p className="text-xs text-slate-400 mt-1">Conducted by: {selectedExam.conductingBody}</p>
                </div>

                <Link
                  href={`/admission-probability?exam=${encodeURIComponent(selectedExam.name)}`}
                  className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 shrink-0"
                >
                  <TrendingUp size={14} /> Calculate Odds
                </Link>
              </div>

              {/* Key Timeline Dates */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Registration Window</span>
                  <span className="text-xs font-bold text-slate-800">{selectedExam.registrationDates}</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-[10px] text-accent uppercase font-semibold block mb-0.5">Examination Date</span>
                  <span className="text-xs font-bold text-accent">{selectedExam.examDate}</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-emerald-600 uppercase font-semibold block mb-0.5">Test Format</span>
                  <span className="text-xs font-bold text-emerald-800">{selectedExam.mode}</span>
                </div>
              </div>

              {/* Exam Pattern & Scoring */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={14} className="text-violet-600" />
                  Examination Pattern & Marking Scheme
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <p className="text-slate-400 text-[10px] uppercase font-semibold">Total Duration & Marks</p>
                    <p className="font-bold text-slate-800 mt-1">{selectedExam.duration} · {selectedExam.totalMarks} Marks</p>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <p className="text-slate-400 text-[10px] uppercase font-semibold">Marking Policy</p>
                    <p className="font-medium text-slate-700 mt-1">{selectedExam.markingScheme}</p>
                  </div>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-amber-500" />
                  Eligibility Requirements
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
                  {selectedExam.eligibility}
                </p>
              </div>

              {/* Cutoff Trends */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-emerald-600" />
                  Historical Cutoffs Benchmark
                </h4>
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-900 leading-relaxed font-medium">
                  {selectedExam.cutoffTrend}
                </div>
              </div>

              {/* Participating Colleges */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Building size={14} className="text-accent" />
                    Participating Institutes
                  </h4>
                  <span className="text-[11px] text-slate-400">{selectedExam.participatingInstitutes}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedExam.topColleges.map((col, idx) => (
                    <Link
                      key={idx}
                      href={`/colleges/${col.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-accent rounded-lg transition-colors"
                    >
                      <span>{col.name}</span>
                      <ChevronRight size={12} />
                    </Link>
                  ))}
                  <Link
                    href={`/colleges?exam=${encodeURIComponent(selectedExam.name)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent text-xs font-semibold text-white rounded-lg transition-colors"
                  >
                    Browse All Accepting Colleges →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
