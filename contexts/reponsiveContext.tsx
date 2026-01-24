"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ResponsiveContext = createContext({
  isMobile: false,
  isIPad: false,
  isDesktop: false,
});

function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isIPad, setIsIpad] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const iPadMediaQ = window.matchMedia(
      "(max-width: 769px) and (min-width: 367px)",
    );
    const mobileMediaQ = window.matchMedia("(max-width: 367px)");
    const deskTopMediaQ = window.matchMedia("(max-width: 1500px)");

    interface MediaChangeHandler {
      (
        e: MediaQueryList | MediaQueryListEvent,
        setState: (value: boolean) => void,
      ): void;
    }

    const handleMediaChange: MediaChangeHandler = function (e, setState) {
      e.matches ? setState(true) : setState(false);
    };

    mobileMediaQ.addEventListener("change", (e) => {
      handleMediaChange(e, setIsMobile);
    });
    iPadMediaQ.addEventListener("change", (e) => {
      handleMediaChange(e, setIsIpad);
    });
    deskTopMediaQ.addEventListener("change", (e) => {
      handleMediaChange(e, setIsDesktop);
    });

    handleMediaChange(mobileMediaQ, setIsMobile);
    handleMediaChange(iPadMediaQ, setIsIpad);
    handleMediaChange(deskTopMediaQ, setIsDesktop);

    // console.log(isIPad);
  }, [isIPad, isMobile]);

  return (
    <ResponsiveContext.Provider value={{ isMobile, isIPad, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

function useResponsive() {
  const context = useContext(ResponsiveContext);

  if (context === undefined) {
    throw new Error(
      "ResponsiveContext was used outside the ResponsiveProvider",
    );
  }

  return context;
}

export { ResponsiveProvider, useResponsive, ResponsiveContext };

// 8112184729 - Palmpay- Richard Godwin
