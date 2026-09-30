'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2, Sparkles, CheckCircle, Save, Check, ArrowLeft,
  BookOpen, DollarSign, Users, Award, Home, FileText, BellRing
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function CollegeProfileEditorPage() {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('basic');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    name: 'College of Engineering Pune (COEP Technological University)',
    shortName: 'COEP',
    established: 1854,
    type: 'Autonomous Public State University',
    naacGrade: 'A++',
    location: 'Shivajinagar, Pune, Maharashtra 411005',
    campusAcres: '36.5 Acres',
    website: 'https://www.coep.org.in',
    contactEmail: 'admissions@coep.ac.in',
    helplinePhone: '+91 20 2550 7000',
    tuitionUG: 1.4,
    tuitionPG: 1.1,
    hostelRent: 0.45,
    placementRate: 91.4,
    medianCTC: 9.8,
    avgCTC: 11.2,
    highestCTC: 50.5,
    topRecruiters: 'Microsoft, Google, Barclays, Tata Motors, Goldman Sachs, Nvidia, KPIT',
    hostelBoysSeats: 1200,
    hostelGirlsSeats: 800,
    messFoodType: 'Veg & Non-Veg Multi-Cuisine',
    curfewTime: '10:30 PM',
    announcementTitle: 'MHT-CET CAP Round 3 Vacancy Matrix Released',
    announcementDate: '2026-10-01',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    showToast('Changes saved successfully. Pending platform audit review.');
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  const SECTIONS = [
    { id: 'basic', label: 'Basic Information', icon: Building2 },
    { id: 'courses', label: 'Courses & Seats', icon: BookOpen },
    { id: 'fees', label: 'Fees & Hostel', icon: DollarSign },
    { id: 'placements', label: 'Placement Records', icon: Award },
    { id: 'facilities', label: 'Campus & Facilities', icon: Home },
    { id: 'documents', label: 'Accreditation Documents', icon: FileText },
    { id: 'announcements', label: 'Live Announcements', icon: BellRing },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* College Sidebar */}
      <aside className="w-64 bg-[#0f1b2d] text-white flex flex-col shrink-0 fixed left-0 top-0 bottom-0 z-40">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1a56db] flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm">CollegeIQ</span>
          </Link>
          <div className="mt-3">
            <p className="text-xs text-slate-300 font-semibold truncate">{form.name}</p>
            <div className="mt-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded-md inline-flex items-center gap-1">
              <CheckCircle size={10} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-300 font-medium">Verified Institution</span>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          <Link
            href="/college/dashboard"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={14} /> Back to Overview
          </Link>

          <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Profile Sections (Sec 37)
          </div>

          {SECTIONS.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === sec.id
                  ? 'bg-[#1a56db] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <sec.icon size={15} />
              <span>{sec.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-slate-400">
          <p className="font-semibold text-white">Demo Role</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Logged in as College Admin</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Institution Profile Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage verified institutional data, cutoffs, and placements</p>
            </div>

            <button
              onClick={handleSubmit}
              className="px-4 py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              {savedSuccess ? <Check size={14} /> : <Save size={14} />}
              {savedSuccess ? 'Changes Saved!' : 'Save & Publish Changes'}
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-600" />
              <span>Changes saved successfully. Verification queue has been notified for compliance auditing.</span>
            </div>
          )}

          {/* Form container */}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            {activeSection === 'basic' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Full Legal Name of Institution</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Short Name / Abbreviation</label>
                    <input
                      type="text"
                      value={form.shortName}
                      onChange={e => setForm({ ...form, shortName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Year Established</label>
                    <input
                      type="number"
                      value={form.established}
                      onChange={e => setForm({ ...form, established: parseInt(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Institution Type</label>
                    <input
                      type="text"
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">NAAC Grade</label>
                    <input
                      type="text"
                      value={form.naacGrade}
                      onChange={e => setForm({ ...form, naacGrade: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Campus Physical Address</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'fees' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Fees & Hostel Cost Structure</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">B.Tech Tuition / yr (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={form.tuitionUG}
                      onChange={e => setForm({ ...form, tuitionUG: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">M.Tech Tuition / yr (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={form.tuitionPG}
                      onChange={e => setForm({ ...form, tuitionPG: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Annual Hostel + Mess (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={form.hostelRent}
                      onChange={e => setForm({ ...form, hostelRent: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'placements' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Official Placement Statistics (2025-26)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Placement %</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.placementRate}
                      onChange={e => setForm({ ...form, placementRate: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-700"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Median CTC (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.medianCTC}
                      onChange={e => setForm({ ...form, medianCTC: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Average CTC (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.avgCTC}
                      onChange={e => setForm({ ...form, avgCTC: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-violet-700"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Highest CTC (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.highestCTC}
                      onChange={e => setForm({ ...form, highestCTC: parseFloat(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-amber-700"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-4">
                    <label className="font-semibold text-slate-700 block mb-1">Marquee Recruiters</label>
                    <input
                      type="text"
                      value={form.topRecruiters}
                      onChange={e => setForm({ ...form, topRecruiters: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'announcements' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Official Announcements Broadcast</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Headline</label>
                    <input
                      type="text"
                      value={form.announcementTitle}
                      onChange={e => setForm({ ...form, announcementTitle: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Broadcast Date</label>
                    <input
                      type="date"
                      value={form.announcementDate}
                      onChange={e => setForm({ ...form, announcementDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other sections */}
            {(activeSection === 'courses' || activeSection === 'facilities' || activeSection === 'documents') && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 capitalize">{activeSection} Management</h3>
                <p className="text-xs text-slate-500">
                  Manage seats, mandatory AICTE disclosures, and certified lab infrastructure for {form.shortName}.
                </p>
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                  <p className="text-xs font-semibold text-slate-700 mb-1">All verified documentation is up to date.</p>
                  <p className="text-[11px] text-slate-400">Audited against NIRF and AICTE mandatory public disclosures.</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Section changes are auto-validated</span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1a56db] text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
