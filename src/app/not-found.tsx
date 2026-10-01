import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-24 sm:py-32">
        <p className="label">404 · Not found</p>
        <h1 className="font-display mt-4 text-5xl sm:text-7xl font-semibold tracking-[-0.035em] leading-[0.95] max-w-3xl">
          This page isn&apos;t on the shortlist.
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl">
          The link may be old, or the college isn&apos;t in our demo dataset yet. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/" className="h-11 px-5 rounded-xl bg-ink text-paper text-sm inline-flex items-center hover:bg-accent transition-colors">
            Ask CollegeIQ
          </Link>
          <Link href="/colleges" className="h-11 px-5 rounded-xl border border-line bg-surface text-sm inline-flex items-center hover:border-ink-2 transition-colors">
            Browse colleges
          </Link>
          <Link href="/rankings" className="h-11 px-5 rounded-xl border border-line bg-surface text-sm inline-flex items-center hover:border-ink-2 transition-colors">
            See rankings
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
