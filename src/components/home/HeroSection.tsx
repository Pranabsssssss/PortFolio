"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLoading } from "@/components/ui/LoadingContext";

const HeroSection = () => {
  const { isAppLoading } = useLoading();

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVariants: any = {
    initial: { y: "100%" },
    animate: (i: number) => ({
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.5 + (i * 0.03), 
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate={isAppLoading ? "initial" : "animate"}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    ));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isAppLoading ? "hidden" : "visible"}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          
          {/* Main Content Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-[0.2em]">
                Student Tech Founder & Innovator
              </span>
            </motion.div>

            <h1 className="flex flex-col mb-8 pointer-events-none w-full">
              <span className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-zinc-500/20">
                {splitText("BUILDING THE")}
              </span>
              <span className="text-5xl md:text-9xl lg:text-[11rem] font-serif italic text-white leading-[0.85] tracking-tight md:-ml-2">
                Future.
              </span>
              <span className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-purple-400/80 mt-2">
                {splitText("BIT BY BIT")}
              </span>
            </h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-10">
              Transforming complex ideas into functional, real-world technology. Specializing in the intersection of <span className="text-white font-medium">Artificial Intelligence</span>, <span className="text-white font-medium">Robotics</span>, and <span className="text-white font-medium">IoT</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 items-center">
              <Link href="/projects" className="group relative flex items-center gap-3 overflow-hidden bg-white text-black px-10 py-4 rounded-xl font-black transition-transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                VIEW PROJECTS
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/contact" className="group flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all">
                Let&apos;s talk
                <motion.span
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  👋
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Abstract Visual Side */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              variants={itemVariants}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
            >
              {/* Spinning Decorative Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20%] border-2 border-dashed border-purple-500/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10%] border border-cyan-500/10 rounded-full"
              />
              
              {/* Profile Wrapper */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img
                  src="/images/profile.png"
                  alt="Pranab Saini"
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-125"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-2xl font-serif italic text-white leading-none mb-1">Pranab Saini</h3>
                  <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase opacity-70">Innovator & Founder</p>
                </div>
              </div>

              {/* Floaties */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 md:-top-10 md:-right-10 p-3 md:p-6 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl z-30 shadow-2xl"
              >
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <span className="text-[8px] md:text-xs text-zinc-500 font-bold tracking-widest uppercase">Current Status</span>
                  <span className="text-white font-serif italic text-sm md:text-xl">Founder @ CM Shri</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />

    </section>
  );
};

export default HeroSection;
