"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    role: "Head of AI Research, TechCorp",
    image: "https://i.pravatar.cc/600?img=32",
    quote: "Pranab showcased strong leadership and full-stack web development skills during multiple high-impact projects. His ability to integrate complex systems with scalable design made him a valuable asset.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, NextGen Robotics",
    image: "https://i.pravatar.cc/600?img=11",
    quote: "A brilliant engineer with an intuitive grasp of both hardware and software. Pranab doesn't just write code; he architects solutions that bridge the physical and digital worlds seamlessly.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, InnovateX",
    image: "https://i.pravatar.cc/600?img=5",
    quote: "Working with Pranab was incredible. His ability to deliver complex AI solutions on time—and with a sleek, user-friendly interface—is unmatched. He truly understands product vision.",
  },
  {
    id: 4,
    name: "Prof. David Alan",
    role: "Computer Science Dept.",
    image: "https://i.pravatar.cc/600?img=68",
    quote: "An exceptional talent. His dedication to building intelligent systems is truly inspiring. Pranab consistently demonstrates a deep understanding of advanced algorithms and practical applications.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (idx: number) => {
    setActive(((idx % total) + total) % total);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 10000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [total]);

  const current = testimonials[active];

  return (
    <section className="py-20 lg:py-40 relative overflow-hidden bg-[#09090b]">
      
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-32 text-center lg:text-left">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-6 block"
           >
             Endorsements
           </motion.span>
           <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none">
             Trusted by <br />
             <span className="font-serif italic text-white pr-4">Industry Experts.</span>
           </h2>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-32 items-center min-h-[500px]">
          
          {/* Quote Side (Left) */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:h-[500px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                {/* Large Decorative Quote Mark */}
                <span className="absolute -top-12 -left-4 md:-top-16 md:-left-10 text-[8rem] md:text-[15rem] font-serif italic text-purple-500/5 select-none pointer-events-none">
                  &ldquo;
                </span>
                
                <p className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic text-zinc-100 leading-[1.15] tracking-tight relative z-10 text-center lg:text-left">
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 + 0.3 }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                  ))}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Author & Nav Side (Right) */}
          <div className="flex flex-col gap-12 text-center lg:text-left items-center lg:items-start">
            
            {/* Author Info */}
            <div className="relative h-[250px] sm:h-[320px] lg:h-[400px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col gap-8 items-center lg:items-start"
                >
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border border-white/5 shadow-2xl skew-x-[-2deg] group">
                    <img 
                      src={current.image} 
                      alt={current.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transition-transform group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{current.name}</h4>
                    <p className="text-purple-400 font-medium tracking-wide uppercase text-xs">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bespoke Navigation */}
            <div className="flex items-center gap-6 pt-12 border-t border-white/5">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em]">Navigation</span>
                    <div className="flex items-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-1.5 transition-all duration-700 rounded-full ${
                                    i === active ? "w-12 bg-purple-500" : "w-2 bg-white/10 hover:bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 ml-auto">
                    <button 
                        onClick={() => goTo(active - 1)}
                        className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-white hover:bg-white/5 transition-all"
                    >
                        <FiArrowUp />
                    </button>
                    <button 
                         onClick={() => goTo(active + 1)}
                         className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center text-white hover:bg-white/5 transition-all"
                    >
                        <FiArrowDown />
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Background Graphic Accent */}
      <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 text-[10rem] md:text-[20rem] font-black text-white/[0.02] select-none pointer-events-none leading-none">
        {active + 1}
      </div>

    </section>
  );
}
