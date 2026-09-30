'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield, CheckCircle, AlertTriangle, Clock, ArrowLeft,
  ChevronRight, Check, X, FileText, ExternalLink, Filter
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminVerificationPage() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'ALL' | 'pending' | 'needs-verification' | 'verified'>('ALL');
  const [queue, setQueue] = useState([
    { id: 'v1', college: 'Symbiosis Institute of Technology', type: 'Placement Report 2026', source: 'Official Institutional Filing', date: '2026-09-28', status: 'pending' },
    { id: 'v2', college: 'DY Patil University', type: 'NAAC Accreditation Certificate', source: 'NAAC Portal Audit', date: '2026-09-25', status: 'needs-verification' },
    { id: 'v3', college: 'Pune Institute of Computer Technology (PICT)', type: 'Revised Fee Structure', source: 'State Fee Regulating Authority', date: '2026-09-30', status: 'verified' },
    { id: 'v4', college: 'MIT World Peace University', type: 'Placement Brochure Data', source: 'Campus Placement Cell', date: '2026-08-10', status: 'needs-verification' },
    { id: 'v5', college: 'Walchand College of Engineering', type: 'Faculty Ph.D. Ratios', source: 'AICTE Mandatory Disclosure', date: '2026-09-29', status: 'pending' },
  ]);

  function handleVerify(id: string, newStatus: string) {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    showToast(`Verification status updated to ${newStatus}`);
  }

  const filtered = queue.filter(item => filter === 'ALL' || item.status === filter);

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> Admin Portal
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Data Integrity</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Institutional Data Verification Queue (Section 41)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review mandatory regulatory disclosures, placement certificates, and fee authorizations before public publishing.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs">
            {(['ALL', 'pending', 'needs-verification', 'verified'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                  filter === st ? 'bg-[#1a56db] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 text-left">Institution</th>
                  <th className="py-3 px-4 text-left">Data Module</th>
                  <th className="py-3 px-4 text-left">Authority Source</th>
                  <th className="py-3 px-4 text-left">Submission Date</th>
                  <th className="py-3 px-4 text-left">Audit Status</th>
                  <th className="py-3 px-4 text-right">Scrutiny Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.college}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#1a56db]">{item.type}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.source}</td>
                    <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.status === 'needs-verification'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleVerify(item.id, 'verified')}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <Check size={12} /> Approve
                        </button>
                        <button
                          onClick={() => handleVerify(item.id, 'needs-verification')}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <AlertTriangle size={12} /> Flag Concern
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
