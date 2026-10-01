'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroDiscovery from '@/components/home/HeroDiscovery';
import TrustStrip from '@/components/home/TrustStrip';
import TopColleges from '@/components/home/TopColleges';
import Matcher from '@/components/home/Matcher';
import SpecializationExplorer from '@/components/home/SpecializationExplorer';
import SentimentSection from '@/components/home/SentimentSection';
import VerifySection from '@/components/home/VerifySection';
import HowItWorks from '@/components/home/HowItWorks';
import AdmissionsPreview from '@/components/home/AdmissionsPreview';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  const [handoff, setHandoff] = useState<{ query: string; nonce: number }>();

  function seeAll(query: string) {
    setHandoff({ query, nonce: Date.now() });
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
        <Matcher incoming={handoff} />
        <SpecializationExplorer />
        <SentimentSection />
        <VerifySection />
        <HowItWorks />
        <AdmissionsPreview />
        <FinalCTA onStart={startSearch} />
      </main>
      <Footer />
    </div>
  );
}
