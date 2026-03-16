"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiAward } from "react-icons/fi";
import ImageSlider from "@/components/ui/ImageSlider";

import achievementsData from "@/data/achievements.json";
import { Achievement } from "@/types/models";

const allAchievements: Achievement[] = achievementsData as Achievement[];

// ─── SHARED ──────────────────────────────────────────────────────────

const MetaBadge = ({ item }: { item: Achievement }) => (
  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full font-semibold text-xs">{item.type}</span>
    <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full">{item.date}</span>
  </div>
);

// ─── 5 LAYOUT VARIANTS ──────────────────────────────────────────────

const Layout1 = ({ item }: { item: Achievement }) => (
  <div className="space-y-12">
    <div className="w-full h-[50vh] min-h-[400px] rounded-3xl overflow-hidden border border-zinc-800 relative">
      {item.bannerImage ? (
        <img src={item.bannerImage} alt={item.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600"><FiAward size={48} /></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <MetaBadge item={item} />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 mt-3 drop-shadow-lg">{item.name}</h1>
        <p className="text-xl text-zinc-300">{item.subtitle}</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      <p className="text-lg text-zinc-300 leading-relaxed">{item.description}</p>
      <ImageSlider images={item.complementaryImages} />
    </div>
  </div>
);

const Layout2 = ({ item }: { item: Achievement }) => (
  <div className="space-y-12">
    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[400px]">
      <div className="space-y-6">
        <MetaBadge item={item} />
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{item.name}</h1>
        <p className="text-xl text-purple-400 font-medium">{item.subtitle}</p>
        <p className="text-zinc-400 leading-relaxed">{item.description}</p>
      </div>
      <div className="h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
        {item.bannerImage ? (
          <img src={item.bannerImage} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600"><FiAward size={48} /></div>
        )}
      </div>
    </div>
    <ImageSlider images={item.complementaryImages} />
  </div>
);

const Layout3 = ({ item }: { item: Achievement }) => (
  <div className="space-y-12">
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <MetaBadge item={item} />
      <h1 className="text-5xl md:text-7xl font-bold text-white">{item.name}</h1>
      <p className="text-xl text-purple-400">{item.subtitle}</p>
    </div>
    <div className="w-full h-[50vh] min-h-[350px] rounded-3xl overflow-hidden border border-zinc-800">
      {item.bannerImage ? (
        <img src={item.bannerImage} alt={item.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600"><FiAward size={48} /></div>
      )}
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      <p className="text-lg text-zinc-300 leading-relaxed">{item.description}</p>
      <ImageSlider images={item.complementaryImages} />
    </div>
  </div>
);

const Layout4 = ({ item }: { item: Achievement }) => (
  <div className="space-y-12">
    <div className="relative rounded-3xl overflow-hidden border border-zinc-800 min-h-[500px] flex items-end">
      {item.bannerImage ? (
        <img src={item.bannerImage} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      <div className="relative z-10 p-8 md:p-12 space-y-4 max-w-3xl">
        <MetaBadge item={item} />
        <h1 className="text-4xl md:text-5xl font-bold text-white">{item.name}</h1>
        <p className="text-lg text-purple-300 font-medium">{item.subtitle}</p>
        <p className="text-zinc-300 leading-relaxed">{item.description}</p>
      </div>
    </div>
    <ImageSlider images={item.complementaryImages} />
  </div>
);

const Layout5 = ({ item }: { item: Achievement }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
        {item.bannerImage ? (
          <img src={item.bannerImage} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600"><FiAward size={48} /></div>
        )}
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center space-y-4">
        <MetaBadge item={item} />
        <h1 className="text-3xl font-bold text-white">{item.name}</h1>
        <p className="text-purple-400 font-medium">{item.subtitle}</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      <p className="text-lg text-zinc-300 leading-relaxed">{item.description}</p>
      <ImageSlider images={item.complementaryImages} />
    </div>
  </div>
);

const layouts = [Layout1, Layout2, Layout3, Layout4, Layout5];

// ─── PAGE ────────────────────────────────────────────────────────────

export default function AchievementDetailPage() {
  const { slug } = useParams();
  const item = allAchievements.find(a => a.id === slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const LayoutComponent = useMemo(() => layouts[Math.floor(Math.random() * layouts.length)], []);

  if (!mounted) return null; // Avoids hydration mismatch between SSR and client

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Achievement Not Found</h1>
        <p className="text-zinc-400 mb-8">The achievement you are looking for does not exist.</p>
        <Link href="/achievements" className="text-purple-400 hover:text-purple-300 transition-colors">← Back to Achievements</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/achievements" className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Achievements
      </Link>
      <LayoutComponent item={item} />
    </motion.div>
  );
}
