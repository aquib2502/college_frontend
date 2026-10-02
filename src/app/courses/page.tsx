'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Filter, Sparkles, GraduationCap, Clock,
  DollarSign, ArrowRight, CheckCircle2, ChevronRight, Calculator,
  Building, Award, X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES } from '@/lib/mockData';

interface ProgramDetail {
  id: string;
  name: string;
  shortCode: string;
  level: 'UG' | 'PG' | 'PhD';
  duration: string;
  stream: 'Engineering' | 'Computer Science & AI' | 'Management' | 'Applied Sciences';
  tuitionPerYear: number; // in Lakhs
  hostelPerYear: number;
  eligibility: string;
  entranceExams: string[];
  medianPackage: number; // in Lakhs
  offeringCollegesCount: number;
  sampleColleges: { name: string; id: string; fees: number }[];
  description: string;
  keySubjects: string[];
  careerRoles: string[];
}

const COURSES_DATA: ProgramDetail[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    shortCode: 'B.Tech CSE',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Computer Science & AI',
    tuitionPerYear: 1.8,
    hostelPerYear: 0.9,
    eligibility: '10+2 with Physics, Mathematics & Chemistry (Min 75% or top 20 percentile)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET', 'BITSAT'],
    medianPackage: 18.5,
    offeringCollegesCount: 1420,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1 },
      { name: 'COEP Pune', id: 'coep', fees: 1.4 },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.9 },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 5.8 },
    ],
    description:
      'The flagship undergraduate engineering discipline focusing on algorithms, software architecture, operating systems, cloud systems, and modern AI engineering foundations.',
    keySubjects: ['Data Structures & Algorithms', 'Computer Networks', 'Operating Systems', 'Machine Learning', 'Database Systems', 'Compiler Design'],
    careerRoles: ['Software Development Engineer', 'Cloud Architect', 'Systems Engineer', 'AI/ML Engineer'],
  },
  {
    id: 'btech-ai-ml',
    name: 'B.Tech in Artificial Intelligence & Machine Learning',
    shortCode: 'B.Tech AI & ML',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Computer Science & AI',
    tuitionPerYear: 2.1,
    hostelPerYear: 0.9,
    eligibility: '10+2 with PCM (Min 60% aggregate)',
    entranceExams: ['JEE Main', 'MHT-CET', 'MET', 'COMEDK'],
    medianPackage: 16.8,
    offeringCollegesCount: 480,
    sampleColleges: [
      { name: 'COEP Pune', id: 'coep', fees: 1.4 },
      { name: 'Manipal Institute of Technology', id: 'manipal', fees: 4.8 },
      { name: 'NMIMS MPSTME', id: 'nmims', fees: 4.2 },
    ],
    description:
      'Specialized curriculum focused on neural networks, deep learning architectures, natural language processing, computer vision, and high-performance computing.',
    keySubjects: ['Deep Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'MLOps & LLM Deployment'],
    careerRoles: ['AI Research Engineer', 'Machine Learning Scientist', 'Data Scientist', 'Robotics Software Specialist'],
  },
  {
    id: 'btech-ece',
    name: 'B.Tech in Electronics & Communication Engineering',
    shortCode: 'B.Tech ECE',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Engineering',
    tuitionPerYear: 1.6,
    hostelPerYear: 0.85,
    eligibility: '10+2 with Physics & Math (Min 65%)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET'],
    medianPackage: 14.2,
    offeringCollegesCount: 1200,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1 },
      { name: 'COEP Pune', id: 'coep', fees: 1.35 },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.88 },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 5.8 },
    ],
    description:
      'Comprehensive study of semiconductor design, VLSI, microcontrollers, embedded IoT systems, and high-frequency wireless communications.',
    keySubjects: ['VLSI Circuit Design', 'Signals & Systems', 'Embedded Systems', 'Digital Signal Processing', 'Wireless Communications'],
    careerRoles: ['VLSI Design Engineer', 'Embedded Firmware Engineer', 'Hardware Systems Architect', 'Telecommunications Engineer'],
  },
  {
    id: 'btech-mech',
    name: 'B.Tech in Mechanical Engineering',
    shortCode: 'B.Tech ME',
    level: 'UG',
    duration: '4 Years (8 Semesters)',
    stream: 'Engineering',
    tuitionPerYear: 1.3,
    hostelPerYear: 0.8,
    eligibility: '10+2 with PCM (Min 60%)',
    entranceExams: ['JEE Main', 'JEE Advanced', 'MHT-CET'],
    medianPackage: 9.8,
    offeringCollegesCount: 1350,
    sampleColleges: [
      { name: 'COEP Pune', id: 'coep', fees: 1.3 },
      { name: 'VJTI Mumbai', id: 'vjti', fees: 0.85 },
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 1.1 },
    ],
    description:
      'Covers thermodynamics, structural mechanics, fluid dynamics, manufacturing automation, CAD/CAM, and EV drivetrain engineering.',
    keySubjects: ['Thermodynamics', 'Fluid Mechanics', 'Robotics & Automation', 'Finite Element Analysis', 'Electric Vehicle Systems'],
    careerRoles: ['Design Engineer (CAD)', 'Automotive Systems Engineer', 'Thermal Analyst', 'Supply Chain Operations Lead'],
  },
  {
    id: 'mba-tech',
    name: 'MBA Tech in Computer Engineering',
    shortCode: 'MBA Tech',
    level: 'PG',
    duration: '5 Years Integrated (UG + PG)',
    stream: 'Management',
    tuitionPerYear: 4.5,
    hostelPerYear: 1.6,
    eligibility: '10+2 with PCM (Min 60%) + NPAT / NMIMS-CET Exam',
    entranceExams: ['NMIMS-CET', 'JEE Main'],
    medianPackage: 12.5,
    offeringCollegesCount: 45,
    sampleColleges: [
      { name: 'NMIMS MPSTME', id: 'nmims', fees: 4.5 },
    ],
    description:
      'Dual-qualification program fusing an ABET-accredited engineering core with corporate business strategy, product management, and financial analytics.',
    keySubjects: ['Technology Product Strategy', 'Corporate Finance', 'Enterprise Systems', 'Digital Transformation', 'Marketing Analytics'],
    careerRoles: ['Technical Product Manager (TPM)', 'Strategy Consultant', 'Business Systems Analyst', 'Corporate Innovation Manager'],
  },
  {
    id: 'mtech-cs',
    name: 'M.Tech in Computer Science & Engineering',
    shortCode: 'M.Tech CSE',
    level: 'PG',
    duration: '2 Years (4 Semesters)',
    stream: 'Computer Science & AI',
    tuitionPerYear: 1.2,
    hostelPerYear: 0.7,
    eligibility: 'B.Tech/B.E. in relevant discipline + Valid GATE score',
    entranceExams: ['GATE'],
    medianPackage: 22.0,
    offeringCollegesCount: 620,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 0.9 },
      { name: 'COEP Pune', id: 'coep', fees: 1.1 },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 4.2 },
    ],
    description:
      'Advanced postgraduate research program in high-performance computing, distributed algorithms, cryptographic protocols, and specialized AI models.',
    keySubjects: ['Advanced Algorithms', 'Distributed Consensus', 'Deep Learning Research', 'Advanced Cryptography'],
    careerRoles: ['Principal Research Engineer', 'Applied AI Scientist', 'Senior Architect', 'University Faculty'],
  },
  {
    id: 'phd-cs',
    name: 'Ph.D. in Computer Science & Informatics',
    shortCode: 'Ph.D. CSE',
    level: 'PhD',
    duration: '3–5 Years',
    stream: 'Computer Science & AI',
    tuitionPerYear: 0.4,
    hostelPerYear: 0.5,
    eligibility: 'M.Tech/M.S. with min 65% + GATE/NET/UGC-CSIR qualified',
    entranceExams: ['GATE', 'CSIR-NET', 'Institutional Written Test'],
    medianPackage: 28.0,
    offeringCollegesCount: 180,
    sampleColleges: [
      { name: 'IIT Bombay', id: 'iit-bombay', fees: 0.35 },
      { name: 'BITS Pilani', id: 'bits-pilani', fees: 1.2 },
    ],
    description:
      'Doctoral research program supported by institutional fellowships (₹37,000–₹42,000/month JRF/SRF stipend), publishing in top ACM/IEEE conferences.',
    keySubjects: ['Research Methodology', 'Advanced Seminar Series', 'Dissertation Defense', 'Patent Filing'],
    careerRoles: ['Staff Research Scientist', 'University Professor', 'Chief Technology Officer (R&D)', 'Policy Advisor'],
  },
];

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'UG' | 'PG' | 'PhD'>('ALL');
  const [selectedStream, setSelectedStream] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCourse, setActiveModalCourse] = useState<ProgramDetail | null>(null);

  const filteredCourses = COURSES_DATA.filter(course => {
    if (selectedLevel !== 'ALL' && course.level !== selectedLevel) return false;
    if (selectedStream !== 'ALL' && course.stream !== selectedStream) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        course.name.toLowerCase().includes(q) ||
        course.shortCode.toLowerCase().includes(q) ||
        course.entranceExams.some(e => e.toLowerCase().includes(q)) ||
        course.careerRoles.some(r => r.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <section className="border-b border-line pt-10 sm:pt-14 pb-10 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-3xl">
            <p className="label">Courses · programme directory</p>
            <h1 className="font-display mt-3 text-[2.5rem] sm:text-6xl font-semibold tracking-[-0.028em] leading-[0.98] text-ink">
              Degrees, fees and where they lead.
            </h1>
            <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
              Compare duration, estimated tuition, hostel costs, eligibility, and median campus packages across programmes in the demo dataset.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-8 relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search programs by name, entrance exam (e.g. JEE, GATE), or job role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-surface border border-line-2/80 rounded-xl text-ink placeholder:text-faint text-sm outline-none focus:border-accent/60 focus:shadow-[0_0_0_4px_rgba(43,79,224,0.1)] transition-[border-color,box-shadow]"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs for Level */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl w-fit">
            {[
              { id: 'ALL', label: 'All Degrees' },
              { id: 'UG', label: 'Undergraduate (UG)' },
              { id: 'PG', label: 'Postgraduate (PG)' },
              { id: 'PhD', label: 'Doctoral (Ph.D.)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as typeof selectedLevel)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLevel === tab.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stream Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Discipline:</span>
            <select
              value={selectedStream}
              onChange={e => setSelectedStream(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Disciplines</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
              <option value="Engineering">Engineering (Core)</option>
              <option value="Management">Management</option>
              <option value="Applied Sciences">Applied Sciences</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-4 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-slate-900">{filteredCourses.length}</strong> academic programs</span>
          <span className="hidden sm:inline">Click any course to inspect subjects, admission eligibility & ROI</span>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
                    {course.level} • {course.duration}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {course.stream}
                  </span>
                </div>

                {/* Course Name */}
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-accent transition-colors">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-slate-50 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Estimated Tuition</span>
                    <span className="text-sm font-bold text-slate-900">₹{course.tuitionPerYear}L <span className="text-[10px] font-normal text-slate-500">/ yr</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Median Package</span>
                    <span className="text-sm font-bold text-emerald-600">₹{course.medianPackage}L <span className="text-[10px] font-normal text-slate-500">CTC</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Hostel Est.</span>
                    <span className="text-xs font-semibold text-slate-700">₹{course.hostelPerYear}L / yr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Total 4-Yr Est.</span>
                    <span className="text-xs font-semibold text-slate-700">
                      ₹{((course.tuitionPerYear + course.hostelPerYear) * (course.level === 'PG' ? 2 : 4)).toFixed(1)}L
                    </span>
                  </div>
                </div>

                {/* Exams Accepted */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Accepted Entrance Exams
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.entranceExams.map((exam, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Offering Colleges Preview */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Top Verified Colleges
                  </span>
                  <div className="space-y-1">
                    {course.sampleColleges.slice(0, 3).map((col, idx) => (
                      <Link
                        key={idx}
                        href={`/colleges/${col.id}`}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
                      >
                        <span className="truncate font-medium">{col.name}</span>
                        <span className="text-slate-400 shrink-0 text-[11px]">₹{col.fees}L/yr</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <Link
                  href={`/courses/${course.id}`}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-accent hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  Program Details <ChevronRight size={12} />
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveModalCourse(course)}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Quick View
                  </button>
                  <Link
                    href={`/roi-calculator?tuition=${course.tuitionPerYear}&salary=${course.medianPackage}&course=${encodeURIComponent(course.shortCode)}`}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Calculate ROI for this degree"
                  >
                    <Calculator size={15} />
                  </Link>

                  <Link
                    href={`/colleges?search=${encodeURIComponent(course.shortCode)}`}
                    className="px-3 py-1.5 bg-accent hover:bg-accent text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Colleges</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {activeModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalCourse(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-accent text-[10px] font-bold">
                      {activeModalCourse.level}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {activeModalCourse.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{activeModalCourse.name}</h3>
                </div>
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Program Overview</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeModalCourse.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Admission Eligibility</span>
                    <span className="text-xs font-semibold text-slate-800">{activeModalCourse.eligibility}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Median Industry Starting CTC</span>
                    <span className="text-sm font-bold text-emerald-600">₹{activeModalCourse.medianPackage} LPA</span>
                  </div>
                </div>

                {/* Key subjects */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Core Curriculum Pillars</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalCourse.keySubjects.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-700">
                        <CheckCircle2 size={13} className="text-accent shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Roles */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Career Outcomes</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalCourse.careerRoles.map((role, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Colleges */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Top Colleges Offering This Program</h4>
                  <div className="space-y-2">
                    {activeModalCourse.sampleColleges.map((col, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                        <div>
                          <p className="font-semibold text-xs text-slate-900">{col.name}</p>
                          <p className="text-[11px] text-slate-400">Annual Tuition: ₹{col.fees} Lakhs</p>
                        </div>
                        <Link
                          href={`/colleges/${col.id}`}
                          className="px-3 py-1 text-xs font-semibold text-accent hover:bg-blue-50 rounded-lg"
                        >
                          View College →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/roi-calculator?tuition=${activeModalCourse.tuitionPerYear}&salary=${activeModalCourse.medianPackage}&course=${encodeURIComponent(activeModalCourse.shortCode)}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <Calculator size={14} />
                  Simulate ROI on this Degree
                </Link>
                <Link
                  href={`/colleges?search=${encodeURIComponent(activeModalCourse.shortCode)}`}
                  className="px-4 py-2 bg-accent hover:bg-accent text-white text-xs font-semibold rounded-xl"
                >
                  Browse All Offering Colleges
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
