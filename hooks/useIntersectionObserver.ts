"use client";

import { useLayoutEffect } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    if (!ref || !ref.current) return;

    const el = ref.current;

    // Helper to remove both sticky classes (make it "normal")
    const clearSticky = () => {
      el.classList.remove("sticky-down");
    };

    // Top sentinel: when at the very top, clear sticky classes.
    let topObserver: IntersectionObserver | null = null;
    let topSentinel: HTMLDivElement | null = null;
    const existing = document.getElementById("top-sentinel");
    if (existing && existing instanceof HTMLDivElement) {
      topSentinel = existing;
    } else {
      topSentinel = document.createElement("div");
      topSentinel.id = "top-sentinel";
      topSentinel.dataset.createdBy = "useIntersectionObserver";
      topSentinel.style.position = "absolute";
      topSentinel.style.top = "0";
      topSentinel.style.left = "0";
      topSentinel.style.width = "1px";
      topSentinel.style.height = "1px";
      topSentinel.style.pointerEvents = "none";
      document.body.prepend(topSentinel);
    }
    console.log(topSentinel, " sentine");

    topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearSticky();
          console.log("I'm intersectng now");
        } else {
          el.classList.add("sticky-down");
          console.log("I'm  NOT intersectng now");
        }
      },
      { root: null, threshold: 0 },
    );

    if (topSentinel) topObserver.observe(topSentinel);

    return () => {
      if (topObserver) topObserver.disconnect();
      if (
        topSentinel &&
        topSentinel.dataset.createdBy === "useIntersectionObserver" &&
        document.body.contains(topSentinel)
      ) {
        document.body.removeChild(topSentinel);
      }
    };
  }, [ref]);
}
