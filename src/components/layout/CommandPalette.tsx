'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Sparkles, GraduationCap, BookOpen, BarChart2,
  GitCompare, Star, Calculator, Bookmark, ArrowRight,
  Command, X, Compass, ExternalLink
} from 'lucide-react';
import { COLLEGES } from '@/lib/mockData';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Quick navigation destinations
  const QUICK_TOOLS = [
    { title: 'AI College Finder', desc: 'Natural language search with preference extraction', href: '/ai-college-finder', icon: Sparkles, color: 'text-violet-600 bg-violet-50' },
    { title: 'Compare Colleges', desc: 'Side-by-side comparison matrix with AI Assistant', href: '/compare', icon: GitCompare, color: 'text-accent bg-blue-50' },
    { title: 'ROI Calculator', desc: 'Compute salary-to-fees payback period', href: '/roi-calculator', icon: Calculator, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Admission Probability', desc: 'Predict entrance cutoffs & admission chances', href: '/admission-probability', icon: Compass, color: 'text-amber-600 bg-amber-50' },
    { title: 'Entrance Exams Calendar', desc: 'JEE Main, Advanced, MHT-CET, BITSAT dates & patterns', href: '/exams', icon: BookOpen, color: 'text-rose-600 bg-rose-50' },
    { title: 'Admissions & Counselling Schedule', desc: 'JoSAA rounds, MHT-CET CAP timelines & seat matrices', href: '/admissions', icon: Bookmark, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Academic Programs & Degrees', desc: 'Directory of B.Tech, MBA, M.Tech courses', href: '/courses', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Verified Student Reviews', desc: 'AI Review Intelligence & student feedback', href: '/reviews', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
    { title: 'College Rankings 2026', desc: 'NIRF, Reality Score, and Placement ranks', href: '/rankings', icon: BarChart2, color: 'text-rose-600 bg-rose-50' },
    { title: 'Student Dashboard', desc: 'Personalized student recommendations & progress', href: '/student/dashboard', icon: GraduationCap, color: 'text-accent bg-blue-50' },
    { title: 'College Admin Portal', desc: 'Manage institutional profile, analytics & leads', href: '/college/dashboard', icon: ExternalLink, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Super Admin Portal', desc: 'Platform verification queue, moderation & ranking weights', href: '/admin/dashboard', icon: ExternalLink, color: 'text-violet-600 bg-violet-50' },
  ];

  // Match items based on query
  const matchedColleges = query.trim()
    ? COLLEGES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.shortName.toLowerCase().includes(query.toLowerCase()) ||
        c.city.toLowerCase().includes(query.toLowerCase()) ||
        c.state.toLowerCase().includes(query.toLowerCase())
      ).map(c => ({
        title: c.name,
        desc: `${c.city}, ${c.state} • Reality Score ${c.realityScore}/100 • ₹${c.totalFees}L/yr`,
        href: `/colleges/${c.id}`,
        icon: GraduationCap,
        logo: c.logo,
        badge: `${c.realityScore} Score`,
      }))
    : [];

  const matchedTools = QUICK_TOOLS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.desc.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = query.trim()
    ? [...matchedColleges, ...matchedTools]
    : QUICK_TOOLS;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
        else {
          // Open triggered from parent or window
        }
      }
      if (!open) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (allItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % (allItems.length || 1));
      } else if (e.key === 'Enter' && allItems[selectedIndex]) {
        e.preventDefault();
        navigate(allItems[selectedIndex].href);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, allItems]);

  function navigate(href: string) {
    onClose();
    setQuery('');
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
              <Search size={18} className="text-accent shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search colleges, degrees, tools, cutoffs..."
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full text-sm bg-transparent placeholder-slate-400 focus:outline-none text-slate-800"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 text-xs">
                  Clear
                </button>
              )}
              <kbd className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {allItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No matching colleges or tools found for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                allItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                        isSelected
                          ? 'bg-blue-50/80 text-accent'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {'logo' in item ? (
                          <span className="text-2xl p-1.5 bg-white border border-slate-200 rounded-lg shrink-0">
                            {item.logo}
                          </span>
                        ) : (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${'color' in item ? item.color : 'bg-slate-100 text-slate-600'}`}>
                            <item.icon size={16} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-xs truncate text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      {'badge' in item && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full shrink-0">
                          {item.badge}
                        </span>
                      )}

                      <ArrowRight size={14} className={`shrink-0 ${isSelected ? 'text-accent' : 'text-slate-300'}`} />
                    </button>
                  );
                })
              )}
            </div>

            {/* Palette Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="px-1 py-0.5 bg-white border rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white border rounded">↓</kbd></span>
                <span>Select <kbd className="px-1 py-0.5 bg-white border rounded">↵</kbd></span>
              </div>
              <span>CollegeIQ Global Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
