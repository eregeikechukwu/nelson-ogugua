"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useSkewIn() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skew-in-item").forEach((item) => {
        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            ease: "back.inOut(1.3)",
            duration: 1,
            scrollTrigger: {
              trigger: item, // Each item triggers itself
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      // });
    });

    return () => ctx.revert();
  }, []);
}
