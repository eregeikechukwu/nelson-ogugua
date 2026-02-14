"use client";

import { useEffect, useState } from "react";

type Screen = "mobile" | "small" | "desktop";

function getScreen(): Screen {
  if (typeof window === "undefined") return "desktop";

  const w = window.innerWidth;
  if (w < 576) return "mobile";
  if (w < 768) return "small";
  return "desktop";
}

export function useScreenSize() {
  // Initialize with lazy function (only runs once on mount)
  const [screen, setScreen] = useState<Screen>(getScreen);

  useEffect(() => {
    // Initial check in case SSR default was wrong
    setTimeout(() => setScreen(getScreen()), 0);

    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScreen(getScreen());
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    screen,
    isMobile: screen === "mobile",
    isSmall: screen === "small",
    isDesktop: screen === "desktop",
  };
}
