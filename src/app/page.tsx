'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Bookmark,
  SlidersHorizontal,
  Star,
  Check,
  Sparkles,
  Zap,
  TrendingUp,
  MessageSquare,
  Scale,
  Brain,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COLLEGES } from '@/lib/mockData';

// Rotating queries for the hero AI search engine
const HERO_QUERIES = [
  'B.Tech colleges in Maharashtra under ₹8L with strong placements and campus life',
  'Top MBA colleges with high median ROI and finance specialization',
  'Premier engineering institutes with median CTC > ₹18L and research culture',
  'Government colleges in Pune accepting MHT-CET 95+ percentile',
  'Affordable colleges with verified hostel and 90%+ placement records',
];

// Specialization tracks with React Bits Electric Card styling & relevant imagery
const SPECIALIZATIONS = [
  {
    id: 'cs',
    title: 'Computer Science & AI',
    description: 'System software, distributed cloud systems, and applied machine learning.',
    medianPackage: '₹9.4L',
    placementRate: '91%',
    collegesCount: '420 Colleges',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg, transparent 0 240deg, #3B82F6 300deg, #60A5FA 360deg)',
    accent: '#3B82F6',
  },
  {
    id: 'vlsi',
    title: 'Electronics & VLSI',
    description: 'Semiconductor design, embedded systems, microcontrollers and IoT.',
    medianPackage: '₹8.1L',
    placementRate: '86%',
    collegesCount: '310 Colleges',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg, transparent 0 240deg, #6366F1 300deg, #818CF8 360deg)',
    accent: '#6366F1',
  },
  {
    id: 'mech',
    title: 'Mechanical & Robotics',
    description: 'Industrial automation, robotics, thermal dynamics and electric vehicles.',
    medianPackage: '₹6.8L',
    placementRate: '79%',
    collegesCount: '280 Colleges',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg, transparent 0 240deg, #06B6D4 300deg, #22D3EE 360deg)',
    accent: '#06B6D4',
  },
  {
    id: 'mgmt',
    title: 'Management & Finance',
    description: 'Financial analysis, corporate strategy, product operations and consulting.',
    medianPackage: '₹11.2L',
    placementRate: '88%',
    collegesCount: '240 Colleges',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    conicGradient: 'conic-gradient(from 0deg, transparent 0 240deg, #F5B942 300deg, #FCD34D 360deg)',
    accent: '#F5B942',
  },
];

// AI Intelligence Features from College Portal FRD
const AI_SUITE_FEATURES = [
  {
    id: 'search',
    title: 'Conversational Multi-Variable AI Search',
    badge: 'FRD Core AI',
    icon: Search,
    shortDesc: 'Interprets complex natural language queries with budgets, percentiles, and campus priorities in real-time.',
    demoOutput: {
      headline: 'Parsed 4 Key Constraints from Natural Prompt',
      tags: ['Degree: B.Tech CSE', 'State: Maharashtra', 'Budget Ceiling: ≤ ₹8.0L', 'Placement Priority: Top Decile'],
      insight: 'Cross-audited against 420 Maharashtra engineering faculties. Mapped to 2024 State Fee Regulatory Authority gazettes.',
    },
  },
  {
    id: 'placement',
    title: 'AI Placement Intelligence',
    badge: 'Outcome Verification',
    icon: TrendingUp,
    shortDesc: 'Audits median salary claims vs outlier international packages. Tracks 3-year recruitment stability and branch realities.',
    demoOutput: {
      headline: 'Salary Truth Audit: Median vs Outlier Detection',
      tags: ['True Median: ₹8.4L CTC', '90th Percentile: ₹14.2L', 'Outlier Flag: 1 International ₹1.2Cr Package Filtered'],
      insight: 'Separates verified institutional median filings from PR brochure marketing claims with 98.4% accuracy.',
    },
  },
  {
    id: 'review',
    title: 'AI Review Sentiment Intelligence',
    badge: 'Authentic Sentiment',
    icon: MessageSquare,
    shortDesc: 'Synthesizes 48,000+ unstructured student comments into verified positive sentiment and transparent cautions.',
    demoOutput: {
      headline: 'Sentiment Analysis Across 1,284 Enrolled Student Reviews',
      tags: ['Faculty Pedagogy: 84% Positive', 'Campus Culture: 81% Positive', 'Hostel Infrastructure: 61% Mixed'],
      insight: 'Preserves uncensored student warnings regarding hostel maintenance alongside praise for coding culture.',
    },
  },
  {
    id: 'fit',
    title: 'Personalized College Fit Score',
    badge: 'Personalized Match',
    icon: Brain,
    shortDesc: 'Calculates an individualized 0–100 compatibility score matching student percentile, budget, and career goals.',
    demoOutput: {
      headline: 'Multi-Dimensional Compatibility Score: 94 / 100',
      tags: ['Academics Alignment: 96%', 'Financial ROI: 95%', 'Hostel & Location: 88%', 'Admission Chance: High'],
      insight: 'Weighted formula evaluates institutional strengths directly against your declared academic priorities.',
    },
  },
  {
    id: 'compare',
    title: 'AI Trade-Off Comparison Assistant',
    badge: 'Decision Intelligence',
    icon: Scale,
    shortDesc: 'Side-by-side trade-off matrix detailing why College A is better for ROI while College B offers higher academic prestige.',
    demoOutput: {
      headline: 'COEP Technological University vs VJTI Mumbai Trade-Off Matrix',
      tags: ['Tuition Winner: VJTI (₹1.1L/yr)', 'Placement Winner: VJTI (₹9.2L median)', 'Campus Infrastructure: COEP (170-acre legacy)'],
      insight: 'Synthesizes qualitative campus life with quantitative fee-to-salary ratios for clear decision making.',
    },
  },
];

