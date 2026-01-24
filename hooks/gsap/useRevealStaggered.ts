"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useRevealStaggered() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".stagger-reveal-container")
        .forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(".word");
          if (!items.length) return;

          gsap.set(items, { autoAlpha: 0 });

          gsap.fromTo(
            items,
            { yPercent: 130, autoAlpha: 0, opacity: 1 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power3.out",
              stagger: 0.03,
              duration: 0.8,
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
              },
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
