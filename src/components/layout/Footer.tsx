"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { FaXTwitter, FaRedditAlien } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-white/5 bg-[#09090b]/80 backdrop-blur-xl pt-12 pb-8 mt-20 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-center md:text-left max-w-xs">
              Student Tech Founder building the future with AI, Robotics, and IoT systems.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/pranabsssssss" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FiGithub size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://x.com/pranabsaini1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FaXTwitter size={20} />
              <span className="sr-only">X (Twitter)</span>
            </a>
            <a href="http://in.linkedin.com/in/pranab-saini-616386388" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FiLinkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://instagram.com/pranab.tech" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FiInstagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="mailto:i@pranab.tech" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FiMail size={20} />
              <span className="sr-only">Email</span>
            </a>
            <a href="https://www.reddit.com/user/PranerSMG/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 hover:text-purple-400 transition-colors">
              <FaRedditAlien size={20} />
              <span className="sr-only">Reddit</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Pranab Saini. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
            <a href="https://blog.pranab.tech" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Blog</a>
            <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
