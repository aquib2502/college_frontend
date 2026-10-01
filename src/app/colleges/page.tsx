'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, LayoutGrid, List, X, ChevronDown, Filter,
  Sparkles, CheckCircle2, SearchX, RotateCcw, Building2, MapPin
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CollegeCard from '@/components/college/CollegeCard';
import { COLLEGES, searchColleges } from '@/lib/mockData';

const STATES = ['Maharashtra', 'Karnataka', 'Rajasthan', 'Tamil Nadu', 'Delhi', 'West Bengal'];
const TYPES = ['Central', 'State', 'Private'];
const SORT_OPTIONS = [
  { value: 'reality', label: 'Reality Score (High to Low)' },
  { value: 'placement', label: 'Placement % (High to Low)' },
  { value: 'fees-low', label: 'Fees: Low to High' },
  { value: 'fees-high', label: 'Fees: High to Low' },
  { value: 'rating', label: 'Student Rating' },
];

const POPULAR_TAGS = ['Top 10 NIRF', 'Under ₹2L/yr', '90%+ Placements', 'Autonomous', 'Hostel Guaranteed'];

function CollegesContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [sortBy, setSortBy] = useState('reality');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    maxFees: 0,
    minPlacement: 0,
    hasHostel: false,
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const results = searchColleges(query, {
    state: filters.state || undefined,
    type: filters.type || undefined,
    maxFees: filters.maxFees || undefined,
    minPlacement: filters.minPlacement || undefined,
  }).sort((a, b) => {
    if (sortBy === 'reality') return b.realityScore - a.realityScore;
    if (sortBy === 'placement') return b.placementPercent - a.placementPercent;
    if (sortBy === 'fees-low') return a.totalFees - b.totalFees;
    if (sortBy === 'fees-high') return b.totalFees - a.totalFees;
    if (sortBy === 'rating') return b.studentRating - a.studentRating;
    return 0;
  });

  function addFilter(label: string) {
    if (!activeFilters.includes(label)) setActiveFilters(prev => [...prev, label]);
  }
  function removeFilter(label: string) {
    setActiveFilters(prev => prev.filter(f => f !== label));
    if (STATES.includes(label)) setFilters(f => ({ ...f, state: '' }));
    if (TYPES.includes(label)) setFilters(f => ({ ...f, type: '' }));
    if (label.includes('Fees')) setFilters(f => ({ ...f, maxFees: 0 }));
    if (label.includes('placed')) setFilters(f => ({ ...f, minPlacement: 0 }));
    if (label === 'Hostel') setFilters(f => ({ ...f, hasHostel: false }));
  }

  function handleTagClick(tag: string) {
    if (tag === 'Under ₹2L/yr') {
      setFilters(f => ({ ...f, maxFees: 2 }));
      addFilter('Fees ≤ ₹2L/yr');
    } else if (tag === '90%+ Placements') {
      setFilters(f => ({ ...f, minPlacement: 90 }));
      addFilter('90%+ placed');
    } else if (tag === 'Hostel Guaranteed') {
      setFilters(f => ({ ...f, hasHostel: true }));
      addFilter('Hostel');
    } else {
      setQuery(tag);
    }
  }

  function resetAllFilters() {
    setQuery('');
    setFilters({ state: '', type: '', maxFees: 0, minPlacement: 0, hasHostel: false });
    setActiveFilters([]);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Header Banner — Deep Navy with subtle electric blue glow */}
      <div className="relative bg-ink text-white pt-12 pb-14 px-4 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles size={12} className="text-blue-400" />
                Verified Institutional Directory
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">
                Explore Top Colleges & Universities
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Filter by genuine placement statistics, transparent fee structures, verified student reality scores, and NIRF benchmarks.
              </p>
            </div>

            {/* Quick stats pill */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl self-start md:self-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-200">
                <strong className="text-white font-semibold">{COLLEGES.length}</strong> Accredited Campuses Listed
              </span>
            </div>
          </div>

          {/* AI Search & Filter Command Bar */}
          <div className="bg-white p-3 rounded-2xl shadow-xl shadow-blue-950/20 border border-slate-200/80 flex flex-col md:flex-row items-stretch gap-2.5">
            <div className="flex-1 relative flex items-center">
              <Search size={18} className="absolute left-4 text-accent shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by institute name, specialization (e.g. CSE, AI, Robotics), city, or exam..."
                className="w-full pl-11 pr-9 py-3 bg-transparent rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-3 pl-3 pr-8 rounded-xl cursor-pointer outline-none transition-colors"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  showFilters
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Filter size={14} />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <span className="w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-accent shadow-xs' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-accent shadow-xs' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Pill Tags */}
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-300">
            <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Quick Filters:</span>
            {POPULAR_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilters.length > 0 && (
        <div className="bg-white border-b border-slate-200/80 py-3 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Filters:</span>
            {activeFilters.map(f => (
              <button
                key={f}
                onClick={() => removeFilter(f)}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold rounded-full hover:bg-blue-100 transition-colors"
              >
                {f} <X size={12} className="text-accent" />
              </button>
            ))}
            <button
              onClick={resetAllFilters}
              className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 font-semibold transition-colors"
            >
              <RotateCcw size={12} />
              Reset all
            </button>
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          {/* ── FILTER SIDEBAR ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 280 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-[280px] bg-white border border-slate-200/80 rounded-2xl p-5 sticky top-24 shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={16} className="text-accent" />
                      <h3 className="font-display font-bold text-slate-900 text-sm tracking-tight">Refine Discovery</h3>
                    </div>
                    {activeFilters.length > 0 && (
                      <button
                        onClick={resetAllFilters}
                        className="text-[11px] font-semibold text-accent hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Location Filter */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">State / Region</p>
                    <div className="space-y-1.5">
                      {STATES.map(state => (
                        <label key={state} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="state"
                              checked={filters.state === state}
                              onChange={() => { setFilters(f => ({ ...f, state })); addFilter(state); }}
                              className="accent-blue-600"
                            />
                            <span className="text-xs font-medium text-slate-750 group-hover:text-slate-900">{state}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Institution Type */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Ownership Structure</p>
                    <div className="space-y-1.5">
                      {TYPES.map(type => (
                        <label key={type} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
                          <input
                            type="radio"
                            name="type"
                            checked={filters.type === type}
                            onChange={() => { setFilters(f => ({ ...f, type })); addFilter(type); }}
                            className="accent-blue-600"
                          />
                          <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">{type} University</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tuition Slider */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Max Fees / Year</p>
                      <span className="text-xs font-bold text-accent">{filters.maxFees ? `≤ ₹${filters.maxFees}L` : 'Any'}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={filters.maxFees || 10}
                      onChange={e => {
                        const v = parseFloat(e.target.value);
                        setFilters(f => ({ ...f, maxFees: v }));
                        if (v < 10) addFilter(`Fees ≤ ₹${v}L/yr`);
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                      <span>₹0</span>
                      <span>₹5L</span>
                      <span>₹10L+</span>
                    </div>
                  </div>

                  {/* Placement Slider */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Min Placement %</p>
                      <span className="text-xs font-bold text-emerald-600">{filters.minPlacement ? `${filters.minPlacement}%+` : 'Any'}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={filters.minPlacement}
                      onChange={e => {
                        const v = parseInt(e.target.value);
                        setFilters(f => ({ ...f, minPlacement: v }));
                        if (v > 0) addFilter(`${v}%+ placed`);
                      }}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Campus Guarantee</p>
                    <label className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.hasHostel}
                        onChange={e => {
                          setFilters(f => ({ ...f, hasHostel: e.target.checked }));
                          if (e.target.checked) addFilter('Hostel');
                          else removeFilter('Hostel');
                        }}
                        className="accent-blue-600 rounded"
                      />
                      <span className="text-xs font-medium text-slate-700">Hostel Accommodations Verified</span>
                    </label>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── RESULTS ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-medium text-slate-600">
                Showing <strong className="font-extrabold text-ink">{results.length}</strong> matching verified institutions
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl text-center py-20 px-6 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-accent flex items-center justify-center mx-auto mb-4">
                  <SearchX size={28} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-1.5">No colleges match your criteria</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  We couldn't find any verified colleges with your exact search parameters. Try expanding your fee range or clearing active filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl text-xs font-bold shadow-sm hover:bg-blue-900 transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'
              }>
                {results.map((college, i) => (
                  <CollegeCard key={college.id} college={college} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper"><Navbar /></div>}>
      <CollegesContent />
    </Suspense>
  );
}
