'use client';

import Link from 'next/link';
import { Sparkles, Globe, Rss, Mail, ExternalLink } from 'lucide-react';

const FOOTER_LINKS = {
  'Explore': [
    { label: 'Find Colleges', href: '/colleges' },
    { label: 'AI College Finder', href: '/ai-college-finder' },
    { label: 'Rankings', href: '/rankings' },
    { label: 'Compare Colleges', href: '/compare' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
  ],
  'Resources': [
    { label: 'Admissions & Deadlines', href: '/admissions' },
    { label: 'Entrance Exams Calendar', href: '/exams' },
    { label: 'Admission Probability', href: '/admission-probability' },
    { label: 'Student Reviews', href: '/reviews' },
  ],
  'Company': [
    { label: 'How It Works (AI)', href: '/ai-college-finder' },
    { label: 'For Colleges', href: '/college/dashboard' },
    { label: 'Super Admin Portal', href: '/admin/dashboard' },
    { label: 'Data Verification Queue', href: '/admin/verification' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f1b2d] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">CollegeIQ</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India&apos;s most transparent college discovery platform. Find. Verify. Compare. Decide.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              All data is verified by our research team. Platform data is for informational purposes only.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Globe, Rss, Mail, ExternalLink].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 CollegeIQ. All rights reserved. This is a prototype for demonstration purposes.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Data Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
