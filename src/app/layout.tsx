import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/components/ui/Toast";
import SavedDrawer from "@/components/saved/SavedDrawer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CollegeIQ — College Discovery & Decision Platform",
  description:
    "Describe the college you want in plain words. CollegeIQ interprets it, matches colleges, and helps you shortlist, compare and decide.",
  keywords: "college search india, best engineering colleges, MBA colleges, JEE colleges, AI college finder, college comparison",
  openGraph: {
    title: "CollegeIQ — Find. Verify. Compare. Decide.",
    description: "A college discovery and decision platform. Prototype with demonstration data.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <AppProvider>
          <ToastProvider>
            {children}
            <SavedDrawer />
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
