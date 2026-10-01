'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Bell, AlertTriangle, CheckCircle2, ChevronRight,
  ArrowRight, Sparkles, Filter, ExternalLink
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ADMISSION_UPDATES } from '@/lib/mockData';
import { useToast } from '@/components/ui/Toast';

export default function StudentDeadlinesPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'reminders'>('all');
  const [reminders, setReminders] = useState<string[]>(['au1', 'au3']);

  function toggleReminder(id: string, title: string) {
    if (reminders.includes(id)) {
      setReminders(prev => prev.filter(r => r !== id));
      showToast(`Reminder removed: ${title}`);
    } else {
      setReminders(prev => [...prev, id]);
      showToast(`Reminder activated: ${title}`);
    }
  }

  const allDeadlines = [
    ...ADMISSION_UPDATES,
    {
      id: 'au5',
      type: 'scholarship',
      college: 'State DTE Portal',
      title: 'MahaDBT Post-Matric Scholarship Submission Deadline',
      date: '2026-10-28',
      daysLeft: 28,
      urgent: false,
    },
    {
      id: 'au6',
      type: 'counselling',
      college: 'JoSAA Authority',
      title: 'Mandatory Document Verification & Fee Acceptance (Round 5)',
      date: '2026-10-14',
      daysLeft: 4,
      urgent: true,
    },
  ];

  const filtered = allDeadlines.filter(item => {
    if (activeTab === 'urgent') return item.urgent;
    if (activeTab === 'reminders') return reminders.includes(item.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <div className="bg-ink text-white pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight size={12} />
            <Link href="/student/dashboard" className="hover:text-slate-200">Student Dashboard</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Deadlines</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
                <Bell size={13} />
                Admission Calendar & Alerts
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Upcoming Admission Deadlines
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Never miss an application closing date, seat allotment round, or scholarship deadline.
              </p>
            </div>

            <Link
              href="/admissions"
              className="px-4 py-2.5 bg-accent hover:bg-accent text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              Centralized Admissions Hub <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            {[
              { id: 'all', label: 'All Deadlines' },
              { id: 'urgent', label: '⚡ Urgent (< 15 Days)' },
              { id: 'reminders', label: `🔔 My Reminders (${reminders.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Showing {filtered.length} deadlines
          </span>
        </div>

        {/* Deadlines List */}
        <div className="space-y-4">
          {filtered.map(item => {
            const hasReminder = reminders.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    item.urgent ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-accent border border-blue-100'
                  }`}>
                    <Calendar size={20} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">{item.college}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {item.type}
                      </span>
                      {item.urgent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 animate-pulse">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Clock size={12} /> Target Date: {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center shrink-0">
                  <div className="text-right sm:mr-2">
                    <p className={`text-base font-extrabold ${item.urgent ? 'text-red-600' : 'text-accent'}`}>
                      {item.daysLeft} Days
                    </p>
                    <p className="text-[10px] text-slate-400">Remaining</p>
                  </div>

                  <button
                    onClick={() => toggleReminder(item.id, item.title)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      hasReminder
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Bell size={13} className={hasReminder ? 'fill-amber-500' : ''} />
                    {hasReminder ? 'Reminder Set' : 'Set Alert'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
