"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useRevealLine() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".line-reveal-container")
        .forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(".line");
          if (!items.length) return;

          gsap.fromTo(
            items,
            { yPercent: 130, autoAlpha: 0,opacity:0 },
            {
              yPercent: 0,
              opacity: 1,
              autoAlpha: 1,
              ease: "power3.out",
              stagger: 0.1,
              duration: 0.8,
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
