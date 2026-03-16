"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const recentPosts = [
  {
    title: "Building an Autonomous Rover with Raspberry Pi",
    excerpt: "A deep dive into how I used OpenCV and TensorFlow to give my 4-wheeled robot the ability to navigate complex terrain.",
    date: "Oct 12, 2024",
    slug: "autonomous-rover-raspberry-pi"
  },
  {
    title: "Why High School Students Should Learn IoT",
    excerpt: "Internet of Things bridges the digital and physical worlds. Here is why starting early can give you a massive advantage in engineering.",
    date: "Sep 28, 2024",
    slug: "why-students-should-learn-iot"
  },
  {
    title: "My Setup: Coding and Hardware Workbench",
    excerpt: "A look at the tools, software, and soldering equipment I use daily to build my projects.",
    date: "Sep 15, 2024",
    slug: "coding-hardware-workbench-setup"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-24 relative bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Latest <span className="text-purple-400">Thoughts</span>
            </h2>
            <p className="text-zinc-400 max-w-xl">
              I occasionally write about my projects, findings, and the things I learn along the way.
            </p>
          </motion.div>

          <a href="https://blog.pranab.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors group pb-2">
            Visit Blog
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <a key={i} href="https://blog.pranab.tech" target="_blank" rel="noopener noreferrer">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-purple-600/50 hover:bg-zinc-800/30 transition-all group h-full flex flex-col"
              >
                <div className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-4">
                  {post.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium group-hover:text-purple-400 transition-colors">
                  Read Article
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogPreview;
