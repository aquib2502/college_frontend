'use client';

import Link from 'next/link';
import { Sparkles, ArrowLeft, TrendingUp, Users, Search, Brain, CheckCircle, Activity } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminAIAnalyticsPage() {
  const queryData = {
    labels: ['B.Tech CSE under 6L', 'COEP vs VJTI placement', 'IIT Bombay JEE cutoff', 'Best MBA in Mumbai ROI', 'Affordable engineering Pune'],
    datasets: [{
      label: 'Natural Language Search Invocations',
      data: [12840, 9420, 8910, 6420, 5810],
      backgroundColor: '#7c3aed',
      borderRadius: 6,
    }],
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-[#1a56db] flex items-center gap-1 font-semibold">
              <ArrowLeft size={13} /> Admin Portal
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">AI Platform Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Platform AI & Decision Layer Analytics (Section 44)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor natural-language query resolution, continuous recommendation accuracy, and sentiment models.
          </p>
        </div>

        {/* Section 44 Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'AI Recommendations Generated', value: '12,842', color: '#7c3aed' },
            { label: 'AI Natural Language Searches', value: '28,490', color: '#1a56db' },
            { label: 'AI Comparison Sessions', value: '8,432', color: '#059669' },
            { label: 'Calculated Match Accuracy', value: '94.2%', color: '#d97706' },
          ].map((m, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-xs text-slate-400 font-medium mb-1">{m.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Top Natural Language Query Patterns</h3>
            <p className="text-xs text-slate-400 mb-4">Extracted intent parameters (Branch, Budget, Exam, Location)</p>
            <Bar data={queryData} options={{ responsive: true }} />
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">AI Subsystem Health</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Preference Extraction Parser', latency: '42ms', status: 'Healthy' },
                { name: 'Admission Probability Predictor', latency: '68ms', status: 'Healthy' },
                { name: 'Review Sentiment Synthesizer', latency: '110ms', status: 'Healthy' },
                { name: 'ROI Valuation Model', latency: '15ms', status: 'Healthy' },
              ].map((sys, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{sys.name}</p>
                    <p className="text-[10px] text-slate-400">Avg Response: {sys.latency}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
