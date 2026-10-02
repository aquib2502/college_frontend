'use client';

import { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroDiscovery from '@/components/home/HeroDiscovery';
import TrustStrip from '@/components/home/TrustStrip';
import TopColleges from '@/components/home/TopColleges';
import Matcher, { type MatcherHandle } from '@/components/home/Matcher';
import SpecializationExplorer from '@/components/home/SpecializationExplorer';
import SentimentSection from '@/components/home/SentimentSection';
import VerifySection from '@/components/home/VerifySection';
import AdmissionsPreview from '@/components/home/AdmissionsPreview';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  const matcher = useRef<MatcherHandle>(null);

  function seeAll(query: string) {
    matcher.current?.run(query);
    document.getElementById('matcher')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function startSearch() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => document.getElementById('hero-q')?.focus({ preventScroll: true }), 450);
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <HeroDiscovery onSeeAll={seeAll} />
        <TrustStrip />
        <TopColleges />
        <Matcher ref={matcher} />
        <SpecializationExplorer />
        <SentimentSection />
        <VerifySection />
        <AdmissionsPreview />
        <FinalCTA onStart={startSearch} />
      </main>
      <Footer />
    </div>
  );
}
