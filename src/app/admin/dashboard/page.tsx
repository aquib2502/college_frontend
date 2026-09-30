'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, Users, GraduationCap, Star, Shield, Sparkles,
  Settings, FileText, Bell, ChevronRight, TrendingUp, AlertTriangle,
  CheckCircle, ArrowUpRight, Activity, Database, Layout, Sliders,
  Check, X, Eye, Flag, RefreshCw
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: Layout, label: 'Overview' },
  { id: 'verification', icon: Shield, label: 'Data Verification' },
  { id: 'moderation', icon: Star, label: 'Review Moderation' },
  { id: 'rankings', icon: BarChart2, label: 'Ranking Algorithm' },
  { id: 'ai', icon: Sparkles, label: 'AI Platform Insights' },
  { id: 'users', icon: Users, label: 'User Directory' },
];

const INITIAL_VERIFICATION_QUEUE = [
  { id: 'v1', college: 'Symbiosis Institute of Technology', type: 'Placement Data 2026', source: 'Official Institutional Report', status: 'pending', date: '2026-09-28' },
  { id: 'v2', college: 'DY Patil University', type: 'NAAC Accreditation Certificate', source: 'NAAC Portal Audit', status: 'needs-verification', date: '2026-09-25' },
  { id: 'v3', college: 'Pune Institute of Computer Technology (PICT)', type: 'Revised Fee Structure', source: 'State Fee Regulating Authority', status: 'verified', date: '2026-09-30' },
  { id: 'v4', college: 'MIT World Peace University', type: 'Placement Report 2025', source: 'Campus Placement Brochure', status: 'outdated', date: '2026-08-10' },
  { id: 'v5', college: 'Walchand College of Engineering', type: 'Faculty Ph.D. Ratios', source: 'AICTE Mandatory Disclosure', status: 'pending', date: '2026-09-29' },
];

