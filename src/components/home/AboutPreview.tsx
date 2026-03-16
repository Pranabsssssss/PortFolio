"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 hidden md:block">
              Architecting <span className="text-purple-400">ideas</span> into reality
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6 md:hidden">
               Who am I?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6 text-lg">
              I am a student developer deeply passionate about the intersection of software and hardware. Currently in Class 11, I spend my time exploring artificial intelligence, electrical engineering, robotics, and IoT systems.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
              My goal isn&apos;t just to write code—it&apos;s to build tangible, real-world technology projects that solve complex problems and push the boundaries of what&apos;s possible for young founders.
            </p>

            <Link href="/about" className="inline-flex items-center gap-2 text-purple-400 font-medium hover:text-cyan-300 transition-colors group">
              Read More About Me
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
