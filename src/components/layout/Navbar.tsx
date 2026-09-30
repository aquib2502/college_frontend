'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bookmark, ChevronDown, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import RoleSwitcher from './RoleSwitcher';
import CommandPalette from './CommandPalette';

const NAV_LINKS = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Courses', href: '/courses' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Compare', href: '/compare' },
  { label: 'Reviews', href: '/reviews' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { savedColleges, role } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  const roleDisplayNames: Record<string, string> = {
    student: 'Student',
    college: 'College Admin',
    admin: 'Super Admin',
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Wordmark Logo */}
            <div className="flex items-center gap-10 lg:gap-12">
              <Link
                href="/"
                className="text-[19px] font-bold tracking-[-0.03em] text-[#0B1F3A] flex items-center gap-2 group"
              >
                <span>College<span className="text-[#2563EB]">IQ</span></span>
              </Link>

              {/* Primary Navigation */}
              <nav className="hidden md:flex items-center gap-7">
                {NAV_LINKS.map(link => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-[13px] tracking-[-0.01em] transition-colors relative py-1 ${
                        active
                          ? 'text-[#0B1F3A] font-semibold'
                          : 'text-[#555f71] hover:text-[#0B1F3A]'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}

                {/* AI Finder Destination with restrained blue treatment */}
                <Link
                  href="/ai-college-finder"
                  className="text-[13px] font-semibold tracking-[-0.01em] text-[#2563EB] bg-[#EEF4FF] hover:bg-blue-100 border border-blue-200/70 px-3 py-1 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                  AI Finder
                </Link>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Quick Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 text-[13px] text-[#555f71] hover:text-[#090d16] transition-colors cursor-pointer"
                title="Search (⌘K)"
              >
                <Search size={14} strokeWidth={1.75} />
                <span>Search</span>
                <span className="text-[11px] font-mono text-[#8a94a6] border border-neutral-200/90 rounded px-1.5 py-0.5 ml-0.5">
                  ⌘K
                </span>
              </button>

              {/* Saved list */}
              <Link
                href="/student/saved"
                className="flex items-center gap-1.5 text-[13px] text-[#555f71] hover:text-[#090d16] transition-colors"
                title="Saved Shortlist"
              >
                <Bookmark size={14} strokeWidth={1.75} />
                <span>Saved</span>
                {savedColleges.length > 0 && (
                  <span className="text-[11px] font-semibold text-[#090d16]">
                    ({savedColleges.length})
                  </span>
                )}
              </Link>

              {/* Role Indicator / Switcher */}
              <button
                onClick={() => setShowRoleSwitcher(true)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#090d16] hover:text-[#1a56db] transition-colors cursor-pointer py-1 px-2 -mr-2 rounded-md hover:bg-neutral-100/60"
              >
                <span>{roleDisplayNames[role] || 'Student'}</span>
                <ChevronDown size={12} strokeWidth={2} className="text-[#8a94a6]" />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-1.5 text-[#090d16] -mr-1.5"
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="md:hidden border-b border-neutral-200 bg-[#fbfbfd] px-6 py-5 space-y-3"
            >
              <div className="flex flex-col space-y-2.5">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-[#090d16] py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs text-[#555f71]">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-1.5 py-1 text-[#090d16]"
                >
                  <Search size={14} /> Search
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowRoleSwitcher(true);
                  }}
                  className="font-medium text-[#090d16]"
                >
                  Role: {roleDisplayNames[role]}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Command Palette & Role Switcher */}
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <RoleSwitcher open={showRoleSwitcher} onClose={() => setShowRoleSwitcher(false)} />
    </>
  );
}
