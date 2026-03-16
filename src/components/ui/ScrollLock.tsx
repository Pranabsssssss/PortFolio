"use client";

import React, { useEffect } from "react";
import { useLoading } from "./LoadingContext";

export default function ScrollLock() {
  const { isAppLoading } = useLoading();

  useEffect(() => {
    if (isAppLoading) {
      // Hide the scrollbar while locking the layout from shifting by hiding overflow
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts (e.g. going to a different route layout)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAppLoading]);

  return null;
}
