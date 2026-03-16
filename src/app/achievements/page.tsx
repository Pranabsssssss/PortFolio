"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiAward } from "react-icons/fi";

import achievementsData from "@/data/achievements.json";
import { Achievement } from "@/types/models";

const achievements: Achievement[] = (achievementsData as Achievement[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Milestones & <span className="text-purple-400">Honors</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          A timeline of my academic progress, certifications, and competitive achievements.
        </p>
      </motion.div>

      {/* Achievements Grid — Simplified Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, i) => (
          <Link key={item.id} href={`/achievements/${item.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all group cursor-pointer h-full flex flex-col"
            >
              {/* Banner Image */}
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

              {/* Text */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-1 mb-2">
                  {item.subtitle}
                </p>
                <span className="text-xs text-zinc-500 mt-auto">{item.date}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          No achievements yet. Add some from the admin panel!
        </div>
      )}
    </div>
  );
}
