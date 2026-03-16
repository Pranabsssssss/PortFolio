"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiHeart, FiMail, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter, FaRedditAlien } from "react-icons/fa6";

const SupportContactPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full bg-gradient-to-br from-purple-950/40 to-zinc-900/40 p-10 rounded-3xl border border-purple-900/50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-14 h-14 bg-purple-600/20 text-purple-400 rounded-2xl flex justify-center items-center mb-6">
              <FiHeart size={28} />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Support My Work</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
              Building hardware prototypes and hosting AI models requires resources. If you find my projects valuable or want to support a young builder, consider buying me a coffee!
            </p>
            
            <Link href="/support" className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-400 text-black px-8 py-3.5 rounded-full font-semibold transition-all w-full sm:w-auto shadow-[0_0_15px_rgba(0,168,85,247,0.2)]">
              Support via UPI / Coffee
            </Link>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full bg-zinc-900/40 p-10 rounded-3xl border border-zinc-800/50 relative"
          >
            <div className="w-14 h-14 bg-zinc-800 text-zinc-300 rounded-2xl flex justify-center items-center mb-6">
              <FiMail size={28} />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Whether you want to discuss a project block, talk about tech, or explore collaboration opportunities, my inbox is always open.
            </p>
            
            <div className="grid grid-cols-3 gap-3 mt-auto">
              <a href="mailto:i@pranab.tech" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FiMail /> Email
              </a>
              <a href="http://in.linkedin.com/in/pranab-saini-616386388" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FiLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/pranabsssssss" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FiGithub /> GitHub
              </a>
              <a href="https://x.com/pranabsaini1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FaXTwitter /> X
              </a>
              <a href="https://instagram.com/pranab.tech" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FiInstagram /> Instagram
              </a>
              <a href="https://www.reddit.com/user/PranerSMG/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition-colors text-sm font-medium">
                <FaRedditAlien /> Reddit
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SupportContactPreview;
