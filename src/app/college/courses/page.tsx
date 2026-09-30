'use client';

import Link from 'next/link';
import { BookOpen, ArrowLeft, Plus, CheckCircle, Edit, Trash2 } from 'lucide-react';

export default function CollegeCoursesAdminPage() {
  const courses = [
    { name: 'B.Tech in Computer Science & Engineering', code: 'CSE', seats: 120, fee: '₹1.40L / yr', exam: 'MH-CET / JEE Main', avgSalary: '₹15.4L' },
    { name: 'B.Tech in Artificial Intelligence & Robotics', code: 'AI&R', seats: 60, fee: '₹1.40L / yr', exam: 'MH-CET', avgSalary: '₹14.2L' },
    { name: 'B.Tech in Electronics & Telecommunication', code: 'E&TC', seats: 120, fee: '₹1.35L / yr', exam: 'MH-CET', avgSalary: '₹9.8L' },
    { name: 'B.Tech in Mechanical Engineering', code: 'MECH', seats: 120, fee: '₹1.20L / yr', exam: 'MH-CET', avgSalary: '₹7.2L' },
    { name: 'M.Tech in Computer Science', code: 'M.Tech CS', seats: 60, fee: '₹1.10L / yr', exam: 'GATE', avgSalary: '₹18.5L' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/college/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> College Dashboard
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Course Management</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Academic Programs & Seat Allocations</h1>
          </div>

          <button className="px-4 py-2 bg-[#1a56db] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Plus size={14} /> Add New Program
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Program Name</th>
                  <th className="pb-3">Code</th>
                  <th className="pb-3">Sanctioned Seats</th>
                  <th className="pb-3">Annual Tuition</th>
                  <th className="pb-3">Primary Exam</th>
                  <th className="pb-3">Avg CTC</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 font-bold text-slate-800">{c.name}</td>
                    <td className="py-3.5 font-semibold text-[#1a56db]">{c.code}</td>
                    <td className="py-3.5 text-slate-700">{c.seats} seats</td>
                    <td className="py-3.5 text-slate-700">{c.fee}</td>
                    <td className="py-3.5 text-slate-600">{c.exam}</td>
                    <td className="py-3.5 font-bold text-emerald-600">{c.avgSalary}</td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 hover:text-[#1a56db] text-slate-400" title="Edit"><Edit size={13} /></button>
                        <button className="p-1 hover:text-red-500 text-slate-400" title="Delete"><Trash2 size={13} /></button>
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