const INITIAL_MODERATION_REVIEWS = [
  { id: 'm1', student: 'Verified Current Student', college: 'COEP Pune', course: 'B.Tech CSE', rating: 4.8, flagReason: 'High placement salary cited (₹50.5L)', status: 'flagged' },
  { id: 'm2', student: 'Alumnus', college: 'VJTI Mumbai', course: 'B.Tech Mechanical', rating: 4.2, flagReason: 'Hostel mess complaint', status: 'pending' },
  { id: 'm3', student: 'Student', college: 'Private Tech Institute', course: 'B.Tech IT', rating: 1.5, flagReason: 'Reported by College Admin as disputed', status: 'disputed' },
];

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [moderationReviews, setModerationReviews] = useState(INITIAL_MODERATION_REVIEWS);

  // Ranking weights state (Section 43)
  const [rankingWeights, setRankingWeights] = useState({
    placement: 30,
    roi: 20,
    academic: 15,
    satisfaction: 15,
    transparency: 10,
    campus: 10,
  });

  const [savedWeightsNotice, setSavedWeightsNotice] = useState(false);

  const growthData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Platform Users',
        data: [82000, 98000, 121000, 148000, 189000, 245000],
        borderColor: '#1a56db',
        backgroundColor: 'rgba(26,86,219,0.08)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const searchData = {
    labels: ['College Search', 'AI Finder', 'Compare', 'Rankings', 'ROI Calc', 'Admission'],
    datasets: [{
      label: 'Sessions',
      data: [48293, 28490, 12842, 8432, 5120, 9841],
      backgroundColor: ['#1a56db', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0891b2'],
      borderRadius: 6,
    }],
  };

  function handleVerifyAction(id: string, newStatus: string) {
    setVerificationQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  }

  function handleModerationAction(id: string, action: 'approve' | 'hide') {
    setModerationReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'hidden' } : r))
    );
  }

  function handleSaveRankingWeights(e: React.FormEvent) {
    e.preventDefault();
    setSavedWeightsNotice(true);
    setTimeout(() => setSavedWeightsNotice(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0f1b2d] text-white flex flex-col shrink-0 fixed left-0 top-0 bottom-0 z-40">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-display font-black text-base text-white tracking-tight">College<span className="text-blue-400">IQ</span></span>
          </Link>
          <div className="mt-2.5 px-2.5 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg inline-block">
            <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Super Admin Console</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {SIDEBAR_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#1a56db] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowUpRight size={13} />
            Public Platform View
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-60 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-bold text-slate-900 text-base">Super Admin Management Console</h1>
            <p className="text-xs text-slate-400">System Governance · Data Verification & Moderation · September 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
              System Online (All AI Services Operational)
            </span>
            <div className="w-8 h-8 rounded-full bg-[#1a56db] text-white text-xs font-bold flex items-center justify-center">
              SA
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeSection === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Top KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: '1.24M', change: '+18%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Active Institutions', value: '2,841', change: '+124', icon: GraduationCap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Verified Reviews', value: '48,293', change: '+2,841', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { label: 'Verification Queue', value: '143', change: '-22 active', icon: Shield, color: 'text-violet-500', bg: 'bg-violet-50' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                        <kpi.icon size={16} className={kpi.color} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600">{kpi.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Platform User Growth</h3>
                  <Line data={growthData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Core Feature Engagement</h3>
                  <Bar data={searchData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </div>
              </div>

              {/* Verification Queue Preview */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Data Verification Queue</h3>
                    <p className="text-xs text-slate-400">Institutional disclosures awaiting verification against govt registries</p>
                  </div>
                  <button onClick={() => setActiveSection('verification')} className="text-xs text-[#1a56db] font-semibold hover:underline">
                    Open Full Queue →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {verificationQueue.slice(0, 3).map((item, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900">{item.college}</p>
                        <p className="text-slate-400 text-[11px]">{item.type} • Source: {item.source}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVerifyAction(item.id, 'verified')}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 text-xs"
                        >
                          Verify & Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DATA VERIFICATION QUEUE (Section 41) */}
          {activeSection === 'verification' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Institutional Data Verification Center</h2>
                  <p className="text-xs text-slate-400">All student-facing claims must pass primary source verification.</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-[#1a56db] text-xs font-semibold rounded-lg">
                  {verificationQueue.length} Active Queue Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">College</th>
                      <th className="py-3 px-4">Data Type</th>
                      <th className="py-3 px-4">Primary Source</th>
                      <th className="py-3 px-4">Submission Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Moderator Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {verificationQueue.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{item.college}</td>
                        <td className="py-3.5 px-4 text-slate-700">{item.type}</td>
                        <td className="py-3.5 px-4 font-medium text-blue-700">{item.source}</td>
                        <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            item.status === 'verified' ? 'bg-emerald-50 text-emerald-700' :
                            item.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                            item.status === 'outdated' ? 'bg-red-50 text-red-600' :
                            'bg-orange-50 text-orange-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleVerifyAction(item.id, 'verified')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleVerifyAction(item.id, 'outdated')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                            >
                              Flag
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REVIEW MODERATION (Section 42) */}
          {activeSection === 'moderation' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-slate-900 text-base mb-1">Student Review Moderation Queue</h2>
                <p className="text-xs text-slate-400 mb-4">Audit suspicious reviews, extreme ratings, and institutional disputes.</p>

                <div className="space-y-3">
                  {moderationReviews.map(r => (
                    <div key={r.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900">{r.college}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">{r.course}</span>
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded">
                            Flag: {r.flagReason}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Reviewer: {r.student} • Rating given: {r.rating} ★</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                          {r.status}
                        </span>
                        <button
                          onClick={() => handleModerationAction(r.id, 'approve')}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleModerationAction(r.id, 'hide')}
                          className="px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-semibold"
                        >
                          Hide Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: RANKING ALGORITHM CONFIG (Section 43) */}
          {activeSection === 'rankings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Ranking Formula Weight Configuration</h2>
                  <p className="text-xs text-slate-400">Configure weighting methodology across the College Reality Score and public rankings.</p>
                </div>
                {savedWeightsNotice && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <Check size={13} /> Algorithm weights published!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveRankingWeights} className="space-y-4 max-w-xl">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Verified Placement & Starting Package</span>
                    <span className="text-[#1a56db]">{rankingWeights.placement}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={rankingWeights.placement}
                    onChange={e => setRankingWeights({ ...rankingWeights, placement: Number(e.target.value) })}
                    className="w-full accent-[#1a56db]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Financial Return on Investment (ROI)</span>
                    <span className="text-[#1a56db]">{rankingWeights.roi}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={rankingWeights.roi}
                    onChange={e => setRankingWeights({ ...rankingWeights, roi: Number(e.target.value) })}
                    className="w-full accent-[#1a56db]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Academic Quality & Faculty Ph.D. Ratios</span>
                    <span className="text-[#1a56db]">{rankingWeights.academic}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={rankingWeights.academic}
                    onChange={e => setRankingWeights({ ...rankingWeights, academic: Number(e.target.value) })}
                    className="w-full accent-[#1a56db]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Student Satisfaction (Sentiment Analysis)</span>
                    <span className="text-[#1a56db]">{rankingWeights.satisfaction}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={rankingWeights.satisfaction}
                    onChange={e => setRankingWeights({ ...rankingWeights, satisfaction: Number(e.target.value) })}
                    className="w-full accent-[#1a56db]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Save & Recompute National Rankings
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* TAB 5: AI PLATFORM INSIGHTS (Section 44) */}
          {activeSection === 'ai' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'AI Natural Queries Handled', value: '28,490', sub: '+18% WoW' },
                  { label: 'Shortlists Generated', value: '12,842', sub: 'Avg 4.8 colleges/session' },
                  { label: 'Comparison AI Sessions', value: '8,432', sub: '92% completion rate' },
                  { label: 'Extraction Confidence', value: '96.4%', sub: 'Preference parser score' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-2xl font-extrabold text-violet-700 mt-1">{item.value}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Top Extracted Student Intent Prompts</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { prompt: '"B.Tech CSE in Maharashtra under ₹6 lakh with hostel and strong placements"', hits: 1420 },
                    { prompt: '"Affordable MBA colleges with ROI greater than 3.0"', hits: 980 },
                    { prompt: '"Colleges for 87 percentile in JEE with high placement percentage"', hits: 840 },
                    { prompt: '"Top autonomous colleges in Pune with modern sports complex"', hits: 520 },
                  ].map((p, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                      <span className="font-medium text-slate-800">{p.prompt}</span>
                      <span className="text-slate-400 font-semibold">{p.hits} queries</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: USER DIRECTORY */}
          {activeSection === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Registered Accounts Directory</h3>
                  <p className="text-xs text-slate-400">Manage student, alumnus, and institutional administrator accounts.</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                  1,241,890 Total Registered
                </span>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Affiliation / Status</th>
                      <th className="py-3 px-4">Activity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Arjun Mehta', role: 'Student', aff: 'JEE Aspirant (87%)', act: 'Active 2h ago' },
                      { name: 'Dr. S. K. Joshi', role: 'College Admin', aff: 'COEP Technological University', act: 'Active Today' },
                      { name: 'Vikram Batra', role: 'Verified Alumnus', aff: 'IIT Bombay (2021 Batch)', act: 'Active yesterday' },
                      { name: 'Priya Sharma', role: 'Student', aff: 'MHT-CET (99.4%)', act: 'Active 10m ago' },
                    ].map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-900">{u.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[11px]">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{u.aff}</td>
                        <td className="py-3 px-4 text-slate-400">{u.act}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-slate-400 hover:text-slate-700 font-semibold">
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
