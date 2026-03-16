"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { useLoading } from "./LoadingContext";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const { isAppLoading } = useLoading();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // Pause / Resume Lenis based on app loading state
  useEffect(() => {
    if (!lenisInstance) return;
    
    if (isAppLoading) {
      lenisInstance.stop(); // Stops scroll physics and input listening
    } else {
      lenisInstance.start(); // Resumes normally
    }
  }, [isAppLoading, lenisInstance]);

  return <>{children}</>;
}
