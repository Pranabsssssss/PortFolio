"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseleave", mouseLeaveHandler);
    window.addEventListener("mouseenter", mouseEnterHandler);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseleave", mouseLeaveHandler);
      window.removeEventListener("mouseenter", mouseEnterHandler);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* The solid center dot that tracks instantly */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-purple-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
        transition={{
          x: { duration: 0, type: "tween", ease: "linear" }, 
          y: { duration: 0, type: "tween", ease: "linear" },
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* The expanding translucent ring on hover */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-purple-500/50 bg-purple-500/10 rounded-full pointer-events-none z-[9998] backdrop-blur-[1px]"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.2 : 0,
          opacity: isVisible && isHovering ? 1 : 0,
        }}
        transition={{
          x: { duration: 0, type: "tween", ease: "linear" },
          y: { duration: 0, type: "tween", ease: "linear" },
          scale: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};

export default CustomCursor;
