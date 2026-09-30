'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminNotificationsPage() {
  const { showToast } = useToast();
  const [headline, setHeadline] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Registered Students');

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!headline.trim()) return;
    showToast(`Broadcast notification dispatched to: ${targetAudience}`);
    setHeadline('');
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Broadcast Dispatch</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Platform Notification Center (Section 46)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Send urgent admission cutoff notices, deadline alerts, and system announcements.</p>
        </div>

        <form onSubmit={handleSend} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Student Segment</label>
            <select
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option>All Registered Students (245,000+)</option>
              <option>Maharashtra Domicile Students (MH-CET Aspirants)</option>
              <option>JEE Main / JoSAA Candidates</option>
              <option>College Administrators</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Broadcast Notification Message</label>
            <textarea
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="e.g. Alert: JoSAA Round 5 Seat Allotment has been released. Verify allotment status before Oct 15..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1a56db] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Send size={13} /> Dispatch Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
