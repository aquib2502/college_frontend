'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, DollarSign, Award, ChevronRight, CheckCircle2,
  Building, ArrowUpRight, GraduationCap, Sparkles, Briefcase, FileText,
  TrendingUp, Shield, Layers, HelpCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCourseById } from '@/lib/coursesData';
import { formatPackage } from '@/lib/utils';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const fourYearTuition = course.tuitionPerYear * parseInt(course.duration);
  const paybackRatio = (course.medianPackage / (fourYearTuition || 1)).toFixed(1);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-ink text-white pt-8 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight size={12} />
            <Link href="/courses" className="hover:text-slate-200">Courses</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">{course.shortCode}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {course.level} Degree
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {course.stream}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <Shield size={10} /> Verified Curriculum
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                {course.name}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>

            {/* Quick action card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl shrink-0 w-full md:w-72">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">National Median Package</p>
              <p className="text-3xl font-extrabold text-emerald-400 mb-1">{formatPackage(course.medianPackage)}</p>
              <p className="text-[11px] text-slate-400 mb-4">Highest recorded: ₹{course.highestPackage}L</p>

              <Link
                href={`/colleges?course=${encodeURIComponent(course.shortCode)}`}
                className="w-full py-2.5 px-4 bg-accent hover:bg-accent text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                View {course.offeringCollegesCount} Colleges <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-bold text-white">{course.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Avg Tuition</p>
                <p className="text-sm font-bold text-white">₹{course.tuitionPerYear}L / year</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Key Entrance</p>
                <p className="text-sm font-bold text-white">{course.entranceExams[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Building size={18} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Institutions</p>
                <p className="text-sm font-bold text-white">{course.offeringCollegesCount}+ Colleges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Highlights */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                Why Pursue {course.shortCode}?
              </h2>
              <div className="space-y-3">
                {course.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Roadmap */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-violet-600" />
                  Curriculum & Semester Roadmap
                </h2>
                <span className="text-xs text-slate-400">UGC / AICTE Model Syllabus</span>
              </div>
              <div className="space-y-4">
                {course.semesters.map((sem, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {sem.sem}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sem.subjects.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Colleges Offering This Degree */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building size={16} className="text-emerald-600" />
                  Top Institutes for {course.shortCode}
                </h2>
                <Link href="/colleges" className="text-xs text-accent font-semibold hover:underline">
                  Compare all →
                </Link>
              </div>

              <div className="space-y-3">
                {course.sampleColleges.map((col, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all bg-white">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{col.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{col.location} · Tuition: ₹{col.fees}L/yr</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs font-bold text-emerald-600">₹{col.medianSalary}L</p>
                        <p className="text-[10px] text-slate-400">Median Salary</p>
                      </div>
                      <Link
                        href={`/colleges/${col.id}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-accent rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        Profile <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Eligibility & Exams Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <GraduationCap size={16} className="text-accent" />
                Admission & Eligibility
              </h3>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Academic Requirement</p>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {course.eligibility}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">Accepted Entrance Exams</p>
                <div className="flex flex-wrap gap-1.5">
                  {course.entranceExams.map((exam, i) => (
                    <Link
                      key={i}
                      href="/exams"
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-accent rounded-md text-xs font-semibold transition-colors"
                    >
                      {exam}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/admission-probability"
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <TrendingUp size={13} /> Check Admission Probability
                </Link>
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Briefcase size={16} className="text-amber-500" />
                Target Career Roles
              </h3>
              <div className="space-y-2">
                {course.careerRoles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2 bg-slate-50 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Snapshot */}
            <div className="bg-gradient-to-br from-ink to-ink-2 text-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                <TrendingUp size={15} className="text-emerald-400" />
                Return on Investment
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Estimated based on median starting salary vs aggregate 4-year tuition fee.
              </p>

              <div className="grid grid-cols-2 gap-2 text-center mb-4">
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <p className="text-[10px] text-slate-400">Est. Total Tuition</p>
                  <p className="text-sm font-bold text-white">₹{fourYearTuition.toFixed(1)}L</p>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <p className="text-[10px] text-slate-400">1st Year Median</p>
                  <p className="text-sm font-bold text-emerald-400">₹{course.medianPackage}L</p>
                </div>
              </div>

              <Link
                href="/roi-calculator"
                className="w-full py-2 bg-white/15 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                Custom ROI Calculator <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
