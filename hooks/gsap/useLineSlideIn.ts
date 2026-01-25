"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useLineSlideIn() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".slide-in-container")
        .forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(".slide");
          if (!items.length) return;

          gsap.set(items, { autoAlpha: 0 });

          gsap.fromTo(
            items,
            { xPercent: -130, autoAlpha: 0, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              autoAlpha: 1,
              ease: "power3.out",
              stagger: 0.2,
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
