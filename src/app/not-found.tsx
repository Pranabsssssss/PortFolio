"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glitch lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-purple-500/20 w-full"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative mb-8"
        >
          <span className="text-[12rem] md:text-[16rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-900 select-none block">
            404
          </span>
          <motion.span
            className="absolute inset-0 text-[12rem] md:text-[16rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-purple-500 to-purple-800 select-none block"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Lost in the <span className="text-purple-400">void</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-400 text-lg mb-10 max-w-md mx-auto"
        >
          The page you&#39;re looking for has drifted into another dimension. Let&#39;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
          >
            <FiHome size={18} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors border border-zinc-700"
          >
            <FiArrowLeft size={18} /> Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
