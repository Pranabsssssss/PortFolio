"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiAward } from "react-icons/fi";

import achievementsData from "@/data/achievements.json";
import { Achievement } from "@/types/models";

const allAchievements: Achievement[] = achievementsData as Achievement[];
const topAchievements = [...allAchievements].sort((a, b) => b.priority - a.priority).slice(0, 3);

const AchievementsPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Milestones & <span className="text-purple-400">Honors</span>
            </h2>
            <p className="text-zinc-400 max-w-xl">
              A growing collection of certifications, academic achievements, and competitive victories.
            </p>
          </motion.div>

          <Link href="/achievements" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group">
            View All
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAchievements.map((item, i) => (
            <Link key={item.id} href={`/achievements/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all group cursor-pointer h-full flex flex-col"
              >
                <div className="w-full h-48 bg-zinc-800 relative overflow-hidden">
                  {item.bannerImage ? (
                    <img src={item.bannerImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600"><FiAward size={32} /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-black/60 backdrop-blur-md text-zinc-300 rounded-full border border-zinc-700/50">
                    {item.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-1 mb-2">{item.subtitle}</p>
                  <span className="text-xs text-zinc-500">{item.date}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/achievements" className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group">
            View All Achievements
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AchievementsPreview;
