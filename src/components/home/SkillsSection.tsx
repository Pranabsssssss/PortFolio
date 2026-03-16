"use client";

import React from "react";
import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Programming",
    items: ["TypeScript", "Python", "C++", "JavaScript", "HTML/CSS"]
  },
  {
    category: "Hardware & Embedded",
    items: ["Raspberry Pi", "Arduino", "ESP8266", "IoT Protocols (MQTT)", "Circuit Design"]
  },
  {
    category: "Tools & Platforms",
    items: ["Next.js", "React", "Tailwind CSS", "Git", "TensorFlow", "OpenCV"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)", y: 15 },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
};

const SkillsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black/50">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Technical <span className="text-purple-400">Toolkit</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Tools and technologies I use to bridge the gap between software and the physical world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
                {skillGroup.category}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skillGroup.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium border border-zinc-700 hover:border-purple-600/50 hover:text-purple-400 transition-all shadow-sm cursor-pointer"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
