'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Bookmark, GitCompare, ChevronRight, Check } from 'lucide-react';
import { College } from '@/lib/mockData';
import { formatPackage } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

interface Props {
  college: College;
  matchPercent?: number;
  admissionProb?: number;
  index?: number;
}

export default function CollegeCard({ college, matchPercent, admissionProb, index = 0 }: Props) {
  const router = useRouter();
  const { savedColleges, toggleSave, compareList, addToCompare, removeFromCompare } = useApp();
  const { showToast } = useToast();

  const isSaved = savedColleges.includes(college.id);
  const inCompare = compareList.includes(college.id);

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation();
    toggleSave(college.id);
    showToast(isSaved ? `Removed from shortlist` : `${college.shortName} added to shortlist`);
  }

  function handleCompare(e: React.MouseEvent) {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(college.id);
      showToast(`Removed from comparison`);
    } else if (compareList.length >= 5) {
      showToast('You can compare up to 5 colleges', 'error');
    } else {
      addToCompare(college.id);
      showToast(`${college.shortName} added to comparison`);
    }
  }

  const monogram = college.shortName.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
      className="cursor-pointer"
      onClick={() => router.push(`/colleges/${college.id}`)}
    >
      <div className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all group flex flex-col justify-between h-full">
        {/* Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-neutral-300 group-hover:bg-[#2563EB] transition-colors">
              {monogram}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[#0B1F3A] text-base leading-tight group-hover:text-[#2563EB] transition-colors truncate">
                    {college.shortName}
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{college.name}</p>
                </div>
                <div className="text-center px-2 py-1 rounded-lg bg-[#EEF5FF] border border-blue-100 shrink-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#2563EB] font-bold">Reality</p>
                  <p className="font-extrabold text-sm text-[#0B1F3A] leading-none mt-0.5">{college.realityScore}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px] text-neutral-500">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin size={11} className="text-neutral-400" />
                  {college.city}, {college.state}
                </span>
                <span className="text-neutral-300">·</span>
                <span className="font-medium text-[#2563EB] bg-blue-50 px-1.5 py-0.2 rounded text-[10px]">
                  {college.type}
                </span>
                <span className="text-neutral-300">·</span>
                <span>NAAC {college.naacGrade}</span>
              </div>
            </div>
          </div>

          {(matchPercent || admissionProb) && (
            <div className="mt-3.5 flex items-center gap-2 flex-wrap">
              {matchPercent && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF5FF] text-[#2563EB] text-xs font-semibold border border-blue-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span>{matchPercent}% Match</span>
                </div>
              )}
              {admissionProb && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/70">
                  <span>{admissionProb}% Admission Chance</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quantitative Metrics Bar */}
        <div>
          <div className="grid grid-cols-4 border-t border-neutral-100 bg-[#FAFAF8]/50">
            <div className="py-2.5 px-1.5 text-center border-r border-neutral-100">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Tuition</p>
              <p className="text-xs sm:text-sm font-bold text-[#0B1F3A] mt-0.5">₹{college.totalFees}L</p>
            </div>
            <div className="py-2.5 px-1.5 text-center border-r border-neutral-100">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Median</p>
              <p className="text-xs sm:text-sm font-bold text-[#0B1F3A] mt-0.5">{formatPackage(college.medianPackage)}</p>
            </div>
            <div className="py-2.5 px-1.5 text-center border-r border-neutral-100">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Placement</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">{college.placementPercent}%</p>
            </div>
            <div className="py-2.5 px-1.5 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">Rating</p>
              <p className="text-xs sm:text-sm font-bold text-[#0B1F3A] mt-0.5">{college.studentRating}</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center border-t border-neutral-100 divide-x divide-neutral-100">
            <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#2563EB] hover:bg-blue-50/50 transition-colors">
              <span>View Profile</span>
              <ChevronRight size={13} />
            </div>
            <button
              onClick={handleCompare}
              className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
                inCompare ? 'text-[#2563EB] bg-blue-50' : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
              }`}
              title="Compare college"
            >
              <GitCompare size={14} />
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
                isSaved ? 'text-[#0B1F3A] bg-neutral-100' : 'text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50'
              }`}
              title="Save to shortlist"
            >
              <Bookmark size={14} className={isSaved ? 'fill-[#0B1F3A] text-[#0B1F3A]' : ''} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
