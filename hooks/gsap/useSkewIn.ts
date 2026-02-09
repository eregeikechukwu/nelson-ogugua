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
            xPercent: -130,
            rotationY: 90,
            transformPerspective: 1000,
            autoAlpha: 0,
            opacity: 0,
          },
          {
            xPercent: 0,
            rotationY: 0,
            opacity: 1,
            autoAlpha: 1,
            ease: "back.inOut(1.4)",
            duration: 2,
            scrollTrigger: {
              trigger: item, // Each item triggers itself
              start: "top 0%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
      // });
    });

    return () => ctx.revert();
  }, []);
}
