'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

export default function AdminSourcesPage() {
  const sources = [
    { name: 'Ministry of Education — NIRF Data Portal', type: 'Central Government Regulatory', coverage: 'Placements, Research, Rankings', status: 'Active & Verified', auditFreq: 'Annual' },
    { name: 'National Assessment and Accreditation Council (NAAC)', type: 'Accreditation Authority', coverage: 'Institutional Grades (A++, A+, A)', status: 'Active & Verified', auditFreq: '5-Year Cycle' },
    { name: 'State Fee Regulating Authority (FRA) Maharashtra', type: 'State Statutory Body', coverage: 'Tuition Fee Approvals', status: 'Active & Verified', auditFreq: 'Annual Gazette' },
    { name: 'JoSAA / Central Seat Allocation Board (CSAB)', type: 'Counselling Authority', coverage: 'Cutoffs & Seat Matrix', status: 'Active & Verified', auditFreq: 'Per Round' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Data Integrity</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Regulatory Data Sources & Verification Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">Official data pipelines providing primary evidence for institutional reality scores.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 text-left">Regulatory Authority Source</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Data Coverage</th>
                <th className="py-3 px-4 text-left">Audit Frequency</th>
                <th className="py-3 px-4 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sources.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{s.type}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#1a56db]">{s.coverage}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.auditFreq}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1">
                      <CheckCircle size={11} className="text-emerald-600" /> {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
