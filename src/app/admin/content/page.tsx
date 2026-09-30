'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Plus, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminContentManagementPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'updates' | 'guides' | 'scholarships'>('updates');

  const contentList = [
    { title: 'JoSAA 2026 Round 5 Cutoff Trends & Seat Matrices', type: 'Admission Update', author: 'Editorial Team', status: 'Published', date: '2026-09-30' },
    { title: 'How to Choose Between COEP Pune and VJTI Mumbai for B.Tech CSE', type: 'Comparison Guide', author: 'CollegeIQ Research', status: 'Published', date: '2026-09-28' },
    { title: 'Maharashtra State DBT Post-Matric Scholarship Complete Application Handbook', type: 'Scholarship Guide', author: 'Financial Aid Desk', status: 'Published', date: '2026-09-25' },
    { title: 'JEE Main 2026 99 Percentile Score vs Rank Mapping Matrix', type: 'Exam Analysis', author: 'Analytics Unit', status: 'Draft', date: '2026-09-29' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> Admin Portal
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Content CMS</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Content Management System (Section 45)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Publish and moderate student guides, admission bulletins, and scholarship digests.</p>
          </div>

          <button
            onClick={() => showToast('New content draft initiated')}
            className="px-4 py-2 bg-[#1a56db] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={14} /> Create Content Post
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 text-left">Article / Bulletin Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Author Desk</th>
                  <th className="py-3 px-4 text-left">Published Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contentList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.title}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#1a56db]">{item.type}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.author}</td>
                    <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-slate-400 hover:text-[#1a56db] p-1"><Edit size={13} /></button>
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
