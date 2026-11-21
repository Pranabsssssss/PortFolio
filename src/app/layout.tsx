import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/ui/ParticleBackground";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import TopLoader from "@/components/ui/TopLoader";
import { LoadingProvider } from "@/components/ui/LoadingContext";
import ScrollLock from "@/components/ui/ScrollLock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifFont = Bodoni_Moda({
  variable: "--font-serif-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pranab.space"),
  title: "Pranab Saini | Student Tech Founder",
  description: "Portfolio of Pranab Saini, a Student Tech Founder building AI, Robotics, and IoT systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${serifFont.variable} antialiased bg-[#09090b] text-zinc-50 min-h-screen flex flex-col`}
      >
        <LoadingProvider>
          <ScrollLock />
          <TopLoader />
          <Preloader />
          <SmoothScrolling>
            <CustomCursor />
            <ParticleBackground />
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </SmoothScrolling>
        </LoadingProvider>
      </body>
    </html>
  );
}
