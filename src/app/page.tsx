'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Bookmark,
  SlidersHorizontal,
  Star,
  Check,
  Zap,
  TrendingUp,
  Brain,
  Layers,
  Sparkles,
  Command,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES } from '@/lib/mockData';

// Rotating queries for hero typewriter effect
const HERO_TYPEWRITER_QUERIES = [
  'B.Tech colleges under ₹8L...',
  'MBA colleges with strong ROI...',
  'Best colleges near Mumbai...',
  'Colleges with excellent placements...',
  'B.Tech in Maharashtra with strong campus life...',
];

// Specialization tracks with abstract technical imagery (not college photos)
const SPECIALIZATIONS = [
  {
    id: 'cs',
    title: 'Computer Science & AI',
    description: 'System software, distributed infrastructure, and applied machine learning.',
    medianPackage: '₹9.4L',
    placementRate: '91%',
    collegesCount: '420 Colleges',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #3B82F6 320deg, transparent 360deg)',
    accent: '#3B82F6',
  },
  {
    id: 'vlsi',
    title: 'Electronics & VLSI',
    description: 'Semiconductor design, embedded systems, microcontrollers and silicon tapeout.',
    medianPackage: '₹8.1L',
    placementRate: '86%',
    collegesCount: '310 Colleges',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #6366F1 320deg, transparent 360deg)',
    accent: '#6366F1',
  },
  {
    id: 'mech',
    title: 'Mechanical & Robotics',
    description: 'Autonomous robotics, kinematics, thermal systems and precision automation.',
    medianPackage: '₹6.8L',
    placementRate: '79%',
    collegesCount: '280 Colleges',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #0284C7 320deg, transparent 360deg)',
    accent: '#0284C7',
  },
  {
    id: 'mgmt',
    title: 'Management & Finance',
    description: 'Quantitative finance, product strategy, consulting operations and analytics.',
    medianPackage: '₹11.2L',
    placementRate: '88%',
    collegesCount: '240 Colleges',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #F59E0B 320deg, transparent 360deg)',
    accent: '#F59E0B',
  },
];

