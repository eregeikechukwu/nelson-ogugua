"use client";

import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type UseSlowScrollOptions = {
  duration?: number;
  transformY?: number;
  initialY?: number;
  disabledBelow?: number; // viewport width
};

export function useSlowScroll<T extends HTMLElement>(
  ref: RefObject<HTMLDivElement | null>,
  {
    duration = 3,
    transformY = 10,
    initialY = 0,
    disabledBelow = 768,
  }: UseSlowScrollOptions = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined") return;
    if (window.innerWidth < disabledBelow) return;

    gsap.registerPlugin(ScrollTrigger);

    console.log("I survived");

    gsap.set(el, { y: initialY });

    const tween = gsap.to(el, {
      y: transformY,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, duration, transformY, initialY, disabledBelow]);
}
