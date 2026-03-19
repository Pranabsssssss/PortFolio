"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import achievementsData from "@/data/achievements.json";
import { Achievement } from "@/types/models";

const allAchievements: Achievement[] = achievementsData as Achievement[];
const topAchievements = [...allAchievements].sort((a, b) => b.priority - a.priority).slice(0, 3);

const AchievementCard = ({ item, index }: { item: Achievement, index: number }) => {
  return (
    <Link href={`/achievements/${item.id}`} className="group relative block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative h-full overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/10 backdrop-blur-md group-hover:border-purple-500/30 transition-all duration-500 flex flex-col"
        style={{ willChange: "transform" }}
      >
        {/* Immersive Image Header */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
          {item.bannerImage ? (
            <img 
              src={item.bannerImage} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
               <span className="text-xs font-bold tracking-widest uppercase opacity-20 italic">No Visual</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]">
               {item.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pb-10 flex flex-col flex-grow">
          <div className="mb-6">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-2 block">
              {item.date}
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">
              {item.name}
            </h3>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
            {item.subtitle}
          </p>

          <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Full Recognition</span>
             <FiArrowRight className="text-purple-500 group-hover:translate-x-2 transition-transform h-3 w-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const AchievementsPreview = () => {
  return (
    <section className="py-32 relative bg-[#09090b]">
      {/* Decorative vertical line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-gradient-to-t from-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-end mb-20 text-left">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
               Milestones <br />
               <span className="text-zinc-500/20 font-sans tracking-tight">& Honors</span>
             </h2>
             <div className="w-16 h-1 bg-purple-500" />
           </motion.div>

           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                A non-exhaustive list of professional recognitions and competitive victories that define my technical journey.
              </p>
              <Link href="/achievements" className="group flex items-center gap-4 text-white text-xs font-bold uppercase tracking-widest hover:text-purple-400 transition-all border-b border-zinc-800 pb-2">
                All Achievements
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topAchievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsPreview;
