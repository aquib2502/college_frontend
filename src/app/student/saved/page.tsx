'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark, GitCompare, Trash2, ArrowUpRight, Sparkles,
  CheckCircle, Clock, Calendar, Download, Building, Share2,
  X, Upload, Send, FileCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { COLLEGES, simulateAIMatch, STUDENT_PROFILE, ADMISSION_UPDATES } from '@/lib/mockData';
import { formatPackage, getScoreColor, getProbabilityLabel } from '@/lib/utils';

export default function SavedCollegesPage() {
  const { savedColleges, toggleSave, addToCompare, compareList } = useApp();
  const [selectedView, setSelectedView] = useState<'cards' | 'table'>('cards');
  const [applyModalCollege, setApplyModalCollege] = useState<typeof COLLEGES[0] | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const savedList = COLLEGES.filter(c => savedColleges.includes(c.id));

  function handleShare() {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  }

  function handleSimulateApply(e: React.FormEvent) {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setApplyModalCollege(null);
    }, 2800);
  }

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <section className="bg-ink text-white pt-10 pb-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
                <Bookmark size={13} />
                Student Decision Workspace
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                My College Shortlist
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                You have <strong className="text-white">{savedList.length} colleges</strong> saved. Track deadlines, compare outcomes, and simulate submissions.
              </p>
            </div>

            {savedList.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Share2 size={14} />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Shortlist'}</span>
                </button>
                <Link
                  href="/compare"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent hover:bg-accent text-xs font-semibold text-white shadow-md transition-colors"
                >
                  <GitCompare size={14} />
                  Compare All in Matrix →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Shortlist Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {savedList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-accent flex items-center justify-center mx-auto mb-4">
              <Bookmark size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Shortlist is Empty</h2>
            <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
              Explore colleges using our AI College Finder or Directory. Click the bookmark icon on any college card to add it to your shortlist for side-by-side analysis.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  toggleSave('coep');
                  toggleSave('vjti');
                  toggleSave('bits-pilani');
                }}
                className="px-4 py-2 bg-accent hover:bg-accent text-white text-xs font-semibold rounded-xl shadow-sm"
              >
                Add Top 3 Recommended Colleges
              </button>
              <Link
                href="/colleges"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* View Toggle Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">View format:</span>
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setSelectedView('cards')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      selectedView === 'cards' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Cards
                  </button>
                  <button
                    onClick={() => setSelectedView('table')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      selectedView === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Comparison Table
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Sorted by AI Profile Match & Reality Score
              </div>
            </div>

            {/* View: Cards */}
            {selectedView === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedList.map(college => {
                  const match = simulateAIMatch(college.id, STUDENT_PROFILE);
                  const isCompared = compareList.includes(college.id);
                  const probInfo = getProbabilityLabel(match.admissionProbability);

                  return (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Top info */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2 bg-slate-50 border border-slate-100 rounded-xl leading-none">
                              {college.logo}
                            </span>
                            <div>
                              <Link
                                href={`/colleges/${college.id}`}
                                className="font-bold text-slate-900 text-sm hover:text-accent transition-colors leading-tight line-clamp-1"
                              >
                                {college.name}
                              </Link>
                              <p className="text-xs text-slate-400 mt-0.5">{college.city}, {college.state}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleSave(college.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove from saved"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Scores Grid */}
                        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl mb-4 text-center">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">AI Match</span>
                            <span className="text-sm font-bold text-accent">{match.matchPercent}%</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Reality Score</span>
                            <span className={`text-sm font-bold ${getScoreColor(college.realityScore)}`}>
                              {college.realityScore}/100
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Admit Chance</span>
                            <span className={`text-xs font-bold ${probInfo.color} block mt-0.5`}>
                              {match.admissionProbability}%
                            </span>
                          </div>
                        </div>

                        {/* Core metrics */}
                        <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Annual Tuition:</span>
                            <strong className="text-slate-800 font-semibold">{formatPackage(college.totalFees)}/yr</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Median Package:</span>
                            <strong className="text-emerald-600 font-semibold">{formatPackage(college.medianPackage)}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Placement %:</span>
                            <strong className="text-slate-800 font-semibold">{college.placementPercent}% placed</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Next Application Cutoff:</span>
                            <span className="text-amber-600 font-medium flex items-center gap-1">
                              <Clock size={11} /> 15 Oct 2026
                            </span>
                          </div>
                        </div>

                        {/* Why it matches */}
                        <div className="mb-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Why it Matches You
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {match.whyMatches.slice(0, 2).map((reason, i) => (
                              <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded-md font-medium">
                                ✓ {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToCompare(college.id)}
                            className={`px-3 py-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                              isCompared
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <GitCompare size={13} />
                            <span>{isCompared ? 'In Compare' : 'Add Compare'}</span>
                          </button>

                          <Link
                            href={`/admission-probability`}
                            className="px-3 py-2 text-xs font-semibold rounded-xl bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 flex items-center justify-center text-center transition-colors"
                          >
                            Predict Cutoff
                          </Link>
                        </div>

                        <button
                          onClick={() => setApplyModalCollege(college)}
                          className="w-full py-2.5 bg-accent hover:bg-accent text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Send size={13} />
                          Simulate Application
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* View: Table */}
            {selectedView === 'table' && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">College</th>
                        <th className="py-3 px-4">AI Match</th>
                        <th className="py-3 px-4">Reality Score</th>
                        <th className="py-3 px-4">Tuition/Yr</th>
                        <th className="py-3 px-4">Median Salary</th>
                        <th className="py-3 px-4">Placement</th>
                        <th className="py-3 px-4">Admit Chance</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {savedList.map(college => {
                        const match = simulateAIMatch(college.id, STUDENT_PROFILE);
                        return (
                          <tr key={college.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl">{college.logo}</span>
                                <div>
                                  <Link href={`/colleges/${college.id}`} className="font-bold text-slate-900 hover:text-accent">
                                    {college.shortName}
                                  </Link>
                                  <p className="text-[11px] text-slate-400">{college.city}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-accent">{match.matchPercent}%</td>
                            <td className="py-3.5 px-4">
                              <span className={`font-bold ${getScoreColor(college.realityScore)}`}>
                                {college.realityScore}/100
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-800">{formatPackage(college.totalFees)}</td>
                            <td className="py-3.5 px-4 font-bold text-emerald-600">{formatPackage(college.medianPackage)}</td>
                            <td className="py-3.5 px-4 text-slate-700 font-medium">{college.placementPercent}%</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-bold text-[11px]">
                                {match.admissionProbability}% Good
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setApplyModalCollege(college)}
                                  className="px-2.5 py-1 bg-accent text-white font-semibold rounded-lg hover:bg-accent transition-colors"
                                >
                                  Apply
                                </button>
                                <button
                                  onClick={() => toggleSave(college.id)}
                                  className="p-1 text-slate-400 hover:text-red-500 rounded"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Simulated Application Modal */}
      <AnimatePresence>
        {applyModalCollege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyModalCollege(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{applyModalCollege.logo}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Application Assistant</h3>
                    <p className="text-xs text-slate-400">Simulate direct admission submission to {applyModalCollege.shortName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setApplyModalCollege(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>

              {applicationSubmitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <FileCheck size={30} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Application Simulated Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Application reference <strong>#APP-{applyModalCollege.id.toUpperCase()}-2026</strong> has been registered with simulated credentials.
                  </p>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-accent text-xs font-semibold rounded-lg">
                    Check Student Dashboard for simulated status tracking
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSimulateApply} className="p-6 space-y-4 overflow-y-auto">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-800">
                    <strong>Auto-Filled Profile:</strong> Using your verified academic scores ({STUDENT_PROFILE.exam} 87 percentile, PCM 91%).
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Course & Branch</label>
                    <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800">
                      <option>B.Tech Computer Science & Engineering</option>
                      <option>B.Tech Artificial Intelligence & Data Science</option>
                      <option>B.Tech Electronics & Telecommunication</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Applicant Name</label>
                      <input
                        type="text"
                        defaultValue={STUDENT_PROFILE.name}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Entrance Roll No.</label>
                      <input
                        type="text"
                        defaultValue="JEE26-8849201"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  {/* Document upload preview */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Verification Documents</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50/50">
                      <Upload size={18} className="mx-auto text-slate-400 mb-1" />
                      <p className="text-[11px] text-slate-600 font-medium">10th/12th Marks Card & JEE Scorecard Attached</p>
                      <p className="text-[10px] text-slate-400">Auto-pulled from Student Profile Locker (Verified)</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalCollege(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold bg-accent hover:bg-accent text-white rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <Send size={13} />
                      Simulate Direct Apply
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
