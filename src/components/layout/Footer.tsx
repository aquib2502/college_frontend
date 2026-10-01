import Link from 'next/link';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Find Colleges', href: '/colleges' },
    { label: 'AI College Finder', href: '/ai-college-finder' },
    { label: 'Rankings', href: '/rankings' },
    { label: 'Compare Colleges', href: '/compare' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
  ],
  Resources: [
    { label: 'Admissions & Deadlines', href: '/admissions' },
    { label: 'Entrance Exams Calendar', href: '/exams' },
    { label: 'Admission Probability', href: '/admission-probability' },
    { label: 'Student Reviews', href: '/reviews' },
  ],
  Company: [
    { label: 'How It Works', href: '/ai-college-finder' },
    { label: 'For Colleges', href: '/college/dashboard' },
    { label: 'Super Admin Portal', href: '/admin/dashboard' },
    { label: 'Data Verification Queue', href: '/admin/verification' },
  ],
};

const WORDS = ['Find.', 'Verify.', 'Compare.', 'Decide.'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-[#e9e7e1]">
      {/* Faint data lines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none" viewBox="0 0 1200 600">
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${120 + i * 48} C 300 ${80 + i * 52}, 600 ${180 + i * 40}, 1200 ${100 + i * 50}`}
            fill="none"
            stroke={i === 4 ? '#2b4fe0' : '#3a3f47'}
            strokeWidth={i === 4 ? 1.2 : 0.7}
          />
        ))}
      </svg>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <ul className="font-display text-[2.6rem] sm:text-6xl font-semibold leading-[0.98] tracking-[-0.022em]">
              {WORDS.map((w, i) => (
                <li key={w} className={i === WORDS.length - 1 ? 'text-white' : 'text-[#5b6069]'}>
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8a8f98] mb-4">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-[#c9c6bf] hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 select-none" aria-hidden>
          <p className="font-display font-semibold tracking-[-0.06em] leading-[0.8] text-[22vw] lg:text-[15.5rem] text-white/[0.06]">
            CollegeIQ
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-xs text-[#8a8f98]">
          <p>© 2026 CollegeIQ. A prototype for demonstration purposes — figures shown are demo data.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Data Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
