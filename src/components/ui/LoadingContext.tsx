"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type LoadingContextType = {
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isAppLoading: true,
  setIsAppLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isAppLoading, setIsAppLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
