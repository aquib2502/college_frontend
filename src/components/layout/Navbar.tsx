'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bookmark, ChevronDown, Menu, X, Compass, GitCompare, CalendarClock, UserRound } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import RoleSwitcher from './RoleSwitcher';
import CommandPalette from './CommandPalette';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Discover', href: '/colleges' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Compare', href: '/compare' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Admissions', href: '/admissions' },
];

const RESOURCES = [
  { label: 'AI College Finder', href: '/ai-college-finder', desc: 'Describe what you want, get matches' },
  { label: 'Courses', href: '/courses', desc: 'Programs, fees and outcomes' },
  { label: 'Entrance Exams', href: '/exams', desc: 'Exam calendar and patterns' },
  { label: 'ROI Calculator', href: '/roi-calculator', desc: 'Payback on total cost' },
  { label: 'Admission Probability', href: '/admission-probability', desc: 'Your odds by rank' },
];

const ROLE_NAMES: Record<string, string> = {
  student: 'Student',
  college: 'College Admin',
  admin: 'Super Admin',
};

export default function Navbar() {
  const pathname = usePathname();
  const { savedColleges, role, setSavedOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') setResourcesOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) setResourcesOpen(false);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  // Close menus when the route changes (adjusting state during render, not in an effect).
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    setMobileOpen(false);
    setResourcesOpen(false);
  }

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));
  const resourcesActive = RESOURCES.some(r => isActive(r.href));

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled ? 'bg-paper/90 backdrop-blur-md border-line' : 'bg-paper/0 border-transparent',
        )}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div
            className={cn(
              'flex items-center justify-between transition-[height] duration-300 ease-out',
              scrolled ? 'h-14' : 'h-16 sm:h-[72px]',
            )}
          >
            <div className="flex items-center gap-8 lg:gap-10">
              <Link href="/" className="flex items-baseline gap-[1px] text-ink" aria-label="CollegeIQ home">
                <span className="font-display text-[21px] font-semibold tracking-[-0.03em]">College</span>
                <span className="font-mono text-[15px] font-semibold text-accent translate-y-[-1px]">IQ</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
                {NAV_LINKS.map(link => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative px-3 py-2 text-[13.5px] tracking-[-0.005em] rounded-md transition-colors',
                        active ? 'text-ink font-medium' : 'text-muted hover:text-ink',
                      )}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                        />
                      )}
                    </Link>
                  );
                })}

                <div ref={resourcesRef} className="relative">
                  <button
                    onClick={() => setResourcesOpen(o => !o)}
                    aria-expanded={resourcesOpen}
                    aria-haspopup="true"
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-[13.5px] rounded-md transition-colors cursor-pointer',
                      resourcesActive || resourcesOpen ? 'text-ink font-medium' : 'text-muted hover:text-ink',
                    )}
                  >
                    Resources
                    <ChevronDown size={13} className={cn('transition-transform duration-200', resourcesOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full mt-2 w-[300px] rounded-xl border border-line bg-surface p-1.5 shadow-[0_18px_40px_-18px_rgba(18,20,23,0.25)]"
                      >
                        {RESOURCES.map(r => (
                          <Link
                            key={r.href}
                            href={r.href}
                            className="block rounded-lg px-3 py-2.5 hover:bg-paper transition-colors"
                          >
                            <span className="block text-[13.5px] font-medium text-ink">{r.label}</span>
                            <span className="block text-xs text-muted mt-0.5">{r.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 h-9 pl-3 pr-2 rounded-lg border border-line bg-surface/70 text-[13px] text-muted hover:text-ink hover:border-line-2 transition-colors cursor-pointer"
                aria-label="Search (Ctrl+K)"
              >
                <Search size={14} strokeWidth={1.8} />
                <span className="hidden lg:inline">Search colleges</span>
                <kbd className="font-mono text-[10px] text-faint border border-line rounded px-1.5 py-0.5">⌘K</kbd>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ink cursor-pointer"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              <button
                onClick={() => setSavedOpen(true)}
                className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-lg text-[13px] text-ink-2 hover:text-ink hover:bg-paper-2 transition-colors cursor-pointer"
                aria-label={`Saved colleges (${savedColleges.length})`}
              >
                <Bookmark size={14} strokeWidth={1.8} />
                Saved
                <span className="font-mono text-[11px] min-w-5 h-5 px-1 rounded-md bg-ink text-paper inline-flex items-center justify-center nums">
                  {savedColleges.length}
                </span>
              </button>

              <button
                onClick={() => setShowRoleSwitcher(true)}
                className="hidden md:flex items-center gap-2 h-9 pl-1 pr-2.5 rounded-lg text-[13px] text-ink-2 hover:bg-paper-2 transition-colors cursor-pointer"
              >
                <span className="w-7 h-7 rounded-md bg-paper-2 border border-line flex items-center justify-center">
                  <UserRound size={14} />
                </span>
                {ROLE_NAMES[role] ?? 'Student'}
                <ChevronDown size={12} className="text-faint" />
              </button>

              <button
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-ink cursor-pointer"
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden border-t border-line bg-paper"
            >
              <div className="px-4 py-4 grid grid-cols-2 gap-x-4">
                {[...NAV_LINKS, ...RESOURCES].map(link => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className={cn('py-2.5 text-[15px] border-b border-line/70', isActive(link.href) ? 'text-accent font-medium' : 'text-ink')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowRoleSwitcher(true);
                  }}
                  className="text-sm text-muted"
                >
                  Viewing as <span className="text-ink font-medium">{ROLE_NAMES[role]}</span> · Switch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileTabBar
        isActive={isActive}
        savedCount={savedColleges.length}
        onSaved={() => setSavedOpen(true)}
      />

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <RoleSwitcher open={showRoleSwitcher} onClose={() => setShowRoleSwitcher(false)} />
    </>
  );
}

function MobileTabBar({
  isActive,
  savedCount,
  onSaved,
}: {
  isActive: (href: string) => boolean;
  savedCount: number;
  onSaved: () => void;
}) {
  const item = 'flex-1 flex flex-col items-center justify-center gap-1 text-[10.5px] font-medium';
  const tabs = [
    { label: 'Discover', href: '/colleges', icon: Compass },
    { label: 'Compare', href: '/compare', icon: GitCompare },
    { label: 'Admissions', href: '/admissions', icon: CalendarClock },
    { label: 'Profile', href: '/student/profile', icon: UserRound },
  ];
  return (
    <nav
      aria-label="Mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-md border-t border-line"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="h-16 flex">
        {tabs.slice(0, 2).map(t => (
          <Link key={t.href} href={t.href} className={cn(item, isActive(t.href) ? 'text-accent' : 'text-muted')}>
            <t.icon size={19} strokeWidth={1.8} />
            {t.label}
          </Link>
        ))}
        <button onClick={onSaved} className={cn(item, 'text-muted relative cursor-pointer')}>
          <span className="relative">
            <Bookmark size={19} strokeWidth={1.8} />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-accent text-white text-[9px] font-mono flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </span>
          Saved
        </button>
        {tabs.slice(2).map(t => (
          <Link key={t.href} href={t.href} className={cn(item, isActive(t.href) ? 'text-accent' : 'text-muted')}>
            <t.icon size={19} strokeWidth={1.8} />
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
