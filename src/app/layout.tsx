import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/components/ui/Toast";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CollegeIQ — AI-Powered College Discovery & Decision Portal",
  description:
    "Find the college that's actually right for you. Verified data, AI matching, transparent rankings, ROI calculator and admission probability — all in one platform.",
  keywords: "college search india, best engineering colleges, MBA colleges, JEE colleges, AI college finder, college comparison",
  openGraph: {
    title: "CollegeIQ — Find. Verify. Compare. Decide.",
    description: "India's most transparent AI-powered college discovery platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-[#f8f9fb] text-[#0f172a]">
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
