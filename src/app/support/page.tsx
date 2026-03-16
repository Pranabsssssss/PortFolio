"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCoffee, FiHeart } from "react-icons/fi";

// Note: Replace with actual UPI QR Code Image in your public folder in production
const upiId = "pranabs@fam";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[80vh] flex flex-col items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-purple-600/10 text-purple-400 rounded-3xl mx-auto flex justify-center items-center mb-8 border border-purple-600/20 shadow-[0_0_30px_rgba(0,168,85,247,0.15)]">
          <FiCoffee size={40} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Support My <span className="text-purple-400">Work</span>
        </h1>
        
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Building hardware prototypes, training AI models, and hosting servers takes time and resources. 
          If you find my projects cool, consider fueling the next one!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-12 w-full max-w-lg text-center backdrop-blur-sm relative overflow-hidden"
      >
        {/* Glow behind QR */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-[60px] pointer-events-none" />

        <h2 className="text-2xl font-bold text-white mb-8">Scan to Support via UPI</h2>
        
        {/* Placeholder for QR Code */}
        <div className="w-48 h-48 bg-white mx-auto rounded-2xl mb-8 p-4 flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="text-zinc-900 font-bold mb-2">SCAN ME</div>
            <div className="w-32 h-32 border-4 border-dashed border-zinc-300 rounded-lg flex items-center justify-center text-zinc-400 text-xs">
              [QR Code]
            </div>
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
          <div className="text-sm text-zinc-400 mb-1">UPI ID</div>
          <div className="font-mono text-purple-400 tracking-wider font-semibold">
            {upiId}
          </div>
        </div>

        <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
          Thank you for supporting a young founder <FiHeart className="text-purple-600" />
        </p>

      </motion.div>

    </div>
  );
}
