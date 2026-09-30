'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, CheckCircle2, AlertTriangle, Bell, ArrowRight,
  TrendingUp, FileCheck, Shield, ChevronRight, HelpCircle, Building2,
  ExternalLink, Sparkles, Filter, Check
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ADMISSION_UPDATES } from '@/lib/mockData';
import { useToast } from '@/components/ui/Toast';

interface CounsellingRound {
  id: string;
  system: 'JoSAA / CSAB' | 'MHT-CET CAP' | 'NEET MCC' | 'Direct Institutional';
  roundName: string;
  dates: string;
  status: 'active' | 'upcoming' | 'completed';
  urgencyDays: number;
  description: string;
  actionUrl: string;
}

const COUNSELLING_SCHEDULE: CounsellingRound[] = [
  {
    id: 'c1',
    system: 'JoSAA / CSAB',
    roundName: 'JoSAA Round 5 Seat Allotment & Fee Submission',
    dates: 'Oct 12 – Oct 16, 2026',
    status: 'active',
    urgencyDays: 3,
    description: 'Mandatory online reporting, seat acceptance fee payment, and document upload for candidates allocated seats across 23 IITs and 31 NITs.',
    actionUrl: 'https://josaa.nic.in',
  },
  {
    id: 'c2',
    system: 'MHT-CET CAP',
    roundName: 'MHT-CET CAP Round 3 Choice Filling & Verification',
    dates: 'Oct 18 – Oct 22, 2026',
    status: 'upcoming',
    urgencyDays: 7,
    description: 'Final centralized admission round for autonomous and affiliated engineering colleges across Maharashtra state. Freeze or Float choice submission.',
    actionUrl: 'https://cetcell.mahacet.org',
  },
  {
    id: 'c3',
    system: 'JoSAA / CSAB',
    roundName: 'CSAB Special Round 1 Registration Opens',
    dates: 'Oct 25 – Oct 28, 2026',
    status: 'upcoming',
    urgencyDays: 14,
    description: 'Special counseling rounds for vacant seats in NITs, IIITs, and other GFTIs after completion of JoSAA rounds.',
    actionUrl: 'https://csab.nic.in',
  },
  {
    id: 'c4',
    system: 'Direct Institutional',
    roundName: 'BITS Pilani Iteration IV Seat Confirmation',
    dates: 'Oct 20 – Oct 23, 2026',
    status: 'upcoming',
    urgencyDays: 9,
    description: 'Payment of balance fees and campus reporting for candidates selected across Pilani, Goa, and Hyderabad campuses.',
    actionUrl: 'https://bitsadmission.com',
  },
];

const REQUIRED_DOCUMENTS = [
  { title: 'Class 10th & 12th Marks Sheets', desc: 'Original + 3 attested photocopies showing minimum qualifying marks in PCM/PCB.', essential: true },
  { title: 'Valid Entrance Scorecard & Admit Card', desc: 'Official NTA / State CET score printout with verified percentile breakdown.', essential: true },
  { title: 'Domicile / Nationality Certificate', desc: 'Mandatory for State Quota seats (e.g. 85% Maharashtra State Quota).', essential: true },
  { title: 'Category / Caste Certificate & Validity', desc: 'Required for OBC-NCL, SC, ST, EWS candidates with non-creamy layer certificate valid for 2026-27.', essential: true },
  { title: 'Migration & School Leaving Certificate', desc: 'Issued by junior college / high school showing conduct and completion.', essential: false },
  { title: 'Medical Fitness Certificate', desc: 'Signed by registered medical practitioner (MBBS) as per standard format.', essential: false },
];