// Presets for "Tell us what you want" AI Feature Showcase
const AI_PRESET_SCENARIOS = [
  {
    query: 'I want a B.Tech college in Maharashtra under ₹8L...',
    shortName: 'B.Tech in Maharashtra (<₹8L)',
    priorities: [
      { label: 'Degree', value: 'B.Tech Engineering' },
      { label: 'Location', value: 'Maharashtra' },
      { label: 'Tuition Ceiling', value: '₹8.0 Lakh' },
      { label: 'Primary Priority', value: 'High Placement Decile' },
    ],
    matches: [
      {
        id: 'coep',
        name: 'COEP Technological University',
        city: 'Pune',
        state: 'Maharashtra',
        degree: 'B.Tech Computer Science / Mechanical',
        tuition: '₹1.4L',
        median: '₹14.2L',
        placement: '84%',
        reasons: ['Strong placement outcomes', 'Well within ₹8L budget', 'Prime Pune industrial hub'],
      },
      {
        id: 'vjti',
        name: 'Veermata Jijabai Technological Institute (VJTI)',
        city: 'Mumbai',
        state: 'Maharashtra',
        degree: 'B.Tech Computer Science / Electronics',
        tuition: '₹1.1L',
        median: '₹16.8L',
        placement: '89%',
        reasons: ['Premier Mumbai tech recruitment', 'Exceptional tuition ROI', 'Tier-1 alumni network'],
      },
      {
        id: 'walchand',
        name: 'Walchand College of Engineering',
        city: 'Sangli',
        state: 'Maharashtra',
        degree: 'B.Tech IT / Electronics',
        tuition: '₹1.2L',
        median: '₹9.4L',
        placement: '82%',
        reasons: ['Government-aided low fee', 'High coding placement culture', 'Within Maharashtra state quota'],
      },
    ],
  },
  {
    query: 'Premier engineering institutes with median CTC > ₹18L...',
    shortName: 'High Median CTC (>₹18L)',
    priorities: [
      { label: 'Degree', value: 'B.Tech / B.E.' },
      { label: 'Outcome Target', value: 'Median > ₹18.0L CTC' },
      { label: 'Institute Tier', value: 'Premier National' },
      { label: 'Primary Priority', value: 'Tech Giants & Research' },
    ],
    matches: [
      {
        id: 'bits',
        name: 'BITS Pilani',
        city: 'Pilani',
        state: 'Rajasthan',
        degree: 'B.E. Computer Science / Electronics',
        tuition: '₹4.8L',
        median: '₹20.5L',
        placement: '94%',
        reasons: ['Top 3% national median CTC', 'Zero-attendance flexibility', 'Global tech recruitment'],
      },
      {
        id: 'vjti',
        name: 'Veermata Jijabai Technological Institute (VJTI)',
        city: 'Mumbai',
        state: 'Maharashtra',
        degree: 'B.Tech Computer Science',
        tuition: '₹1.1L',
        median: '₹16.8L',
        placement: '89%',
        reasons: ['Top-bracket finance & tech firms', 'Exceptional salary-to-fee ratio', 'Urban tech ecosystem'],
      },
      {
        id: 'coep',
        name: 'COEP Technological University',
        city: 'Pune',
        state: 'Maharashtra',
        degree: 'B.Tech Computer Science',
        tuition: '₹1.4L',
        median: '₹14.2L',
        placement: '84%',
        reasons: ['Legacy industrial hiring', 'Direct Fortune 500 recruiting', 'High median packages'],
      },
    ],
  },
  {
    query: 'Affordable colleges with verified hostel and 85%+ placements...',
    shortName: 'Affordable with Hostel & ROI',
    priorities: [
      { label: 'Campus Facility', value: 'Verified On-Campus Hostel' },
      { label: 'Tuition Profile', value: 'High Value / Government' },
      { label: 'Placement Floor', value: '85%+ Placement Record' },
      { label: 'Student Sentiment', value: 'Positive Campus Safety' },
    ],
    matches: [
      {
        id: 'coep',
        name: 'COEP Technological University',
        city: 'Pune',
        state: 'Maharashtra',
        degree: 'B.Tech Engineering',
        tuition: '₹1.4L',
        median: '₹14.2L',
        placement: '84%',
        reasons: ['Government regulated fee', '170-acre campus with hostels', 'Verified peer coding clubs'],
      },
      {
        id: 'walchand',
        name: 'Walchand College of Engineering',
        city: 'Sangli',
        state: 'Maharashtra',
        degree: 'B.Tech Technical Courses',
        tuition: '₹1.2L',
        median: '₹9.4L',
        placement: '82%',
        reasons: ['Affordable hostel living costs', 'Consistent 80%+ placements', 'Strong technical alumni'],
      },
      {
        id: 'vjti',
        name: 'VJTI Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        degree: 'B.Tech Core & Software',
        tuition: '₹1.1L',
        median: '₹16.8L',
        placement: '89%',
        reasons: ['Highest ROI in western region', 'Central campus amenities', 'High placement rate'],
      },
    ],
  },
];

// Central counselling milestones
const ADMISSION_MILESTONES = [
  { date: '18 SEP', title: 'JoSAA Round 5', desc: 'Seat Acceptance & Document Upload' },
  { date: '02 OCT', title: 'MHT-CET CAP', desc: 'State Option Form Confirmation' },
  { date: '15 OCT', title: 'BITSAT Final', desc: 'Iteration Round Allotment Window' },
  { date: '26 OCT', title: 'NMAT Window', desc: 'National MBA Registration Closes' },
];

