"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";

type UseHardScrollOptions = {
  lerp?: number;
  wheelMultiplier?: number;
  disabledBelow?: number;
};

export function useHardScroll({
  lerp = 0.05,
  wheelMultiplier = 0.5,
  disabledBelow = 768,
}: UseHardScrollOptions = {}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < disabledBelow) return;

    const lenis = new Lenis({
      lerp,
      infinite: false,
      wheelMultiplier,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [lerp, wheelMultiplier, disabledBelow]);
}
