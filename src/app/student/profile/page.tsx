'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Sparkles, GraduationCap, MapPin, DollarSign,
  CheckCircle, ChevronRight, ChevronLeft, Sliders, Shield,
  Award, BookOpen, Building, Check, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { STUDENT_PROFILE, COLLEGES } from '@/lib/mockData';

export default function StudentProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Academic
    fullName: STUDENT_PROFILE.name,
    class10Marks: 94.2,
    class12Marks: 91.5,
    exam: 'JEE Main',
    percentile: 87.4,
    rank: 124500,
    category: 'General',
    homeState: 'Maharashtra',

    // Step 2: Career Goals
    desiredDegree: 'B.Tech',
    branches: ['Computer Science & Engineering', 'Artificial Intelligence & Data Science'],
    careerAmbition: 'Product Engineering (Tech Giants & Startups)',

    // Step 3: Budget & Location
    maxAnnualBudget: 3.5, // Lakhs
    preferredStates: ['Maharashtra', 'Karnataka', 'Delhi-NCR'],
    hostelRequired: true,

    // Step 4: College Preferences
    ownership: ['Central', 'State', 'Autonomous'],
    campusPreference: 'Large Comprehensive Campus with Sports',

    // Step 5: Decision Priorities (Weights totaling 100%)
    placementWeight: 40,
    roiWeight: 30,
    brandWeight: 15,
    campusLifeWeight: 15,
  });

  const STEPS = [
    { num: 1, title: 'Academic Profile', desc: 'Exams, marks & cutoffs' },
    { num: 2, title: 'Career Goals', desc: 'Streams & specializations' },
    { num: 3, title: 'Budget & Location', desc: 'Financial & geo limits' },
    { num: 4, title: 'College Type', desc: 'Campus & facilities' },
    { num: 5, title: 'Decision Weights', desc: 'AI Personalization math' },
  ];

  function toggleBranch(branch: string) {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter(b => b !== branch)
        : [...prev.branches, branch],
    }));
  }

  function toggleState(state: string) {
    setFormData(prev => ({
      ...prev,
      preferredStates: prev.preferredStates.includes(state)
        ? prev.preferredStates.filter(s => s !== state)
        : [...prev.preferredStates, state],
    }));
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3500);
  }

  return (
    <div className="min-h-screen bg-paper text-slate-800">
      <Navbar />

      {/* Header */}
      <section className="bg-ink text-white pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
                <Sliders size={13} />
                Continuous Personalisation Engine
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Student Preference Profile
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                Configure your priorities and academic profile. Every college match percentage dynamically adjusts based on these parameters.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl text-xs text-slate-300">
              <Sparkles size={14} className="text-blue-400" />
              <span>Profile Intelligence: <strong>92% Complete</strong></span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STEPS.map(s => {
              const isCurrent = currentStep === s.num;
              const isCompleted = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-white/15 border-blue-400/50 text-white'
                      : isCompleted
                      ? 'bg-white/5 border-white/10 text-emerald-400'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-xs font-bold">
                    {isCompleted ? (
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                        isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {s.num}
                      </span>
                    )}
                    <span className="truncate">{s.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{s.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Form Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSaveProfile}>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Step 1: Academic Profile */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 1: Academic Background & Exam Scores</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    These metrics calibrate your realistic admission cutoffs and scholarship eligibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Home State / Domicile</label>
                    <select
                      value={formData.homeState}
                      onChange={e => setFormData({ ...formData, homeState: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="Maharashtra">Maharashtra (85% Home State Quota)</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">10th Grade (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.class10Marks}
                      onChange={e => setFormData({ ...formData, class10Marks: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">12th PCM (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.class12Marks}
                      onChange={e => setFormData({ ...formData, class12Marks: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Exam</label>
                    <select
                      value={formData.exam}
                      onChange={e => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option>JEE Main</option>
                      <option>JEE Advanced</option>
                      <option>MHT-CET</option>
                      <option>BITSAT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Percentile / Score</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.percentile}
                      onChange={e => setFormData({ ...formData, percentile: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    With an <strong>87.4 percentile</strong> in JEE Main and Maharashtra domicile, your admission probability is strong for top autonomous state institutions (e.g. COEP, VJTI, Walchand).
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Career Goals */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 2: Desired Programs & Specializations</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select the engineering disciplines and future roles that match your passion.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Target Degree Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['B.Tech / B.E.', 'Integrated MBA Tech (5-Yr)', 'Dual Degree B.Tech+M.Tech'].map(deg => (
                      <button
                        type="button"
                        key={deg}
                        onClick={() => setFormData({ ...formData, desiredDegree: deg })}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          formData.desiredDegree === deg
                            ? 'bg-blue-50 border-blue-400 text-accent'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {deg}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Preferred Branches (Multi-Select)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Computer Science & Engineering',
                      'Artificial Intelligence & Data Science',
                      'Information Technology',
                      'Electronics & Telecommunication',
                      'Mechanical Engineering with Robotics',
                      'Computational Mathematics',
                    ].map(branch => {
                      const isSelected = formData.branches.includes(branch);
                      return (
                        <button
                          type="button"
                          key={branch}
                          onClick={() => toggleBranch(branch)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{branch}</span>
                          {isSelected && <Check size={14} className="text-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget & Location */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 3: Budget Limits & Geographic Preferences</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Guardrails ensure recommendations never propose institutions that place undue financial burden on your family.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Maximum Annual Tuition Budget</label>
                    <span className="text-base font-extrabold text-accent">₹{formData.maxAnnualBudget} Lakhs / year</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8"
                    step="0.25"
                    value={formData.maxAnnualBudget}
                    onChange={e => setFormData({ ...formData, maxAnnualBudget: Number(e.target.value) })}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Govt/Subsidized (&lt; ₹1L)</span>
                    <span>State Autonomous (₹1–3L)</span>
                    <span>Premier Private (₹5L+)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Preferred Geographic Hubs</label>
                  <div className="flex flex-wrap gap-2">
                    {['Maharashtra', 'Karnataka', 'Delhi-NCR', 'Tamil Nadu', 'Telangana', 'Rajasthan'].map(st => {
                      const isSel = formData.preferredStates.includes(st);
                      return (
                        <button
                          type="button"
                          key={st}
                          onClick={() => toggleState(st)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                            isSel
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {isSel ? '✓ ' : ''}{st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">On-Campus Hostel is Mandatory</h4>
                    <p className="text-[11px] text-slate-400">Filter out colleges without guaranteed residential dormitories</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.hostelRequired}
                    onChange={e => setFormData({ ...formData, hostelRequired: e.target.checked })}
                    className="w-5 h-5 accent-accent rounded cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: College Type & Campus */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 4: Institution Culture & Infrastructure</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select preferred institution governance models and campus environments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Central Govt (IIT/NIT)', desc: 'Highest brand recognition, global alumni, intense competition' },
                    { title: 'State Autonomous (COEP/VJTI)', desc: 'Exceptional ROI, state quota advantages, affordable' },
                    { title: 'Deemed / Premier Private', desc: 'Modern luxury infrastructure, global exchange, flexible curriculum' },
                  ].map(opt => (
                    <div key={opt.title} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-400 transition-colors">
                      <h4 className="text-xs font-bold text-slate-900">{opt.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Campus Setting Preference</label>
                  <select
                    value={formData.campusPreference}
                    onChange={e => setFormData({ ...formData, campusPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option>Large Comprehensive Campus with Sports (50+ Acres)</option>
                    <option>Urban Tech Hub in Metro City (Industry Immersion)</option>
                    <option>Quiet Residential Academic Town</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 5: Decision Weights */}
            {currentStep === 5 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 5: Decision Matrix & AI Scoring Weights</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Define what matters most to your decision. Our algorithm weights each factor when computing your personalized match score.
                  </p>
                </div>

                <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Campus Placement Performance</span>
                      <span className="text-accent">{formData.placementWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={formData.placementWeight}
                      onChange={e => setFormData({ ...formData, placementWeight: Number(e.target.value) })}
                      className="w-full accent-accent"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Financial ROI (Fees to Starting CTC Ratio)</span>
                      <span className="text-accent">{formData.roiWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={formData.roiWeight}
                      onChange={e => setFormData({ ...formData, roiWeight: Number(e.target.value) })}
                      className="w-full accent-accent"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Brand Prestige & NIRF Ranking</span>
                      <span className="text-accent">{formData.brandWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={formData.brandWeight}
                      onChange={e => setFormData({ ...formData, brandWeight: Number(e.target.value) })}
                      className="w-full accent-accent"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Campus Life & Verified Student Reviews</span>
                      <span className="text-accent">{formData.campusLifeWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={formData.campusLifeWeight}
                      onChange={e => setFormData({ ...formData, campusLifeWeight: Number(e.target.value) })}
                      className="w-full accent-accent"
                    />
                  </div>
                </div>

                {/* Instant preview of top matches with this new weighting */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <h4 className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-600" />
                    Projected Top Matches with Your New Custom Weights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100 text-xs">
                      <strong className="block text-slate-800">COEP Pune</strong>
                      <span className="text-emerald-600 font-bold">96% Personal Match</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100 text-xs">
                      <strong className="block text-slate-800">VJTI Mumbai</strong>
                      <span className="text-emerald-600 font-bold">92% Personal Match</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100 text-xs">
                      <strong className="block text-slate-800">BITS Pilani</strong>
                      <span className="text-accent font-bold">81% Personal Match</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stepper Navigation Footer */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  <ChevronLeft size={14} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  <CheckCircle size={14} />
                  Save & Recalculate Shortlist
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Success Banner */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-6 p-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="shrink-0" />
                <div>
                  <p className="font-bold text-sm">Preference Profile Updated Successfully!</p>
                  <p className="text-xs text-emerald-100">
                    Recommendations, ROI calculations, and AI match scores across the entire platform have been re-calibrated.
                  </p>
                </div>
              </div>
              <Link
                href="/student/dashboard"
                className="px-4 py-2 bg-white text-emerald-800 text-xs font-bold rounded-xl shrink-0 hover:bg-emerald-50 transition-colors"
              >
                Go to Dashboard →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
