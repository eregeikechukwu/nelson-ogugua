"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useRevealStaggered() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        // .toArray<HTMLElement>(".stagger-reveal-mute")
        .toArray<HTMLElement>(".stagger-reveal-container")
        .forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(".word");
          const fasterItems =
            container.querySelectorAll<HTMLElement>(".fastword");
          if (!items.length) return;

          gsap.set(items, { autoAlpha: 0 });
          gsap.set(fasterItems, { autoAlpha: 0 });
          // Remeber to change these to the original to get bacik the reveal aniamtion when needed
          gsap.fromTo(
            items,
            { yPercent: 0, autoAlpha: 0, opacity: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              opacity: 1,
              ease: "back.out(1.7)",
              stagger: 0.015,
              duration: 1,
              scrollTrigger: {
                trigger: container,
                start: "top 70%",
              },
            },
          );

          // For fsater reveal
          gsap.fromTo(
            fasterItems,
            { yPercent: 0, autoAlpha: 0, opacity: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              opacity: 1,
              ease: "back.out(1.7)",
              duration: 0.5,
              stagger: 0.015,
              scrollTrigger: {
                trigger: container,
                start: "top 70%",
              },
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export function useFastRevealStaggered() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".fast-stagger-reveal-container")
        .forEach((container) => {
          const fasterItems =
            container.querySelectorAll<HTMLElement>(".fastword");
          if (!fasterItems.length) return;

          gsap.set(fasterItems, { autoAlpha: 0 });

          // For fsater reveal
          gsap.fromTo(
            fasterItems,
            { yPercent: 0, autoAlpha: 0, opacity: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              opacity: 1,
              ease: "back.out(1.7)",
              duration: 0.3,
              stagger: 0.01,
              scrollTrigger: {
                trigger: container,
                start: "top 70%",
              },
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