// Admission timeline milestones
const MILESTONES = [
  { date: '18 SEP', title: 'JoSAA Round 5', desc: 'Seat Acceptance Window' },
  { date: '02 OCT', title: 'MHT-CET CAP', desc: 'Option Form Submission' },
  { date: '15 OCT', title: 'BITSAT Final', desc: 'Iteration Round Allotment' },
  { date: '26 OCT', title: 'NMAT Window', desc: 'MBA Registration Closes' },
];

export default function HomePage() {
  const router = useRouter();

  // Hero search engine typewriter state
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Big Broad Search Box state (Tell us what you want section)
  const [broadSearchQuery, setBroadSearchQuery] = useState('B.Tech colleges in Maharashtra under ₹8L with strong placements');
  const [activeAIFeatureIndex, setActiveAIFeatureIndex] = useState(0);

  // Rankings state
  const [selectedSort, setSelectedSort] = useState<'realityScore' | 'medianPackage' | 'placementPercent'>('realityScore');
  const [savedIds, setSavedIds] = useState<string[]>(['coep']);

  const activeAIFeature = AI_SUITE_FEATURES[activeAIFeatureIndex];

  // Typewriter effect for Hero AI Search Engine
  useEffect(() => {
    const fullText = HERO_QUERIES[typewriterIndex];
    let charIndex = 0;
    setDisplayedPlaceholder('');
    setIsTyping(true);

    const typeTimer = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedPlaceholder(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setIsTyping(false);
        setTimeout(() => {
          setTypewriterIndex((prev) => (prev + 1) % HERO_QUERIES.length);
        }, 3400);
      }
    }, 40);

    return () => clearInterval(typeTimer);
  }, [typewriterIndex]);

  function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = heroSearchInput.trim() || displayedPlaceholder;
    if (query) {
      router.push(`/ai-college-finder?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/ai-college-finder');
    }
  }

  function handleBroadSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (broadSearchQuery.trim()) {
      router.push(`/ai-college-finder?q=${encodeURIComponent(broadSearchQuery.trim())}`);
    } else {
      router.push('/ai-college-finder');
    }
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
    <div className="min-h-screen bg-[#FAFAF8] text-[#101828] font-sans antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB]">
      <Navbar />

      {/* ─── 01. HERO: PREMIUM REACT BITS AURORA BACKGROUND + EXPANSIVE AI SEARCH ENGINE ─── */}
      <section className="relative pt-16 sm:pt-24 pb-24 overflow-hidden bg-[#FAFAF8] border-b border-neutral-200/70">
        {/* React Bits Aurora Mesh Blur & Ambient Orbs Background (Low intensity, high-end depth) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ambient colored orbs */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#2563EB]/12 via-[#38BDF8]/8 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-[-10%] w-[550px] h-[550px] bg-[#6366F1]/8 rounded-full blur-3xl" />
          <div className="absolute top-48 left-[-10%] w-[500px] h-[500px] bg-[#0284C7]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-[#F5B942]/6 rounded-full blur-3xl" />

          {/* Flowing SVG neural wave curves */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
          >
            <path
              d="M0,200 C320,350 420,100 720,220 C1020,340 1120,180 1440,250 L1440,800 L0,800 Z"
              fill="none"
              stroke="#0B1F3A"
              strokeWidth="1.5"
            />
            <path
              d="M0,320 C360,180 520,380 880,240 C1240,100 1340,300 1440,200"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1"
            />
          </svg>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#0B1F3A_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          {/* Top subtle indicator */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/70 shadow-[0_2px_10px_rgba(37,99,235,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-[#0B1F3A]">
              CollegeIQ Intelligence Platform · 2,400+ Verified Colleges
            </span>
          </motion.div>

          {/* Headline with Strong Display Typography (Outfit font-family) */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-[#0B1F3A] leading-[0.98]"
          >
            Find the college <br />
            that fits <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#0284C7] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(37,99,235,0.2)]">your future</span>.
          </motion.h1>

          {/* Short Supporting Sentence */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 text-base sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            India&apos;s most intelligent college discovery platform. Natural language matching, audited placement records, and transparent student outcomes.
          </motion.p>

          {/* LARGE EXPANSIVE AI SEARCH ENGINE COMMAND CENTER (850px Wide Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(11,31,58,0.12)] p-4 sm:p-5 text-left transition-all focus-within:border-blue-400 focus-within:shadow-[0_25px_70px_-15px_rgba(37,99,235,0.18)]">
              {/* Command Center Status Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono font-semibold text-[#0B1F3A]">
                    CollegeIQ Intelligence Engine v2.4
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-neutral-400">
                  <span>Natural Language Parser</span>
                  <span>·</span>
                  <span>48K+ Audited Reviews</span>
                </div>
              </div>

              {/* Main Search Input Form */}
              <form onSubmit={handleHeroSubmit} className="relative flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1 flex items-center">
                  <div className="pl-2 pr-3 text-neutral-400">
                    <Search size={22} className="text-[#2563EB]" strokeWidth={2.2} />
                  </div>
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder={displayedPlaceholder || 'Ask CollegeIQ anything (e.g. B.Tech under ₹8L with strong placements)...'}
                    className="w-full py-3 px-1 bg-transparent text-[#101828] text-base sm:text-lg font-medium placeholder-neutral-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-2xl shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                >
                  <span>Ask CollegeIQ</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Bottom Quick-Prompt Tags inside Search Engine */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-neutral-500">
                  <span className="text-neutral-400 font-medium">Quick Prompts:</span>
                  <button
                    type="button"
                    onClick={() => setHeroSearchInput('B.Tech CSE in Maharashtra under ₹8L with hostel')}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 font-medium transition-colors"
                  >
                    B.Tech CSE in Maharashtra
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroSearchInput('Premier engineering colleges with median CTC > ₹18L')}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 font-medium transition-colors"
                  >
                    Median CTC &gt; ₹18L
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroSearchInput('Government colleges in Pune accepting MHT-CET')}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 font-medium transition-colors hidden sm:inline"
                  >
                    Government CET Pune
                  </button>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 hidden lg:inline">
                  Real-time Audited Data
                </span>
              </div>
            </div>

            {/* Simple Text Category Links Below Search (No pills) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
              <span className="text-neutral-400">Search by:</span>
              <button
                type="button"
                onClick={() => setHeroSearchInput('B.Tech CSE colleges with strong placement')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Course
              </button>
              <span className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => setHeroSearchInput('Affordable colleges under ₹8L total tuition')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Budget
              </button>
              <span className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => setHeroSearchInput('Colleges in Maharashtra & Mumbai region')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Location
              </button>
              <span className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => setHeroSearchInput('Colleges with highest median placement records')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Placements
              </button>
              <span className="text-neutral-300">·</span>
              <button
                type="button"
                onClick={() => setHeroSearchInput('Colleges with top-tier campus life and hostels')}
                className="hover:text-[#2563EB] transition-colors"
              >
                Campus Life
              </button>
            </div>
          </motion.div>

          {/* Under-Search Product Capabilities Strip (Clean typography, no cards, no pills) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-14 pt-8 border-t border-neutral-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-neutral-700"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Search naturally</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Compare colleges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Understand rankings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Read student reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02. TRUST METRICS STRIP (WHITE BACKGROUND, CLEAN REFINED STRIP) ─── */}
      <section className="py-12 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                2,400+
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#2563EB] mt-1">
                Colleges Explored
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                NIRF & state regulatory records.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                48,000+
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#2563EB] mt-1">
                Student Perspectives
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Authentic verified feedback.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                100%
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#2563EB] mt-1">
                Zero Sponsored Ranks
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                No paid placement promotions.
              </p>
            </div>

            <div className="border-l-2 border-[#2563EB] pl-4">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                ₹0 Hidden
              </p>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#2563EB] mt-1">
                True Cost Accounting
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Hostel and fee breakdowns upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03. TOP COLLEGES (WHITE BACKGROUND, CLEAN NUMBERED RANKINGS) ─── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
                Institutional Rankings
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] mt-1">
                Top Colleges in India
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Ranked by verified placements, true fee value, and student outcomes.
              </p>
            </div>

            {/* Sort Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-neutral-400 mr-1 flex items-center gap-1">
                <SlidersHorizontal size={12} /> Sort:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSort('realityScore')}
                className={`text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all ${
                  selectedSort === 'realityScore'
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F7FAFF] border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Overall Score
              </button>
              <button
                type="button"
                onClick={() => setSelectedSort('medianPackage')}
                className={`text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all ${
                  selectedSort === 'medianPackage'
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F7FAFF] border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Median Package
              </button>
              <button
                type="button"
                onClick={() => setSelectedSort('placementPercent')}
                className={`text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all ${
                  selectedSort === 'placementPercent'
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F7FAFF] border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Placement Rate
              </button>
            </div>
          </div>

          {/* Ranking Rows with Prominent Numbers & Fast Hover Interaction */}
          <div className="divide-y divide-neutral-200/80">
            {sortedColleges.slice(0, 6).map((college, index) => {
              const isSaved = savedIds.includes(college.id);
              const rankFormatted = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={college.id}
                  whileHover={{ x: 3, backgroundColor: 'rgba(238, 245, 255, 0.45)' }}
                  transition={{ duration: 0.15 }}
                  className="group py-5 px-3 sm:px-4 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all cursor-pointer"
                  onClick={() => router.push(`/colleges/${college.id}`)}
                >
                  {/* Left: Number + College Identification */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]/25 group-hover:text-[#2563EB] transition-colors w-10 shrink-0">
                      {rankFormatted}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-500">
                          {college.city}, {college.state}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-xs font-medium text-neutral-600">
                          {college.type}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mt-0.5 group-hover:text-[#2563EB] transition-colors truncate">
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
                      <span className="text-sm sm:text-base font-bold text-[#0B1F3A] block">
                        ₹{college.totalFees}L / yr
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block font-semibold">
                        Median CTC
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#0B1F3A] block">
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
                      <span className="text-base sm:text-lg font-extrabold text-[#0B1F3A] block">
                        {college.realityScore}<span className="text-xs font-normal text-neutral-400">/100</span>
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
                          className={isSaved ? 'fill-[#0B1F3A] text-[#0B1F3A]' : ''}
                        />
                      </button>

                      <Link
                        href={`/colleges/${college.id}`}
                        className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-[#0B1F3A] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors"
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

          <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between">
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

      {/* ─── 04. "TELL US WHAT YOU WANT" (BIG BROAD SEARCH BOX + COLLEGE PORTAL FRD AI SUITE) ─── */}
      <section className="py-24 bg-gradient-to-b from-[#EEF5FF] via-[#F7FAFF] to-[#FAFAF8] border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB] block mb-1">
              AI Decision Layer
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A]">
              Tell us what you want.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal">
              Describe your ideal college in your own words. Our AI models interpret your requirements across 6 dimensions.
            </p>
          </div>

          {/* BIG BROAD SEARCH BOX (Generous Width, Command Center Presence) */}
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleBroadSearchSubmit}
              className="bg-white rounded-3xl border border-blue-200/90 shadow-[0_12px_45px_rgba(37,99,235,0.08)] p-3 sm:p-4 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1 flex items-center">
                  <div className="pl-3 pr-3 text-neutral-400">
                    <Brain size={22} className="text-[#2563EB]" />
                  </div>
                  <input
                    type="text"
                    value={broadSearchQuery}
                    onChange={(e) => setBroadSearchQuery(e.target.value)}
                    placeholder="Enter degree, location, budget ceiling, or specific priorities (e.g. B.Tech under ₹8L)..."
                    className="w-full py-3.5 px-2 bg-transparent text-[#101828] text-base sm:text-lg font-medium placeholder-neutral-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-2xl shadow-[0_4px_16px_rgba(37,99,235,0.25)] transition-all cursor-pointer"
                >
                  <span>Analyze with AI</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Quick Prompt Scenario Buttons */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-400 font-medium">Try scenarios:</span>
                {[
                  'B.Tech in Maharashtra under ₹8L',
                  'Top National Placement ROI (>₹18L)',
                  'Government CET Colleges in Pune',
                  'Affordable MBA with Finance focus',
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setBroadSearchQuery(s)}
                    className="px-3 py-1 rounded-lg bg-neutral-100 hover:bg-blue-50 hover:text-[#2563EB] text-neutral-700 font-medium transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* AI FEATURES SUITE FROM COLLEGE PORTAL FRD PROPOSAL */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                  AI Intelligence Engine Features
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                  Core AI capabilities proposed in the CollegeIQ Functional Requirements Document.
                </p>
              </div>
              <span className="text-xs font-mono text-[#2563EB] bg-[#EEF5FF] px-2.5 py-1 rounded-full font-semibold hidden sm:inline">
                Interactive Showcase
              </span>
            </div>

            {/* AI Feature Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
              {AI_SUITE_FEATURES.map((feat, idx) => {
                const IconComponent = feat.icon;
                const isActive = activeAIFeatureIndex === idx;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setActiveAIFeatureIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-md'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent
                        size={18}
                        className={isActive ? 'text-blue-300' : 'text-[#2563EB]'}
                      />
                      <span className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/15 text-blue-200' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{feat.title}</div>
                      <div className={`text-[10px] mt-1 ${isActive ? 'text-slate-300' : 'text-neutral-400'}`}>
                        {feat.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Feature Display Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAIFeature.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2563EB] bg-[#EEF5FF] px-2.5 py-0.5 rounded-full uppercase">
                        {activeAIFeature.badge}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">Live Simulation</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mt-2">
                      {activeAIFeature.title}
                    </h4>
                    <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                      {activeAIFeature.shortDesc}
                    </p>
                  </div>

                  <Link
                    href="/ai-college-finder"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    <span>Launch AI Feature</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Simulated AI Output Display */}
                <div className="mt-6">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Model Reasoning & Extracted Intelligence:
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7FAFF] border border-blue-100">
                    <div className="text-sm font-bold text-[#0B1F3A] mb-3">
                      {activeAIFeature.demoOutput.headline}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {activeAIFeature.demoOutput.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-blue-200/80 text-[#2563EB] shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-neutral-600 font-medium">
                      <span className="font-bold text-[#0B1F3A]">Data Pipeline: </span>
                      {activeAIFeature.demoOutput.insight}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── 05. SPECIALIZATIONS: ELECTRIC CARDS BY REACT BITS WITH RELEVANT IMAGES ─── */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
              Program Specializations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3A] mt-1 font-display">
              Explore by Specialization
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              Compare median career trajectories and college selectivity across major disciplines.
            </p>
          </div>

          {/* 4 React Bits Electric Cards with Animated Conic Gradient Borders & Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIZATIONS.map((spec) => (
              <motion.div
                key={spec.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="relative p-[1.5px] rounded-3xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(11,31,58,0.06)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all"
                onClick={() => router.push(`/colleges?q=${encodeURIComponent(spec.title)}`)}
              >
                {/* REACT BITS ELECTRIC BORDER: Rotating Conic Gradient Layer */}
                <div
                  className="absolute inset-[-150%] animate-spin-slow opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  style={{ background: spec.conicGradient }}
                />

                {/* Inner Card Container */}
                <div className="relative z-10 rounded-[22px] overflow-hidden h-84 flex flex-col justify-between p-6 bg-[#0B1F3A]">
                  {/* Relevant Background Image with Dark Gradient Overlay */}
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/75 to-[#0B1F3A]/25 z-10" />

                  {/* Top Badge & Electric Arrow */}
                  <div className="relative z-20 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      {spec.collegesCount}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* Bottom Content & Metrics */}
                  <div className="relative z-20 text-white">
                    <h3 className="text-xl font-bold tracking-tight leading-snug group-hover:text-blue-200 group-hover:translate-x-1 transition-all">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {spec.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-white/50 uppercase block font-semibold">Median CTC</span>
                        <span className="font-bold text-white text-sm font-mono">{spec.medianPackage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-white/50 uppercase block font-semibold">Placement</span>
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

      {/* ─── 06. STUDENT REVIEWS (WARM WHITE #FAFAF8, 1 LARGE FEATURED + 2 SUPPORTING) ─── */}
      <section className="py-20 bg-[#FAFAF8] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                Student Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A] mt-1">
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

          {/* Testimonial Cards: 1 Large Featured + 2 Supporting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Featured Testimonial Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F5B942] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#F5B942]" />
                  ))}
                  <span className="text-xs font-bold text-neutral-700 ml-2 font-mono">5.0 / 5.0</span>
                </div>

                <blockquote className="text-lg sm:text-xl font-medium text-[#0B1F3A] leading-relaxed">
                  &ldquo;The peer coding culture in COEP is student-run and relentless. Seniors actively mentor juniors on systems engineering and open source. Faculty won&apos;t spoon-feed you, but if you have drive, the placement outcomes rival top IITs.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-base text-[#0B1F3A]">Aarav Deshmukh</div>
                  <div className="text-xs text-neutral-500">B.Tech Computer Science · COEP Technological University</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200">
                  Verified Student
                </span>
              </div>
            </div>

            {/* 2 Supporting Testimonial Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs">
                <blockquote className="text-sm font-medium text-neutral-800 leading-relaxed">
                  &ldquo;VJTI has the unmatched Mumbai location advantage. Tech and finance recruiters from BKC and Powai come directly for campus hackathons. Hostel capacity is limited, so factor in local living expenses.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">Pooja Nair</span>
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
                    <span className="font-bold text-[#0B1F3A] block">Rohan Verma</span>
                    <span className="text-neutral-500 text-[11px]">BITS Pilani · MSc Physics + CS</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Verified ID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 07. ADMISSION MILESTONES (VERY LIGHT BLUE, CONNECTED TIMELINE) ─── */}
      <section className="py-16 bg-[#F7FAFF] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
                Central Counselling Calendar
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A] mt-1">
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

          {/* Clean Connected Timeline Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EEF5FF] px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <h3 className="text-sm font-bold text-[#0B1F3A] mt-1">
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

      {/* ─── 08. FINAL CTA: VISUALLY POWERFUL (DEEP NAVY, CONNECTED STEPS) ─── */}
      <section className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
        {/* Subtle electric blue glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-display">
            Choose with confidence.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg mx-auto">
            From discovering options to understanding verified student outcomes.
          </p>

          {/* Interactive Visual Flow: SEARCH → COMPARE → UNDERSTAND → DECIDE */}
          <div className="mt-10 mb-10 max-w-2xl mx-auto hidden sm:flex items-center justify-between px-6 py-3.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">SEARCH</span>
            <span className="text-blue-400/50">→</span>
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">COMPARE</span>
            <span className="text-blue-400/50">→</span>
            <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">UNDERSTAND</span>
            <span className="text-blue-400/50">→</span>
            <span className="text-xs font-mono font-bold text-white bg-[#2563EB] px-3 py-1 rounded-lg tracking-wider">
              DECIDE
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ai-college-finder"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer"
            >
              <span>Start Your College Search</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/20 transition-colors"
            >
              <span>Explore All Colleges</span>
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400 font-medium">
            No sign-up required to explore · Free for students forever
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
