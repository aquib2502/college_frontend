'use client';

import Link from 'next/link';
import { Settings, ArrowLeft, Shield, Save, Check } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminSettingsPage() {
  const { showToast } = useToast();

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    showToast('Platform environment configurations updated!');
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
            <span className="text-slate-700 font-bold">System Settings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Platform Settings & Audit Governance</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control verification thresholds, anti-slop review filtering, and AI search settings.</p>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
          <div className="space-y-4">
            <h2 className="font-bold text-slate-900 text-sm border-b pb-2">Data Integrity Thresholds</h2>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-800">Automatic Review Scrutiny Filter</p>
                <p className="text-[11px] text-slate-400">Flag reviews with salary figures exceeding 200% of median institutional CTC</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#1a56db] w-4 h-4" />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-800">Mandatory NIRF Verification for Reality Score</p>
                <p className="text-[11px] text-slate-400">Do not compute reality score unless official NIRF or NAAC certification is on file</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#1a56db] w-4 h-4" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1a56db] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save size={13} /> Save Platform Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
