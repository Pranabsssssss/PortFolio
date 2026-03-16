"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TopLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    // When pathname changes, the new page has already loaded
    if (prevPath.current !== pathname) {
      // Finish the bar
      setProgress(100);
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
      prevPath.current = pathname;
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [pathname]);

  // Intercept link clicks to start the loader
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#") || href.startsWith("tel:")) return;
      if (target.target === "_blank") return;
      // Same page
      if (href === pathname) return;

      // Start loading
      setLoading(true);
      setProgress(30);

      // Simulate incremental progress
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) { clearInterval(interval); return 90; }
          return p + Math.random() * 15;
        });
      }, 200);

      // Store interval to clean up
      return () => clearInterval(interval);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopLoader;
