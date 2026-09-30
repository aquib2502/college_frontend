'use client';

import Link from 'next/link';
import { Users, ArrowLeft, Shield, GraduationCap, Building2 } from 'lucide-react';

export default function AdminUsersDirectoryPage() {
  const users = [
    { name: 'Arjun Mehta', email: 'arjun.mehta@example.com', role: 'Student', status: 'Active', exam: 'JEE Main (87 %ile)', location: 'Pune, Maharashtra' },
    { name: 'Dr. S. K. Mahajan', email: 'registrar@coep.ac.in', role: 'College Admin', status: 'Verified Authority', institution: 'COEP Pune', location: 'Pune' },
    { name: 'Pooja Iyer', email: 'pooja.i@example.com', role: 'Verified Alumna', status: 'Active', batch: '2023 IIT Bombay', location: 'Bengaluru' },
    { name: 'Admin Operations', email: 'ops@collegeiq.in', role: 'Super Admin', status: 'Active', permissions: 'Full Platform Access', location: 'National HQ' },
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
            <span className="text-slate-700 font-bold">User Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Platform Users & Role Permissions</h1>
          <p className="text-xs text-slate-500 mt-0.5">Directory of registered students, alumni, and verified institutional administrators.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 text-left">User Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role Access</th>
                <th className="py-3 px-4 text-left">Details</th>
                <th className="py-3 px-4 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1a56db]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{u.exam || u.institution || u.batch || u.permissions}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-semibold text-emerald-700">{u.status}</span>
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
