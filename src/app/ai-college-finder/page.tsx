'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import Matcher from '@/components/home/Matcher';
import { STUDENT_PROFILE } from '@/lib/mockData';

function FinderContent() {
  const q = useSearchParams().get('q') ?? undefined;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <PageHeader
        label="College finder"
        title="Describe it. We'll find it."
        description="Write what you want in plain words — course, place, budget, placements, hostel. We turn it into criteria you can edit, then match colleges against them."
      >
        <p className="mt-6 text-sm text-muted">
          Fit and admission chance use the demo profile ({STUDENT_PROFILE.course}, {STUDENT_PROFILE.exam} {STUDENT_PROFILE.percentile} percentile,{' '}
          {STUDENT_PROFILE.location}).{' '}
          <Link href="/student/profile" className="text-accent hover:underline">Edit profile</Link>
        </p>
      </PageHeader>
      <Matcher key={q ?? 'default'} variant="page" initialQuery={q} showFit />
      <Footer />
    </div>
  );
}

export default function AIFinderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <FinderContent />
    </Suspense>
  );
}
