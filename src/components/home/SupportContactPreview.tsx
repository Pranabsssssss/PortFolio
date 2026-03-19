"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiHeart } from "react-icons/fi";
import { FaXTwitter, FaRedditAlien } from "react-icons/fa6";

const SupportContactPreview = () => {
  const socials = [
    { icon: <FiMail />, name: "Email", href: "mailto:i@pranab.tech" },
    { icon: <FiLinkedin />, name: "LinkedIn", href: "http://in.linkedin.com/in/pranab-saini-616386388" },
    { icon: <FiGithub />, name: "GitHub", href: "https://github.com/pranabsssssss" },
    { icon: <FaXTwitter />, name: "X", href: "https://x.com/pranabsaini1" },
    { icon: <FiInstagram />, name: "Instagram", href: "https://instagram.com/pranab.tech" },
    { icon: <FaRedditAlien />, name: "Reddit", href: "https://www.reddit.com/user/PranerSMG/" },
  ];

  return (
    <section className="py-40 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-purple-400 mb-8"
          >
            <FiMail size={32} />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Let&apos;s build <br />
            <span className="font-serif italic text-white">Something Real.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-xl md:text-2xl leading-relaxed mb-12"
          >
            Whether you&apos;re looking to collaborate on a high-impact project or just want to talk about the future of tech, my inbox is always open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
             <a 
              href="mailto:i@pranab.tech" 
              className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
             >
                Send an Email
             </a>
             <Link 
              href="/support" 
              className="px-12 py-5 border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3"
             >
                <FiHeart className="text-purple-500" />
                Support My Work
             </Link>
          </motion.div>
        </div>

        {/* Professional Social Grid */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800/20 border border-zinc-800/20 rounded-[2.5rem] overflow-hidden"
        >
            {socials.map((social, i) => (
                <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-10 bg-[#09090b] hover:bg-zinc-900 transition-colors group"
                >
                    <span className="text-zinc-500 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-2xl mb-4">
                        {social.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        {social.name}
                    </span>
                </a>
            ))}
        </motion.div>

        {/* Footer Accent */}
        <div className="mt-20 flex justify-center opacity-20">
           <div className="w-px h-24 bg-gradient-to-b from-purple-500 to-transparent" />
        </div>

      </div>
    </section>
  );
};

export default SupportContactPreview;
