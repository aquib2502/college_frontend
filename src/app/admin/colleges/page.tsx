'use client';

import Link from 'next/link';
import { Building2, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { COLLEGES } from '@/lib/mockData';

export default function AdminCollegesRegistryPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Colleges Master Registry</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Institutions Master Database</h1>
          <p className="text-xs text-slate-500 mt-0.5">Verified institutions, NAAC rankings, and reality score statuses.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 text-left">College Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Ownership</th>
                <th className="py-3 px-4 text-left">NAAC Grade</th>
                <th className="py-3 px-4 text-left">Reality Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COLLEGES.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{c.city}, {c.state}</td>
                  <td className="py-3.5 px-4 text-slate-600">{c.type} ({c.ownership})</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-700">{c.naacGrade}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#1a56db]">{c.realityScore}/100</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/colleges/${c.id}`}
                      className="text-xs font-semibold text-[#1a56db] hover:underline"
                    >
                      View Live Profile →
                    </Link>
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
