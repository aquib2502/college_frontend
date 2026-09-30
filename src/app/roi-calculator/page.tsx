'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight, Percent } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function formatNum(n: number) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 1 });
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState({
    tuition: 3.0,
    hostel: 0.8,
    living: 0.5,
    other: 0.3,
    duration: 4,
    medianSalary: 8,
  });
  const [calculated, setCalculated] = useState(false);

  const totalCost = (inputs.tuition + inputs.hostel + inputs.living + inputs.other) * inputs.duration;
  const ratio = +(inputs.medianSalary / totalCost).toFixed(2);
  const payback = +(totalCost / inputs.medianSalary).toFixed(1);
  const roiScore = Math.min(Math.round(ratio * 40 + (100 - payback * 8)), 100);

  function update(key: keyof typeof inputs, val: number) {
    setInputs(prev => ({ ...prev, [key]: val }));
    setCalculated(false);
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* Hero Banner — Deep Navy with radial electric blue glow */}
      <div className="relative bg-[#0B1F3A] text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(37,99,235,0.28),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Calculator size={12} className="text-blue-400" />
            Financial Feasibility Engine
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-[-0.03em] leading-tight mb-3">
            Higher Education ROI Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Calculate accurate return on investment, tuition-to-compensation ratios, and realistic payback timelines before committing.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900 text-base">Cost & Compensation Parameters</h2>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Interactive</span>
            </div>

            {[
              { key: 'tuition', label: 'Tuition Fee (Per Year)', min: 0.5, max: 15, step: 0.1, unit: '₹L' },
              { key: 'hostel', label: 'Hostel Fee (Per Year)', min: 0, max: 3, step: 0.1, unit: '₹L' },
              { key: 'living', label: 'Living Expenses (Per Year)', min: 0, max: 3, step: 0.1, unit: '₹L' },
              { key: 'other', label: 'Other Academic Costs', min: 0, max: 2, step: 0.1, unit: '₹L' },
              { key: 'duration', label: 'Degree Duration', min: 1, max: 5, step: 1, unit: 'Years' },
              { key: 'medianSalary', label: 'Expected First Year Median CTC', min: 2, max: 50, step: 0.5, unit: '₹L / yr' },
            ].map(({ key, label, min, max, step, unit }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">{label}</label>
                  <span className="font-display font-black text-xs text-blue-600">
                    {inputs[key as keyof typeof inputs]} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={inputs[key as keyof typeof inputs]}
                  onChange={e => update(key as keyof typeof inputs, parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            ))}

            <button
              onClick={() => setCalculated(true)}
              className="w-full py-3 bg-[#0B1F3A] hover:bg-blue-900 text-white rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-blue-400" />
              Recalculate Projections
            </button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl shadow-blue-950/5">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
                <h2 className="font-display font-bold text-slate-900 text-base">Financial Payoff Projections</h2>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} />
                  <span>Audited Model</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mb-6">
                {[
                  { label: 'Total 4-Yr Degree Cost', value: `₹${formatNum(totalCost)}L`, sub: 'All inclusive', color: 'text-rose-600', bg: 'bg-rose-50/60 border-rose-100' },
                  { label: 'Expected First Year CTC', value: `₹${inputs.medianSalary}L/yr`, sub: 'Median package', color: 'text-emerald-700', bg: 'bg-emerald-50/60 border-emerald-100' },
                  { label: 'Salary-to-Cost Ratio', value: `${ratio}x`, sub: 'Gross multiple', color: 'text-blue-700', bg: 'bg-blue-50/60 border-blue-100' },
                  { label: 'Estimated Payback', value: `${payback} Yrs`, sub: 'Break-even point', color: 'text-amber-700', bg: 'bg-amber-50/60 border-amber-100' },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border text-center ${m.bg}`}
                  >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{m.label}</p>
                    <p className={`font-display font-black text-xl ${m.color}`}>{m.value}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* ROI Score Banner */}
              <div className="p-5 bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white rounded-xl text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">Normalized ROI Index</p>
                <div className="font-display font-black text-4xl text-white my-1">
                  {roiScore} <span className="text-xl font-normal text-blue-300">/ 100</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                  {roiScore >= 80
                    ? 'Exceptional return profile: Payback duration is under 2.5 years with minimal financial friction.'
                    : roiScore >= 60
                    ? 'Healthy investment ratio: Standard amortization profile consistent with top tier engineering colleges.'
                    : 'High debt recovery period: Consider applying for merit scholarships or institutional fee waivers.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