export default function HomePage() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  // Hero search typewriter state
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Hero inline interpretation state
  const [isHeroInterpreting, setIsHeroInterpreting] = useState(false);
  const [heroInterpretedDone, setHeroInterpretedDone] = useState(false);
  const [heroSearchFocused, setHeroSearchFocused] = useState(false);

  // Section 4 "Tell us what you want" showcase state
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [tellSearchQuery, setTellSearchQuery] = useState(AI_PRESET_SCENARIOS[0].query);
  const [showcaseStep, setShowcaseStep] = useState<'idle' | 'expanding' | 'understanding' | 'results'>('idle');
  const [animatingPriorities, setAnimatingPriorities] = useState<number[]>([]);

  // Rankings state
  const [selectedSort, setSelectedSort] = useState<'realityScore' | 'medianPackage' | 'placementPercent'>('realityScore');
  const [savedIds, setSavedIds] = useState<string[]>(['coep']);

  const activeScenario = AI_PRESET_SCENARIOS[activeScenarioIndex];

  // Hero Typewriter Effect (Tasteful, smooth, no blinking cheap cursor)
  useEffect(() => {
    if (heroSearchFocused || heroSearchInput.length > 0) return;

    const currentQuery = HERO_TYPEWRITER_QUERIES[typewriterIndex];
    const typingSpeed = isDeleting ? 25 : 45;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentQuery.length) {
          setDisplayedText(currentQuery.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentQuery.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTypewriterIndex((prev) => (prev + 1) % HERO_TYPEWRITER_QUERIES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typewriterIndex, heroSearchFocused, heroSearchInput]);

  // Handle Hero Search Submit: Animate into interpreted requirements, DO NOT immediately navigate
  function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = heroSearchInput.trim() || displayedText;
    if (!query) return;

    setIsHeroInterpreting(true);
    setHeroInterpretedDone(false);

    // Sequence: Interpretation -> Match
    setTimeout(() => {
      setIsHeroInterpreting(false);
      setHeroInterpretedDone(true);
    }, 900);
  }

  // Handle "Tell us what you want" interactive flow
  function handleRunTellSearch(queryText?: string, scenarioIdx?: number) {
    const targetIdx = scenarioIdx !== undefined ? scenarioIdx : activeScenarioIndex;
    const targetQuery = queryText || AI_PRESET_SCENARIOS[targetIdx].query;

    setActiveScenarioIndex(targetIdx);
    setTellSearchQuery(targetQuery);
    setShowcaseStep('expanding');
    setAnimatingPriorities([]);

    // Step 2 -> Step 3: Understanding animation with staggered priority badges
    setTimeout(() => {
      setShowcaseStep('understanding');
      const prioritiesCount = AI_PRESET_SCENARIOS[targetIdx].priorities.length;
      for (let i = 0; i < prioritiesCount; i++) {
        setTimeout(() => {
          setAnimatingPriorities((prev) => [...prev, i]);
        }, i * 160);
      }

      // Step 3 -> Step 4: Transform to full-width results
      setTimeout(() => {
        setShowcaseStep('results');
      }, prioritiesCount * 160 + 700);
    }, 450);
  }

  function toggleSave(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  // Sorted colleges for rankings
  const sortedColleges = [...COLLEGES].sort((a, b) => {
    if (selectedSort === 'realityScore') return b.realityScore - a.realityScore;
    if (selectedSort === 'medianPackage') return b.medianPackage - a.medianPackage;
    return b.placementPercent - a.placementPercent;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0B1528] font-sans antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB]">
      <Navbar />

      {/* ─── 01. HERO: CENTERED, RESTRAINED, ATMOSPHERIC REACT BITS LIQUID LINES BACKGROUND ─── */}
      <section className="relative pt-14 sm:pt-20 pb-20 md:pb-28 overflow-hidden bg-[#FAFAF8] border-b border-neutral-200/60">
        {/* React Bits Low-Intensity Flowing Lines & Atmospheric Blur */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Subtle Ambient Depth Orbs */}
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-[#2563EB]/[0.08] via-[#38BDF8]/[0.04] to-transparent rounded-full blur-[100px]" />
          <div className="absolute top-32 right-[-5%] w-[420px] h-[420px] bg-[#2563EB]/[0.04] rounded-full blur-[90px]" />
          <div className="absolute top-48 left-[-5%] w-[400px] h-[400px] bg-[#38BDF8]/[0.03] rounded-full blur-[90px]" />

          {/* Liquid Lines: Fine flowing harmonic SVG contours */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 760"
          >
            <path
              d="M-40,240 C320,120 480,360 820,200 C1160,40 1320,280 1480,180"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.2"
            />
            <path
              d="M-40,340 C300,220 540,440 900,280 C1260,120 1360,320 1480,260"
              fill="none"
              stroke="#0B1528"
              strokeWidth="1"
            />
            <path
              d="M-40,460 C260,380 600,520 960,380 C1320,240 1400,420 1480,360"
              fill="none"
              stroke="#2563EB"
              strokeWidth="0.8"
            />
          </svg>

          {/* Subtle micro-grid for engineering precision feel */}
          <div className="absolute inset-0 bg-[radial-gradient(#0B1528_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.02]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          {/* Headline: Clean, tight, brand-blue emphasis */}
          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-[-0.04em] text-[#0B1528] leading-[0.98]"
          >
            Find the college <br />
            that fits <span className="text-[#2563EB]">your future</span>.
          </motion.h1>

          {/* Subtitle: Exactly ONE short sentence */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl mx-auto"
          >
            Explore colleges by fees, placements, courses, location and student experience.
          </motion.p>

          {/* ─── HERO SEARCH: EXPANSIVE 800px AI DISCOVERY INTERFACE (DOUBLE-BEZEL ARCHITECTURE) ─── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-3xl mx-auto"
          >
            {/* Outer Machine Bezel */}
            <div
              className={`p-1.5 sm:p-2 rounded-[1.75rem] transition-all duration-300 ${
                heroSearchFocused
                  ? 'bg-blue-500/[0.12] ring-2 ring-[#2563EB]/40 shadow-[0_24px_60px_-15px_rgba(37,99,235,0.2)]'
                  : 'bg-neutral-900/[0.04] ring-1 ring-neutral-300/70 shadow-[0_16px_45px_-12px_rgba(11,21,40,0.08)] hover:ring-neutral-400/80'
              }`}
            >
              {/* Inner Core Container */}
              <div className="bg-white rounded-[1.35rem] p-4 sm:p-5 text-left border border-neutral-200/80">
                {/* Search Bar Status Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="font-mono text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      AI Discovery Interface
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <span>Search naturally</span>
                    <span className="text-neutral-300">·</span>
                    <span>Press Enter ↵</span>
                  </div>
                </div>

                {/* Form Input with Tasteful Animated Typewriter Placeholder */}
                <form onSubmit={handleHeroSubmit} className="relative flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="relative flex-1 flex items-center min-w-0">
                    <div className="pl-1 pr-3 text-neutral-400">
                      <Search size={20} className="text-[#2563EB]" strokeWidth={2} />
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={heroSearchInput}
                        onChange={(e) => setHeroSearchInput(e.target.value)}
                        onFocus={() => setHeroSearchFocused(true)}
                        onBlur={() => setHeroSearchFocused(false)}
                        placeholder=""
                        className="w-full py-2.5 bg-transparent text-[#0B1528] text-base sm:text-lg font-medium placeholder-transparent focus:outline-none"
                      />
                      {/* Animated Placeholder when user hasn't typed */}
                      {heroSearchInput.length === 0 && (
                        <div
                          onClick={() => {
                            const inputEl = document.querySelector('input');
                            inputEl?.focus();
                          }}
                          className="absolute inset-0 flex items-center pointer-events-none text-neutral-400 text-base sm:text-lg font-medium truncate"
                        >
                          <span className="text-neutral-400/80 mr-1.5">Search for:</span>
                          <span className="text-neutral-600 font-normal truncate">
                            &ldquo;{displayedText}&rdquo;
                          </span>
                          <span className="inline-block w-[2px] h-[1.1em] bg-[#2563EB] ml-0.5 align-middle animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary CTA with Nested Button-in-Button Arrow */}
                  <button
                    type="submit"
                    className="group shrink-0 inline-flex items-center justify-between gap-3 px-5 py-3 bg-[#0B1528] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <span>Find Colleges</span>
                    <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5">
                      <ArrowRight size={13} className="text-white" />
                    </span>
                  </button>
                </form>

                {/* Sub-bar Quick Prompts */}
                <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 text-neutral-500">
                    <span className="text-[11px] text-neutral-400 font-mono">Example:</span>
                    <button
                      type="button"
                      onClick={() => setHeroSearchInput('B.Tech in Maharashtra under ₹8L')}
                      className="px-2 py-0.5 rounded text-[11px] bg-neutral-100/80 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 transition-colors cursor-pointer"
                    >
                      B.Tech under ₹8L
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroSearchInput('Top colleges near Mumbai with high ROI')}
                      className="px-2 py-0.5 rounded text-[11px] bg-neutral-100/80 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 transition-colors cursor-pointer"
                    >
                      Near Mumbai
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroSearchInput('Premier colleges with median CTC > ₹18L')}
                      className="px-2 py-0.5 rounded text-[11px] bg-neutral-100/80 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 transition-colors cursor-pointer hidden sm:inline"
                    >
                      Median CTC &gt; ₹18L
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                    2,400+ Verified Colleges
                  </span>
                </div>
              </div>
            </div>

            {/* ─── LIVE HERO INTELLIGENCE INTERPRETATION ACCORDION (RULE 5) ─── */}
            <AnimatePresence>
              {(isHeroInterpreting || heroInterpretedDone) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 overflow-hidden text-left"
                >
                  <div className="bg-white rounded-2xl border border-blue-200/90 p-4 sm:p-5 shadow-lg shadow-blue-500/5">
                    {isHeroInterpreting ? (
                      <div className="flex items-center gap-3 py-2 text-sm text-[#0B1528] font-medium">
                        <span className="w-4 h-4 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
                        <span>Interpreting parameters & finding colleges that match...</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                              <Check size={13} /> Interpreted Requirements
                            </span>
                          </div>
                          <span className="text-xs text-neutral-400 font-mono">Matched 3 Premier Institutions</span>
                        </div>

                        {/* Interpreted Dimension Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-medium border border-blue-100">
                            Course: B.Tech Engineering
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-medium border border-blue-100">
                            Region: Maharashtra / Pune
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-medium border border-blue-100">
                            Budget: ≤ ₹8.0L Tuition
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-medium border border-blue-100">
                            Focus: High Median Placement
                          </span>
                        </div>

                        {/* Fast Result Rows */}
                        <div className="space-y-2 mb-3">
                          <div className="p-2.5 rounded-xl bg-neutral-50 hover:bg-blue-50/60 transition-colors flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-[#0B1528]">COEP Technological University</span>
                              <span className="text-neutral-500 ml-2">Pune · ₹1.4L/yr · ₹14.2L Median</span>
                            </div>
                            <Link href="/colleges/coep" className="text-[#2563EB] font-semibold hover:underline">
                              View →
                            </Link>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-50 hover:bg-blue-50/60 transition-colors flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-[#0B1528]">VJTI Mumbai</span>
                              <span className="text-neutral-500 ml-2">Mumbai · ₹1.1L/yr · ₹16.8L Median</span>
                            </div>
                            <Link href="/colleges/vjti" className="text-[#2563EB] font-semibold hover:underline">
                              View →
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById('tell-us-what-you-want');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-xs text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            Explore full interactive breakdown below <ArrowRight size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setHeroInterpretedDone(false)}
                            className="text-xs text-neutral-400 hover:text-neutral-600"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── HERO FEATURES: SIMPLE TYPOGRAPHY WITH TINY BLUE INDICATORS (NO CARDS, NO PILLS) ─── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 pt-8 border-t border-neutral-200/70 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-neutral-600"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-neutral-800 font-semibold">Search naturally</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-neutral-800 font-semibold">Compare colleges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-neutral-800 font-semibold">Understand rankings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-neutral-800 font-semibold">Read student reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02. METRICS STRIP: RESTRAINED, CLEAN, ZERO SLOP ─── */}
      <section className="py-12 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1528] tracking-tight font-display">
                2,400+
              </p>
              <p className="text-xs uppercase font-mono tracking-wider font-semibold text-[#2563EB] mt-1">
                Colleges Audited
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                NIRF & official state fee gazettes.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1528] tracking-tight font-display">
                48,000+
              </p>
              <p className="text-xs uppercase font-mono tracking-wider font-semibold text-[#2563EB] mt-1">
                Student Reviews
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Verified enrollment & uncensored cautions.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1528] tracking-tight font-display">
                100%
              </p>
              <p className="text-xs uppercase font-mono tracking-wider font-semibold text-[#2563EB] mt-1">
                Zero Sponsored Ranks
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                No paid placement promotions allowed.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1528] tracking-tight font-display">
                ₹0 Hidden
              </p>
              <p className="text-xs uppercase font-mono tracking-wider font-semibold text-[#2563EB] mt-1">
                True Cost Accounting
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Hostel and caution deposits included upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03. COLLEGE RANKING SECTION: CLEAN NUMBERED ROWS (USEFUL DATA ONLY, FAST HOVER) ─── */}
      <section className="py-20 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Verified Rankings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1528] font-display">
                Top Colleges in India
              </h2>
              <p className="text-sm text-neutral-500 mt-1 max-w-xl">
                Ranked by verified placements, audited fee values, and multi-factor student outcomes.
              </p>
            </div>

            {/* Sort Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono uppercase text-neutral-400 mr-2 flex items-center gap-1">
                <SlidersHorizontal size={13} /> Sort:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSort('realityScore')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedSort === 'realityScore'
                    ? 'bg-[#0B1528] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                }`}
              >
                Overall Score
              </button>
              <button
                type="button"
                onClick={() => setSelectedSort('medianPackage')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedSort === 'medianPackage'
                    ? 'bg-[#0B1528] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                }`}
              >
                Median Package
              </button>
              <button
                type="button"
                onClick={() => setSelectedSort('placementPercent')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedSort === 'placementPercent'
                    ? 'bg-[#0B1528] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                }`}
              >
                Placement Rate
              </button>
            </div>
          </div>

          {/* Ranking Rows: Clutter-Free, No AI-Slop Badges, Fast 150ms Hover */}
          <div className="divide-y divide-neutral-200/80">
            {sortedColleges.slice(0, 6).map((college, index) => {
              const isSaved = savedIds.includes(college.id);
              const rankFormatted = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={college.id}
                  whileHover={prefersReduced ? {} : { x: 3, backgroundColor: 'rgba(238, 245, 255, 0.5)' }}
                  transition={{ duration: 0.15 }}
                  className="group py-5 px-3 sm:px-4 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors duration-150 cursor-pointer"
                  onClick={() => router.push(`/colleges/${college.id}`)}
                >
                  {/* Left: Number + College Identification (NO unnecessary pills/badges) */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0B1528]/20 group-hover:text-[#2563EB] transition-colors duration-150 w-10 shrink-0">
                      {rankFormatted}
                    </span>

                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-neutral-500">
                        {college.city}, {college.state}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mt-0.5 group-hover:text-[#2563EB] transition-colors duration-150 truncate">
                        {college.name}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Clean Metrics & Direct Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 border-t lg:border-t-0 pt-3 lg:pt-0 border-neutral-100">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-semibold">
                        Tuition
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#0B1528] block">
                        ₹{college.totalFees}L / yr
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-semibold">
                        Median CTC
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#0B1528] block">
                        ₹{college.medianPackage}L
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-semibold">
                        Placement
                      </span>
                      <span className="text-sm sm:text-base font-bold text-emerald-700 block">
                        {college.placementPercent}%
                      </span>
                    </div>

                    <div className="text-left pl-3 border-l border-neutral-200">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#2563EB] block font-bold">
                        Score
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-[#0B1528] block font-mono">
                        {college.realityScore}<span className="text-xs font-normal text-neutral-400 font-sans">/100</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => toggleSave(college.id, e)}
                        className="p-2 rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
                        title={isSaved ? 'Saved' : 'Save'}
                      >
                        <Bookmark
                          size={15}
                          className={isSaved ? 'fill-[#0B1528] text-[#0B1528]' : ''}
                        />
                      </button>

                      <Link
                        href={`/colleges/${college.id}`}
                        className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#0B1528] group-hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors duration-150"
                      >
                        <span>View</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-200/70 flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Showing top 6 institutions. Compare all colleges with multi-factor filters.
            </span>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-1.5 text-xs text-[#2563EB] font-bold hover:underline"
            >
              View all 2,400+ colleges <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 04. "TELL US WHAT YOU WANT" — MAJOR INTERACTIVE PRODUCT FEATURE SHOWCASE (RULES 10–13) ─── */}
      <section
        id="tell-us-what-you-want"
        className="py-24 bg-gradient-to-b from-[#EEF4FE] via-[#F4F8FE] to-[#FDFDFD] border-b border-neutral-200/70 transition-all duration-500"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] block mb-1">
              Natural Language Matcher
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0B1528]">
              Tell us what you want.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal">
              Describe your ideal college in your own words.
            </p>
          </div>

          {/* Large Centered Search Interface */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-blue-200/90 shadow-[0_12px_45px_rgba(37,99,235,0.08)] p-3 sm:p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunTellSearch();
                }}
                className="flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="relative flex-1 flex items-center">
                  <div className="pl-3 pr-3 text-[#2563EB]">
                    <Brain size={20} strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    value={tellSearchQuery}
                    onChange={(e) => setTellSearchQuery(e.target.value)}
                    placeholder="I want a B.Tech college in Maharashtra under ₹8L..."
                    className="w-full py-3 px-1 bg-transparent text-[#0B1528] text-base sm:text-lg font-medium placeholder-neutral-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-2xl shadow-[0_4px_16px_rgba(37,99,235,0.25)] transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Find My Colleges</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Preset Scenario Selectors */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">Scenarios:</span>
                {AI_PRESET_SCENARIOS.map((sc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRunTellSearch(sc.query, idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeScenarioIndex === idx && showcaseStep !== 'idle'
                        ? 'bg-[#0B1528] text-white font-semibold'
                        : 'bg-neutral-100 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700'
                    }`}
                  >
                    {sc.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── ANIMATED INTERPRETATION SEQUENCE (STEP 3 & STEP 4) ─── */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              {showcaseStep === 'expanding' && (
                <motion.div
                  key="expanding"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-blue-200/80 shadow-xs text-xs font-mono text-neutral-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span>Parsing semantic constraints across 2,400+ databases...</span>
                  </div>
                </motion.div>
              )}

              {(showcaseStep === 'understanding' || showcaseStep === 'results') && (
                <motion.div
                  key="showcase-content"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* STEP 3: "Your Priorities" Staggered Animated Grid */}
                  <div className="bg-white rounded-3xl border border-blue-200/80 p-6 sm:p-7 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
                        Your Priorities Extracted by AI
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        Audited against state gazettes
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {activeScenario.priorities.map((item, pIdx) => {
                        const isVisible = animatingPriorities.includes(pIdx) || showcaseStep === 'results';
                        return (
                          <motion.div
                            key={pIdx}
                            initial={{ opacity: 0, scale: 0.95, y: 8 }}
                            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-3.5 rounded-2xl bg-[#F7FAFF] border border-blue-100"
                          >
                            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-semibold">
                              {item.label}
                            </span>
                            <span className="text-sm font-bold text-[#0B1528] mt-1 block">
                              {item.value}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 4: Full-Width Match Results */}
                  {showcaseStep === 'results' && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between px-1">
                        <h3 className="text-xl font-bold text-[#0B1528] font-display">
                          {activeScenario.matches.length} colleges match your search
                        </h3>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                          100% Unbiased Placement Verification
                        </span>
                      </div>

                      {/* Large Horizontal Full-Width Result Rows */}
                      <div className="space-y-4">
                        {activeScenario.matches.map((college, idx) => (
                          <motion.div
                            key={college.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            className="bg-white rounded-3xl border border-neutral-200/90 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                          >
                            {/* Left: Name, Location, Degree */}
                            <div className="max-w-xl">
                              <div className="text-xs font-semibold text-neutral-500 mb-1">
                                {college.city} · {college.state}
                              </div>
                              <h4 className="text-xl sm:text-2xl font-bold text-[#0B1528]">
                                {college.name}
                              </h4>
                              <p className="text-xs font-medium text-neutral-600 mt-1">
                                {college.degree}
                              </p>

                              {/* Why it matches */}
                              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
                                <span className="font-bold text-[#0B1528] text-[11px] font-mono uppercase tracking-wider">
                                  Why it matches:
                                </span>
                                {college.reasons.map((r, rIdx) => (
                                  <span
                                    key={rIdx}
                                    className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#2563EB] font-medium border border-blue-100"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Middle & Right: Outcomes & Actions */}
                            <div className="flex flex-wrap items-center gap-6 sm:gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-100 shrink-0">
                              <div className="text-left">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                                  Annual Tuition
                                </span>
                                <span className="text-base font-bold text-[#0B1528] block">
                                  {college.tuition}
                                </span>
                              </div>

                              <div className="text-left">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                                  Median CTC
                                </span>
                                <span className="text-base font-bold text-[#0B1528] block">
                                  {college.median}
                                </span>
                              </div>

                              <div className="text-left">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                                  Placement
                                </span>
                                <span className="text-base font-bold text-emerald-700 block">
                                  {college.placement}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Link
                                  href={`/colleges/${college.id}`}
                                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0B1528] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                                >
                                  <span>View College</span>
                                  <ChevronRight size={13} />
                                </Link>
                                <Link
                                  href="/compare"
                                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 text-neutral-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                                >
                                  Compare
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── 05. EXPLORE BY SPECIALIZATION: ELECTRIC INTERACTIVE CARDS BY REACT BITS (RULES 14 & 15) ─── */}
      <section className="py-24 bg-white border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
              Engineering Disciplines
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1528] font-display">
              Explore by Specialization
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              Compare median career trajectories and college selectivity across major disciplines.
            </p>
          </div>

          {/* 4 React Bits Electric Cards with Conic Gradient Borders & Abstract Tech Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIZATIONS.map((spec) => (
              <motion.div
                key={spec.id}
                whileHover={prefersReduced ? {} : { y: -5 }}
                transition={{ duration: 0.2 }}
                className="relative p-[1.5px] rounded-3xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(11,21,40,0.06)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.18)] transition-all"
                onClick={() => router.push(`/colleges?q=${encodeURIComponent(spec.title)}`)}
              >
                {/* React Bits Electric Conic Glow Border Layer */}
                <div
                  className="absolute inset-[-150%] animate-spin-slow opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  style={{ background: spec.conicGradient }}
                />

                {/* Inner Card Container */}
                <div className="relative z-10 rounded-[22px] overflow-hidden h-84 flex flex-col justify-between p-6 bg-[#0B1528]">
                  {/* Abstract Technical Background Image */}
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/80 to-[#0B1528]/35 z-10" />

                  {/* Top: Count & Nested Haptic Arrow */}
                  <div className="relative z-20 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      {spec.collegesCount}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* Bottom: Typography & Metrics */}
                  <div className="relative z-20 text-white">
                    <h3 className="text-xl font-bold tracking-tight leading-snug group-hover:text-blue-200 group-hover:translate-x-1 transition-all">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {spec.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-white/50 uppercase block font-semibold font-mono">Median CTC</span>
                        <span className="font-bold text-white text-sm font-mono">{spec.medianPackage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-white/50 uppercase block font-semibold font-mono">Placement</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">{spec.placementRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 06. STUDENT PERSPECTIVES: 1 LARGE FEATURED + 2 SUPPORTING ─── */}
      <section className="py-20 bg-[#FAFAF8] border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Student Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1528] font-display">
                What Students Actually Say
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Verified feedback on academics, campus culture, hostels, and placements.
              </p>
            </div>
            <Link
              href="/reviews"
              className="text-xs text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
            >
              Browse all 48,000+ reviews <ArrowRight size={13} />
            </Link>
          </div>

          {/* Testimonials: 1 Large Featured + 2 Supporting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Featured Testimonial Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#F59E0B]" />
                  ))}
                  <span className="text-xs font-bold text-neutral-700 ml-2 font-mono">5.0 / 5.0</span>
                </div>

                <blockquote className="text-lg sm:text-xl font-medium text-[#0B1528] leading-relaxed">
                  &ldquo;The peer coding culture in COEP is student-run and relentless. Seniors actively mentor juniors on systems engineering and open source. Faculty won&apos;t spoon-feed you, but if you have drive, the placement outcomes rival top IITs.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-base text-[#0B1528]">Aarav Deshmukh</div>
                  <div className="text-xs text-neutral-500">B.Tech Computer Science · COEP Technological University</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200">
                  Verified Student
                </span>
              </div>
            </div>

            {/* 2 Supporting Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs">
                <blockquote className="text-sm font-medium text-neutral-800 leading-relaxed">
                  &ldquo;VJTI has the unmatched Mumbai location advantage. Tech and finance recruiters from BKC and Powai come directly for campus hackathons. Hostel capacity is limited, so factor in local living expenses.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0B1528] block">Pooja Nair</span>
                    <span className="text-neutral-500 text-[11px]">VJTI Mumbai · Electronics</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Alumni &apos;24</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs">
                <blockquote className="text-sm font-medium text-neutral-800 leading-relaxed">
                  &ldquo;The zero-attendance policy at BITS Pilani genuinely gives you autonomy. You can spend 40 hours a week building a startup or doing lab research with faculty without administrative friction.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0B1528] block">Rohan Verma</span>
                    <span className="text-neutral-500 text-[11px]">BITS Pilani · MSc Physics + CS</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Verified ID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 07. ADMISSION MILESTONES: CONNECTED TIMELINE STRIP ─── */}
      <section className="py-16 bg-[#F4F8FE] border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Counselling Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1528] font-display">
                Upcoming Admission Milestones
              </h2>
            </div>
            <Link
              href="/admissions"
              className="text-xs text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
            >
              Full Calendar <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMISSION_MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EEF4FE] px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <h3 className="text-sm font-bold text-[#0B1528] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono">Central Board</span>
                  <Link
                    href="/admissions"
                    className="text-[#2563EB] font-semibold hover:underline text-xs"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 08. FINAL CTA: VISUALLY POWERFUL (DEEP NAVY, CONNECTED STEPS) (RULES 18 & 19) ─── */}
      <section className="py-24 bg-[#0B1528] text-white relative overflow-hidden">
        {/* React Bits Subtle Blue Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[340px] bg-[#2563EB]/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-display">
            Choose with confidence.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg mx-auto">
            From discovering options to understanding verified student outcomes.
          </p>

          {/* Interactive Visual Flow: SEARCH → COMPARE → UNDERSTAND → DECIDE */}
          <div className="mt-10 mb-10 max-w-2xl mx-auto hidden sm:flex items-center justify-between px-6 py-3.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">SEARCH</span>
            <span className="text-blue-400/40">→</span>
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">COMPARE</span>
            <span className="text-blue-400/40">→</span>
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">UNDERSTAND</span>
            <span className="text-blue-400/40">→</span>
            <span className="text-xs font-mono font-bold text-white bg-[#2563EB] px-3.5 py-1.5 rounded-lg tracking-wider shadow-md shadow-blue-500/20">
              DECIDE
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ai-college-finder"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-2xl transition-all shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.6)] cursor-pointer active:scale-[0.98]"
            >
              <span>Start your college search</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={13} className="text-white" />
              </span>
            </Link>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-2xl border border-white/15 transition-colors"
            >
              <span>Explore All Colleges</span>
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400 font-medium">
            No sign-up required to explore.
          </p>
          <p className="mt-1 text-xs text-slate-500 font-normal">
            Search colleges · Compare options · Save your shortlist
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