export default function AdmissionsPage() {
  const { showToast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'JoSAA / CSAB' | 'MHT-CET CAP' | 'Direct Institutional'>('ALL');
  const [reminders, setReminders] = useState<string[]>(['c1']);

  function toggleReminder(id: string, name: string) {
    if (reminders.includes(id)) {
      setReminders(prev => prev.filter(r => r !== id));
      showToast(`Reminder removed for ${name}`);
    } else {
      setReminders(prev => [...prev, id]);
      showToast(`Reminder set for ${name}`);
    }
  }

  const filteredSchedule = COUNSELLING_SCHEDULE.filter(
    item => selectedFilter === 'ALL' || item.system === selectedFilter
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-800">
      <Navbar />

      {/* Hero — Deep Navy with radial electric blue glow */}
      <div className="relative bg-[#0B1F3A] text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clock size={12} className="text-blue-400" />
            Live Counselling Portal · Academic Year 2026-27
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight mb-3">
            Admissions & Counselling Schedule
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Track real-time JoSAA rounds, Maharashtra CAP seat matrices, cutoff announcements, and mandatory document verification deadlines in one place.
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Link
              href="/admission-probability"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <TrendingUp size={14} /> Calculate Admission Odds
            </Link>
            <Link
              href="/student/deadlines"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Calendar size={14} /> Personalized Deadlines
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Counselling Schedule */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    Centralized Counselling Rounds Schedule
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Updated every 24 hours from official state & national boards</p>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {(['ALL', 'JoSAA / CSAB', 'MHT-CET CAP', 'Direct Institutional'] as const).map(sys => (
                    <button
                      key={sys}
                      onClick={() => setSelectedFilter(sys)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedFilter === sys
                          ? 'bg-[#0B1F3A] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rounds List */}
              <div className="space-y-4">
                {filteredSchedule.map(round => {
                  const hasReminder = reminders.includes(round.id);
                  return (
                    <div
                      key={round.id}
                      className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all bg-white relative overflow-hidden"
                    >
                      {round.status === 'active' && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-emerald-500" />
                      )}

                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1a56db]">
                              {round.system}
                            </span>
                            {round.status === 'active' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Round
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                                Starts in {round.urgencyDays} Days
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900">{round.roundName}</h3>
                        </div>

                        <button
                          onClick={() => toggleReminder(round.id, round.roundName)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            hasReminder
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#1a56db]'
                          }`}
                        >
                          <Bell size={12} className={hasReminder ? 'fill-amber-500' : ''} />
                          {hasReminder ? 'Reminder Set' : 'Set Alert'}
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {round.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={13} className="text-[#1a56db]" /> Window: {round.dates}
                        </span>

                        <a
                          href={round.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1a56db] font-semibold flex items-center gap-1 hover:underline"
                        >
                          Official Portal <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Admission Process Stages */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileCheck size={16} className="text-emerald-600" />
                Standard 6-Step Admission Workflow
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { step: '01', title: 'Portal Registration', desc: 'Submit candidate details and entrance roll number on centralized portal.' },
                  { step: '02', title: 'Document Verification', desc: 'Online scrutiny or physical reporting at designated facilitation centers.' },
                  { step: '03', title: 'Merit List Publication', desc: 'State / All-India provisional and final merit rank generation.' },
                  { step: '04', title: 'Option Form (Choices)', desc: 'Prioritize colleges and branch preference sequence.' },
                  { step: '05', title: 'Seat Allotment Result', desc: 'Algorithm allocates seat matching rank and preferred choices.' },
                  { step: '06', title: 'Freeze / Float & Reporting', desc: 'Accept seat, pay acceptance fee, or opt for higher preference in next round.' },
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-xs font-extrabold text-[#1a56db] block mb-1">Step {s.step}</span>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents & Quick Tools */}
          <div className="lg:col-span-4 space-y-6">
            {/* Required Documents Checklist */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Shield size={16} className="text-[#1a56db]" />
                  Document Verification Checklist
                </h3>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Mandatory
                </span>
              </div>
              <p className="text-xs text-slate-400">Keep these scanned documents ready before opening of option form:</p>

              <div className="space-y-3">
                {REQUIRED_DOCUMENTS.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={13} className={doc.essential ? 'text-emerald-600' : 'text-slate-400'} />
                      <h4 className="text-xs font-bold text-slate-800">{doc.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Decision Assistant Card */}
            <div className="bg-gradient-to-br from-[#0f1b2d] to-[#1a2f4e] text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                <h3 className="font-bold text-sm">Need Help with Choice Filling?</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our AI Decision Layer calculates your rank cutoffs across previous 4 years and generates an optimized, high-probability college preference sequence.
              </p>
              <Link
                href="/ai-college-finder"
                className="w-full py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                Launch AI Option Assistant <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
