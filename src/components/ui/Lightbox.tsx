"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText?: string;
}

export default function Lightbox({ isOpen, onClose, imageSrc, altText = "Expanded Image" }: LightboxProps) {
  // Lock body scroll and handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = "hidden";
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-zinc-800/80 hover:bg-red-600 text-white rounded-full border border-zinc-700 transition-colors z-[210]"
          >
            <FiX size={20} />
          </button>

          {/* Image/Video Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center" 
            onClick={e => e.stopPropagation()} // Prevent clicks on media from closing
          >
            {imageSrc.match(/\.(mp4|webm)$/i) ? (
              <motion.video
                key={imageSrc}
                src={imageSrc}
                autoPlay
                controls
                loop
                playsInline
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, type: "spring", bounce: 0.2 }}
                className="max-w-full max-h-full rounded-xl shadow-2xl outline-none bg-black"
              />
            ) : (
              <motion.img
                key={imageSrc}
                src={imageSrc}
                alt={altText}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, type: "spring", bounce: 0.2 }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
