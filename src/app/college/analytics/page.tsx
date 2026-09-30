'use client';

import Link from 'next/link';
import {
  BarChart2, TrendingUp, Users, Eye, Bookmark, Sparkles,
  ArrowLeft, ArrowUpRight, CheckCircle, ChevronRight
} from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function CollegeAnalyticsPage() {
  const trafficData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Search Impressions',
        data: [14200, 18900, 23400, 31200, 42800, 51900],
        borderColor: '#1a56db',
        backgroundColor: 'rgba(26, 86, 219, 0.08)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Direct Profile Views',
        data: [3200, 4800, 5900, 7800, 9600, 12400],
        borderColor: '#059669',
        backgroundColor: 'transparent',
        borderDash: [4, 4],
        tension: 0.3,
      },
    ],
  };

  const branchInterest = {
    labels: ['B.Tech CSE', 'B.Tech AI & Data', 'B.Tech E&TC', 'B.Tech Mechanical', 'B.Tech Civil'],
    datasets: [
      {
        label: 'Inquiries & Shortlists',
        data: [4820, 3120, 2410, 1840, 920],
        backgroundColor: '#1a56db',
        borderRadius: 6,
      },
    ],
  };

  const demographics = {
    labels: ['Maharashtra (Home State)', 'Karnataka', 'Gujarat', 'Delhi-NCR', 'Other States'],
    datasets: [
      {
        data: [65, 14, 9, 7, 5],
        backgroundColor: ['#1a56db', '#0284c7', '#38bdf8', '#7dd3fc', '#e2e8f0'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/college/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
                <ArrowLeft size={13} /> College Dashboard
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-bold">Deep Institutional Analytics</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              COEP Pune — Student Traffic & Discovery Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live prospective student interest, search discovery keywords, and geographic reach.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle size={13} /> Active Audit Cycle
            </span>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Search Appearances', value: '51,900', change: '+24% this month', color: '#1a56db' },
            { label: 'Profile Page Views', value: '12,400', change: '+18% vs avg', color: '#059669' },
            { label: 'Student Shortlists / Saves', value: '3,840', change: '+32% post CET results', color: '#7c3aed' },
            { label: 'High-Intent Inquiries', value: '842', change: '88% qualified leads', color: '#d97706' },
          ].map((kpi, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-xs text-slate-400 font-semibold mb-1">{kpi.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">{kpi.change}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Search Impressions vs Profile Views (6 Months)</h3>
            <p className="text-xs text-slate-400 mb-4">Traffic growth driven by natural-language AI searches</p>
            <Line data={trafficData} options={{ responsive: true }} />
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Geographic Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Prospective students by domicile state</p>
            <Doughnut data={demographics} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Branch-Wise Student Interest</h3>
            <p className="text-xs text-slate-400 mb-4">Applications and shortlists distributed by degree branch</p>
            <Bar data={branchInterest} options={{ responsive: true }} />
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Top AI Natural Language Queries Leading Here</h3>
            <div className="space-y-2.5 text-xs">
              {[
                { query: 'Best engineering colleges in Pune under 2 lakh', count: '4,820 clicks' },
                { query: 'COEP CSE placement package 2025', count: '3,910 clicks' },
                { query: 'Top colleges accepting MH-CET 98 percentile', count: '3,120 clicks' },
                { query: 'Autonomous engineering college with high ROI', count: '2,490 clicks' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-slate-700 truncate mr-2">&ldquo;{item.query}&rdquo;</span>
                  <span className="text-[11px] font-bold text-[#1a56db] shrink-0">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
