"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowRight } from "react-icons/fi";
import { FaXTwitter, FaRedditAlien } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[85vh] flex flex-col justify-center">

      <div className="grid md:grid-cols-2 gap-16">
        
        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-purple-600/10 via-zinc-900/50 to-zinc-900/30 border border-purple-500/20 rounded-3xl p-10 backdrop-blur-sm h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
              Don&apos;t be a <span className="text-purple-400">stranger</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 relative z-10">
              Ready to start your project? Let&apos;s build something legendary together!
            </p>
            <a
              href="mailto:i@pranab.tech"
              className="inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] text-lg relative z-10 group w-max"
            >
              Say Hello <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Social Links & Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col justify-center"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Social Networks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <a href="mailto:i@pranab.tech" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FiMail size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Email</span>
              </a>
              
              <a href="https://github.com/pranabsssssss" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FiGithub size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">GitHub</span>
              </a>
              
              <a href="https://x.com/pranabsaini1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FaXTwitter size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">X (Twitter)</span>
              </a>
              
              <a href="http://in.linkedin.com/in/pranab-saini-616386388" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FiLinkedin size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">LinkedIn</span>
              </a>
              
              <a href="https://instagram.com/pranab.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FiInstagram size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Instagram</span>
              </a>

              <a href="https://www.reddit.com/user/PranerSMG/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 hover:border-purple-600/30 rounded-2xl p-4 text-zinc-400 hover:text-purple-400 transition-all group">
                <FaRedditAlien size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Reddit</span>
              </a>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
