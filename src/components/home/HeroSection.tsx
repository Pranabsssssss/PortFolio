"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { useLoading } from "@/components/ui/LoadingContext";

const HeroSection = () => {
  const { isAppLoading } = useLoading();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate={isAppLoading ? "hidden" : "visible"}
        variants={{
          hidden: { filter: "blur(10px)", opacity: 0, scale: 0.95 },
          visible: { filter: "blur(0px)", opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="z-10 max-w-4xl"
      >
        {/* Profile Image with Circular Frame */}
        <motion.div
          initial="hidden"
          animate={isAppLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-8 rounded-full z-20 group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 opacity-60 blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="absolute inset-0 rounded-full border border-purple-500/30 bg-black/50 z-10 overflow-hidden">
            <img
              src="/images/profile.png"
              alt="Pranab Saini"
              className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-700"
            />
          </div>
        </motion.div>

        <h1 className="flex flex-col items-center justify-center tracking-tighter mb-6 leading-tight relative z-30">
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-sans tracking-tight"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.9)'
            }}
          >
            Hey! I&apos;m
          </span>
          <span className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white mt-[-10px] md:mt-[-20px] font-medium tracking-tight">
            Pranab Saini
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl text-zinc-300 font-medium tracking-tight mb-8">
          Student Tech Founder & Innovator
        </h2>

        <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          I build the NextGen Stuff using Latest Technologies. Currently a Class 11 student at CM Shri Sec-10 Dwarka, turning complex ideas into functional technology.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Link href="/projects" className="group flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] text-lg">
            View Projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="group flex items-center justify-center gap-3 bg-transparent hover:bg-purple-600/10 border-2 border-purple-500/50 hover:border-purple-400 text-white px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto text-lg">
            Contact Me
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
