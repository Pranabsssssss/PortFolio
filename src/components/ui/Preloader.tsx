"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingContext";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { setIsAppLoading } = useLoading();

  useEffect(() => {
    setMounted(true);

    // Immediately signal that the Preloader React component has mounted.
    // This fades out the CSS ::before cover (the CSS transitions over 0.3s).
    document.body.setAttribute("data-preloader-ready", "true");

    // Timeline: 
    // 0s - 1.5s: Line expands across the screen
    // 1.8s: Trigger curtain exit sequence
    // 2.0s: Curtains physically start moving (due to 0.2s exit delay)
    // 2.8s: Curtains reach ~80% open -> Trigger app content reveal
    
    // Trigger the curtains to unmount and part
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); 

    // Release the app loading lock exactly at the 80% point
    const revealTimer = setTimeout(() => {
      setIsAppLoading(false);
      // Remove the CSS cover entirely after app is revealed
      document.body.setAttribute("data-preloader-done", "true");
    }, 2800); 

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(revealTimer);
    };
  }, [setIsAppLoading]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          exit={{ opacity: 0, transition: { delay: 1.5, duration: 0.3 } }}
        >
          {/* Top Curtain Half */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black z-40 flex flex-col justify-end"
          >
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ duration: 1.5, ease: "easeInOut" }} 
              className="h-[2px] w-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] origin-center"
            />
          </motion.div>
          
          {/* Bottom Curtain Half */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-40 flex flex-col justify-start"
          >
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ duration: 1.5, ease: "easeInOut" }} 
              className="h-[2px] w-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] origin-center"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
