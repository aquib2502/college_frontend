'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Bell, BookOpen, GitCompare, Bookmark, TrendingUp,
  ChevronRight, Star, CheckCircle, Edit2, Clock, AlertTriangle,
  BarChart2, Search, MapPin,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { COLLEGES, STUDENT_PROFILE, simulateAIMatch, ADMISSION_UPDATES } from '@/lib/mockData';
import { formatPackage, getScoreColor, getProbabilityLabel } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import CollegeCard from '@/components/college/CollegeCard';
import Footer from '@/components/layout/Footer';

const AI_INSIGHTS = [
  { text: 'COEP Pune\'s placement data has been updated. Your match score improved to 94%.', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
  { text: 'MH-CET CAP Round 3 registration opens in 18 days. Act early.', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  { text: 'Based on your profile, you have a 82% admission chance at VJTI Mumbai.', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export default function StudentDashboardPage() {
  const { savedColleges } = useApp();
  const [activeTab, setActiveTab] = useState<'recommended' | 'saved' | 'compare'>('recommended');

  const savedList = COLLEGES.filter(c => savedColleges.includes(c.id));
  const recommendedColleges = COLLEGES.filter(c => c.state === 'Maharashtra').slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Dashboard Header — Deep Navy with radial electric blue glow */}
      <div className="relative bg-ink text-white pt-10 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-2">
                <Sparkles size={12} className="text-blue-400" />
                Candidate Command Center
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-[-0.03em]">
                {STUDENT_PROFILE.name}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Your college search profile is{' '}
                <span className="text-blue-300 font-bold">{STUDENT_PROFILE.searchProgress}% complete</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/ai-college-finder"
                className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-deep text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Sparkles size={14} className="text-blue-200" />
                Launch AI Finder
              </Link>
              <Link
                href="/student/profile"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-bold transition-colors"
              >
                <Edit2 size={13} />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 max-w-md">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${STUDENT_PROFILE.searchProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Bookmark, label: 'Saved Colleges', value: savedColleges.length, href: '/student/saved', color: 'text-amber-500', bg: 'bg-amber-50' },
            { icon: GitCompare, label: 'In Comparison', value: 3, href: '/compare', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Bell, label: 'Upcoming Deadlines', value: 4, href: '/student/deadlines', color: 'text-red-500', bg: 'bg-red-50' },
            { icon: BookOpen, label: 'Reviews Written', value: 0, href: '#', color: 'text-violet-500', bg: 'bg-violet-50' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* Current Preferences */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 text-sm">Your Current Preferences</h2>
                <button className="text-xs text-accent hover:underline flex items-center gap-1">
                  <Edit2 size={11} /> Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { label: 'Placement', value: 'High Priority' },
                  { label: 'Budget', value: '₹6–8L/yr' },
                  { label: 'Location', value: 'Maharashtra' },
                  { label: 'Course', value: 'B.Tech CSE' },
                  { label: 'Hostel', value: 'Required' },
                  { label: 'Exam', value: 'JEE Main 87%' },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400">{pref.label}:</span>
                    <span className="text-xs font-semibold text-slate-700">{pref.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Your recommendations are influenced by these preferences.
              </p>
            </div>

            {/* College Lists Tab */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="flex border-b border-slate-100">
                {[
                  { key: 'recommended', label: 'Top Matches', icon: Sparkles },
                  { key: 'saved', label: 'Saved', icon: Bookmark },
                  { key: 'compare', label: 'Compare List', icon: GitCompare },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all ${
                      activeTab === tab.key
                        ? 'border-accent text-accent'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <tab.icon size={12} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === 'recommended' && (
                  <div className="space-y-4">
                    {recommendedColleges.map((college, i) => {
                      const match = simulateAIMatch(college.id, STUDENT_PROFILE);
                      return (
                        <Link key={college.id} href={`/colleges/${college.id}`}>
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                              {college.logo}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-slate-800 group-hover:text-accent transition-colors">
                                {college.shortName}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                  <MapPin size={9} /> {college.city}
                                </span>
                                <span className="text-[11px] text-slate-400">·</span>
                                <span className="text-[11px] text-slate-400">{formatPackage(college.medianPackage)} median</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-base font-bold" style={{ color: getScoreColor(match.matchPercent) }}>
                                {match.matchPercent}%
                              </p>
                              <p className="text-[10px] text-slate-400">match</p>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                    <Link href="/ai-college-finder" className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-accent hover:bg-blue-50 rounded-xl transition-colors">
                      Get more recommendations <ChevronRight size={14} />
                    </Link>
                  </div>
                )}

                {activeTab === 'saved' && (
                  <div>
                    {savedList.length === 0 ? (
                      <div className="text-center py-8">
                        <Bookmark size={32} className="text-slate-200 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 mb-3">No saved colleges yet</p>
                        <Link href="/colleges" className="text-sm text-accent font-medium hover:underline">Browse Colleges →</Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {savedList.map((college, i) => {
                          const match = simulateAIMatch(college.id, STUDENT_PROFILE);
                          const prob = getProbabilityLabel(match.admissionProbability);
                          return (
                            <div key={college.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                              <div className="text-xl">{college.logo}</div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-slate-800">{college.shortName}</p>
                                <p className="text-[11px] text-slate-400">₹{college.totalFees}L/yr · {college.placementPercent}% placed</p>
                              </div>
                              <div className="text-right">
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ color: prob.color, background: prob.bg }}>
                                  {prob.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'compare' && (
                  <div className="space-y-3">
                    {COLLEGES.filter(c => ['coep', 'vjti', 'manipal'].includes(c.id)).map(college => (
                      <div key={college.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl">
                        <div className="text-xl">{college.logo}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-800">{college.shortName}</p>
                          <p className="text-[11px] text-slate-400">{college.realityScore} Reality Score</p>
                        </div>
                        <Link href="/compare" className="text-xs text-accent font-medium hover:underline">View →</Link>
                      </div>
                    ))}
                    <Link href="/compare" className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-accent hover:bg-blue-50 rounded-xl transition-colors">
                      Open Full Comparison <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* AI Insights */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-violet-500" />
                AI Insights
              </h3>
              <div className="space-y-3">
                {AI_INSIGHTS.map((insight, i) => (
                  <div key={i} className={`p-3 rounded-xl ${insight.bg} flex items-start gap-2`}>
                    <insight.icon size={14} className={`${insight.color} mt-0.5 shrink-0`} />
                    <p className="text-xs text-slate-700 leading-relaxed">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Deadlines */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Clock size={14} className="text-red-500" />
                  Upcoming Deadlines
                </h3>
                <Link href="/student/deadlines" className="text-xs text-accent hover:underline">All →</Link>
              </div>
              <div className="space-y-3">
                {ADMISSION_UPDATES.slice(0, 3).map((u, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center text-center ${
                      u.urgent ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-slate-100'
                    }`}>
                      <p className="text-[10px] font-bold text-slate-500">{u.date.split('-')[2]}</p>
                      <p className="text-[9px] text-slate-400">
                        {new Date(u.date).toLocaleString('en-IN', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{u.title}</p>
                      <p className="text-[10px] text-slate-400">{u.college}</p>
                    </div>
                    {u.urgent && <div className="notif-dot shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Search, label: 'Search Colleges', href: '/colleges' },
                  { icon: BarChart2, label: 'View Rankings', href: '/rankings' },
                  { icon: TrendingUp, label: 'Check Admission Probability', href: '/admission-probability' },
                  { icon: Sparkles, label: 'ROI Calculator', href: '/roi-calculator' },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <action.icon size={15} className="text-slate-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{action.label}</span>
                    <ChevronRight size={13} className="text-slate-300 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
