"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutPreview = () => {
  const principles = [
    { title: "Technical Excellence", desc: "Pushing limits in AI and hardware integration." },
    { title: "User-First Ethos", desc: "Creating interfaces that feel invisible and intuitive." },
    { title: "Rapid Innovation", desc: "Turning complex theory into working prototypes in weeks." },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#09090b]">
      {/* Background grain/texture effect would go here if we had a utility */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Left Side: Large Editorial Title */}
          <div className="static lg:sticky lg:top-32 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-8">
                Architecting <br />
                <span className="text-zinc-500/30">the Next</span> <br />
                <span className="text-white font-serif italic lg:pr-4">Innovation.</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-transparent mb-12" />

              <div className="space-y-6 max-w-sm text-left">
                {principles.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex flex-col gap-1 border-l-2 border-zinc-800 pl-6 py-1 hover:border-purple-500 transition-colors"
                  >
                    <span className="text-white font-bold text-sm tracking-wider uppercase">{p.title}</span>
                    <span className="text-zinc-500 text-sm leading-tight">{p.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Narrative & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <p className="text-xl md:text-3xl text-zinc-300 font-light leading-relaxed text-center lg:text-left">
              I am a student developer deeply passionate about the intersection of <span className="text-white underline decoration-purple-600/50 underline-offset-8">software and hardware.</span>
            </p>

            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed text-center lg:text-left">
              <p>
                Currently in Class 11, I spend my time exploring the cutting edge of artificial intelligence, electrical engineering, robotics, and complex IoT ecosystems.
              </p>
              <p>
                My philosophy is simple: code should not just live on a screen—it should interact with the physical world. I build systems that solve real problems, from AI-driven automation to custom-engineered robotics.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-8">
               <Link 
                href="/about" 
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-purple-500/30 bg-purple-500/10 px-8 font-bold text-purple-300 shadow-2xl transition-all duration-300 hover:bg-purple-500 hover:text-white"
               >
                  <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-xs">
                    Get to know me
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
               </Link>

               <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
                  <span className="text-white font-black text-2xl leading-none">50+</span>
                  <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Projects Built</span>
               </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
