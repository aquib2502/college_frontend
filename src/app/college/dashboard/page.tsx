'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, Star, Eye, Users, TrendingUp, Settings, Bell,
  FileText, BookOpen, Building2, Sparkles, ChevronRight, CheckCircle,
  ArrowUpRight, MessageSquare, Layout, Save, Check, Plus, Edit3,
  Phone, Mail, MapPin, Award
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const SIDEBAR_ITEMS = [
  { id: 'overview', icon: Layout, label: 'Overview' },
  { id: 'profile', icon: Building2, label: 'Profile Editor' },
  { id: 'analytics', icon: BarChart2, label: 'Deep Analytics' },
  { id: 'leads', icon: Users, label: 'Student Leads' },
  { id: 'reviews', icon: Star, label: 'Reviews & Feedback' },
  { id: 'admissions', icon: FileText, label: 'Admissions & Cutoffs' },
];

const trafficData = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Profile Views',
      data: [1240, 1890, 2340, 2890, 3420, 4180],
      backgroundColor: '#1a56db',
      borderRadius: 6,
    },
    {
      label: 'College Saves',
      data: [320, 480, 590, 720, 880, 1040],
      backgroundColor: '#cbd5e1',
      borderRadius: 6,
    },
  ],
};

const demographicsData = {
  labels: ['Maharashtra (Home State)', 'Karnataka', 'Gujarat', 'Delhi-NCR', 'Other States'],
  datasets: [
    {
      data: [65, 14, 9, 7, 5],
      backgroundColor: ['#1a56db', '#0284c7', '#38bdf8', '#7dd3fc', '#e2e8f0'],
    },
  ],
};

