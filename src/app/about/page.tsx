"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiCpu, FiTarget } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          About <span className="text-purple-400">Me</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          I&apos;m Pranab Saini, a student tech founder driven by the curiosity of how things work and the passion to make them work better.
        </p>
      </motion.div>

      <div className="space-y-16">
        
        {/* Biography Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-zinc-900 rounded-xl text-purple-400 border border-zinc-800">
              <FiBookOpen size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">My Background</h2>
          </div>
          <div className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed">
            <p className="mb-4">
              Currently studying in Class 11 at CM Shri Sec-10 Delhi, my journey into technology started long before high school. While others were simply playing games, I was trying to figure out how they were made. This curiosity quickly evolved from software into the physical realm of hardware and electronics.
            </p>
            <p>
              I believe age is not a barrier to building meaningful technology. As a young founder, I&apos;ve dedicated myself to exploring artificial intelligence, robotics, and Internet of Things (IoT). I spend my weekends soldering microcontrollers and my evenings writing code that brings those circuits to life.
            </p>
          </div>
        </motion.section>

        {/* Areas of Interest Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-zinc-900 rounded-xl text-purple-400 border border-zinc-800">
              <FiCpu size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">What I Build</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI & Machine Learning</h3>
              <p className="text-zinc-400">Implementing computer vision models with OpenCV and TensorFlow to give hardware the ability to &quot;see&quot; and understand environments.</p>
            </div>
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Embedded Systems</h3>
              <p className="text-zinc-400">Designing circuits and programming microcontrollers (Arduino, ESP32, Raspberry Pi) to interact with physical sensors and motors.</p>
            </div>
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">IoT Infrastructure</h3>
              <p className="text-zinc-400">Building scalable backend architectures and real-time protocols (MQTT) to connect and manage remote hardware swarms.</p>
            </div>
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Modern Web Apps</h3>
              <p className="text-zinc-400">Developing responsive, dynamic command interfaces using Next.js, React, and Tailwind CSS to control my physical projects over the web.</p>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-zinc-900 rounded-xl text-purple-400 border border-zinc-800">
              <FiTarget size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">The Mission</h2>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-zinc-900/40 p-8 rounded-3xl border border-purple-600/20">
            <p className="text-xl text-zinc-300 leading-relaxed italic">
              "To architect intelligent hardware systems that bridge the gap between digital algorithms and physical reality, solving complex automation problems for a better future."
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
