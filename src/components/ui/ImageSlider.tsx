"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX, FiMaximize } from "react-icons/fi";

interface ImageSliderProps {
  images: string[];
  title?: string;
}

const ImageSlider = ({ images, title = "Gallery" }: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // Auto-advance every 2.5s (paused when lightbox is open)
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (lightboxOpen || images.length <= 1) return;
    autoTimer.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 2500);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [lightboxOpen, images.length]);

  // Reset timer on manual interaction
  const resetTimer = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 2500);
  }, [images.length]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (i: number) => { setCurrent(i); resetTimer(); };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`Slide ${current + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>

          {/* Expand button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-white rounded-lg border border-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600"
          >
            <FiMaximize size={16} />
          </button>

          {images.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md hover:bg-purple-600 text-white rounded-full border border-zinc-700/50 transition-all">
                <FiChevronLeft size={20} />
              </button>
              <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md hover:bg-purple-600 text-white rounded-full border border-zinc-700/50 transition-all">
                <FiChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => handleDot(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-purple-400" : "bg-zinc-600"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 bg-zinc-800/80 hover:bg-red-600 text-white rounded-full border border-zinc-700 transition-colors z-10"
            >
              <FiX size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-sm text-zinc-400 font-medium">
              {current + 1} / {images.length}
            </div>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-12 md:p-20" onClick={e => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`Slide ${current + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/80 hover:bg-purple-600 text-white rounded-full border border-zinc-700 transition-all"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/80 hover:bg-purple-600 text-white rounded-full border border-zinc-700 transition-all"
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Thumbnail strip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-black/50 rounded-xl backdrop-blur-md">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                      className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        i === current ? "border-purple-500 ring-2 ring-purple-500/30" : "border-zinc-700 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageSlider;