export default function CollegeDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editable Profile State (Section 37)
  const [profileForm, setProfileForm] = useState({
    institutionName: 'College of Engineering Pune (COEP Technological University)',
    shortName: 'COEP',
    type: 'Autonomous Public State University',
    naacGrade: 'A++',
    established: 1854,
    campusAcres: '36 Acres (Heritage Campus + North Campus)',
    tuitionFeePerYear: 1.4,
    hostelFeePerYear: 0.45,
    placementRate: 91,
    avgPackage: 11.2,
    medianPackage: 9.8,
    highestPackage: 50.5,
    topRecruiters: 'TCS, Microsoft, Barclays, Bajaj Auto, MasterCraft, Nvidia, Goldman Sachs',
  });

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
          <div className="mt-3">
            <p className="font-display font-bold text-xs text-white truncate">COEP Tech University</p>
            <div className="mt-1 px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full inline-flex items-center gap-1">
              <CheckCircle size={10} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-300 font-bold">Verified Institution</span>
            </div>
          </div>
        </div>

        {/* Tab Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {SIDEBAR_ITEMS.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
            href="/colleges/coep"
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowUpRight size={13} />
            View Public Profile
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors pt-1"
          >
            ← Return to Portal
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-60 overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-bold text-slate-900 text-base">College Administration Center</h1>
            <p className="text-xs text-slate-400">Institutional Portal · COEP Technological University</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/colleges/coep"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a56db] text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Eye size={13} />
              Public College View
            </Link>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Profile Completion Alert */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-emerald-700">92%</span>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-xs">Profile Verification Score: 92/100</p>
                    <p className="text-[11px] text-emerald-700">
                      Placement reports and NAAC documents have been verified by portal moderators.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                >
                  Edit Data
                </button>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Profile Views (30d)', value: '4,180', change: '+22%', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Student Saves', value: '1,040', change: '+18%', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { label: 'Direct Leads', value: '284', change: '+41', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Reality Score', value: '91 / 100', change: '#1 State', icon: Award, color: 'text-violet-500', bg: 'bg-violet-50' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                        <kpi.icon size={16} className={kpi.color} />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">{kpi.change}</span>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900">{kpi.value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Traffic: Profile Views & Shortlists</h3>
                  <Bar data={trafficData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Course Interest Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { course: 'B.Tech Computer Engineering', interest: 92, leads: 142 },
                      { course: 'B.Tech AI & Data Science', interest: 88, leads: 110 },
                      { course: 'B.Tech E&TC', interest: 64, leads: 82 },
                      { course: 'B.Tech Mechanical', interest: 48, leads: 56 },
                      { course: 'B.Tech Civil Engineering', interest: 32, leads: 28 },
                    ].map((c, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700">{c.course}</span>
                          <span className="text-slate-400 font-semibold">{c.leads} prospective leads</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#1a56db] h-1.5 rounded-full" style={{ width: `${c.interest}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Recent High-Intent Student Inquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs text-[#1a56db] font-semibold hover:underline">
                    View All Leads →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { name: 'Priya Sharma', course: 'B.Tech CSE', score: 'JEE Main 97.4%', location: 'Pune, MH', status: 'High Fit' },
                    { name: 'Rahul Verma', course: 'B.Tech AI & Data Science', score: 'MHT-CET 99.1%', location: 'Mumbai, MH', status: 'High Fit' },
                    { name: 'Ananya Deshmukh', course: 'B.Tech E&TC', score: 'JEE Main 92.5%', location: 'Nagpur, MH', status: 'Good Fit' },
                  ].map((lead, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1a56db] font-bold flex items-center justify-center text-[10px]">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{lead.name}</p>
                          <p className="text-[11px] text-slate-400">{lead.course} • {lead.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-slate-700 block">{lead.score}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PROFILE EDITOR (Section 37) */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Institution Profile Management</h2>
                    <p className="text-xs text-slate-400">Update verified institutional metrics, fees, and placement figures.</p>
                  </div>
                  {savedSuccess && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">
                      <Check size={14} /> Changes saved successfully!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Official University Name</label>
                      <input
                        type="text"
                        value={profileForm.institutionName}
                        onChange={e => setProfileForm({ ...profileForm, institutionName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Governance & Autonomy</label>
                      <input
                        type="text"
                        value={profileForm.type}
                        onChange={e => setProfileForm({ ...profileForm, type: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tuition / Yr (₹L)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.tuitionFeePerYear}
                        onChange={e => setProfileForm({ ...profileForm, tuitionFeePerYear: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Hostel / Yr (₹L)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={profileForm.hostelFeePerYear}
                        onChange={e => setProfileForm({ ...profileForm, hostelFeePerYear: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Median Package (₹L)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.medianPackage}
                        onChange={e => setProfileForm({ ...profileForm, medianPackage: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Placement (%)</label>
                      <input
                        type="number"
                        value={profileForm.placementRate}
                        onChange={e => setProfileForm({ ...profileForm, placementRate: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Top Verified Recruiters (Comma-separated)</label>
                    <input
                      type="text"
                      value={profileForm.topRecruiters}
                      onChange={e => setProfileForm({ ...profileForm, topRecruiters: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                    >
                      <Save size={14} />
                      Save & Submit for Verification
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DEEP ANALYTICS (Section 38) */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Student Geographic Demographics</h3>
                  <div className="max-w-[280px] mx-auto">
                    <Doughnut data={demographicsData} options={{ responsive: true }} />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Search & Impression Sources</h3>
                  <div className="space-y-3">
                    {[
                      { source: 'AI Natural Language Search (AI Finder)', share: '46%', count: '14,200 queries' },
                      { source: 'Engineering Category Filters', share: '28%', count: '8,640 views' },
                      { source: 'Compare Matrix Shortlist', share: '18%', count: '5,540 additions' },
                      { source: 'Direct Search & Google Referrals', share: '8%', count: '2,460 hits' },
                    ].map((s, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-slate-800 font-semibold block">{s.source}</strong>
                          <span className="text-[11px] text-slate-400">{s.count}</span>
                        </div>
                        <span className="font-bold text-[#1a56db] text-sm">{s.share}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: LEADS */}
          {activeTab === 'leads' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Prospective Candidate Leads</h3>
                  <p className="text-xs text-slate-400">Students who saved COEP to their shortlist or checked admission probability.</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-[#1a56db] text-xs font-semibold rounded-lg">
                  284 Total Active Leads
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Target Course</th>
                      <th className="py-3 px-4">Entrance Exam & Score</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Probability Fit</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Arjun Mehta', course: 'B.Tech CSE', exam: 'JEE Main (87.4%)', loc: 'Pune, MH', fit: 'Good Chance (78%)' },
                      { name: 'Priya Sharma', course: 'B.Tech CSE', exam: 'MHT-CET (99.4%)', loc: 'Mumbai, MH', fit: 'High Chance (96%)' },
                      { name: 'Rohit Kulkarni', course: 'B.Tech Mechanical', exam: 'MHT-CET (95.1%)', loc: 'Nashik, MH', fit: 'High Chance (92%)' },
                      { name: 'Sneha Jain', course: 'B.Tech E&TC', exam: 'JEE Main (91.8%)', loc: 'Aurangabad, MH', fit: 'Good Chance (84%)' },
                    ].map((lead, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-900">{lead.name}</td>
                        <td className="py-3 px-4 text-slate-700">{lead.course}</td>
                        <td className="py-3 px-4 font-medium text-blue-700">{lead.exam}</td>
                        <td className="py-3 px-4 text-slate-500">{lead.loc}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                            {lead.fit}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                            Send Prospectus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 5: REVIEWS & FEEDBACK */}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Verified Institutional Review Stream</h3>
                    <p className="text-xs text-slate-400">Institutional response privileges allow clarifying hostel or administrative improvements.</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600">Overall Rating: 4.6 / 5.0 ★</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Review from 2025 B.Tech Computer Engineering Student</span>
                      <span className="text-amber-500 font-semibold">★ 4.6 / 5</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      &ldquo;COEP coding culture is unbeatable. Average package in CSE was ₹16.4L. However, hostel capacity is limited for non-local students.&rdquo;
                    </p>
                    <div className="pt-2 pl-3 border-l-2 border-[#1a56db] text-[11px] text-blue-900 bg-blue-50/60 p-2 rounded-r-lg">
                      <strong>Official COEP Response:</strong> Construction on the new 800-bed North Campus hostel block is scheduled for handover in July 2026.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">CAP Round Cutoff Publishing</h3>
              <p className="text-xs text-slate-400">Publish latest MHT-CET and JEE Main cutoffs to synchronise with the AI Discovery engine.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">B.Tech Computer Engineering</p>
                  <p className="text-slate-500 mt-1">General Home State Cutoff: <strong>99.4 Percentile</strong></p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">B.Tech AI & Data Science</p>
                  <p className="text-slate-500 mt-1">General Home State Cutoff: <strong>98.9 Percentile</strong></p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">B.Tech Electronics & Telecom</p>
                  <p className="text-slate-500 mt-1">General Home State Cutoff: <strong>97.8 Percentile</strong></p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
