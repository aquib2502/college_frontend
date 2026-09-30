'use client';

import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { COURSES_DATA } from '@/lib/coursesData';

export default function AdminCoursesDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Courses Master Database</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Standardized Degree Programs</h1>
          <p className="text-xs text-slate-500 mt-0.5">National master curriculum database approved by AICTE & UGC.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 text-left">Program</th>
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">Stream</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Median Package</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COURSES_DATA.map(course => (
                <tr key={course.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{course.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-700">{course.level}</td>
                  <td className="py-3.5 px-4 text-slate-600">{course.stream}</td>
                  <td className="py-3.5 px-4 text-slate-500">{course.duration}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">₹{course.medianPackage}L</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/courses/${course.id}`} className="text-xs font-semibold text-[#1a56db] hover:underline">
                      View Syllabus →
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
