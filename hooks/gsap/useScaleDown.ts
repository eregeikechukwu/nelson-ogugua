"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScaleDown(ref: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(ref.current).forEach((container) => {
        const items = container.children;

        console.log(items, "The ref");
        if (!items?.length) return;

        gsap.set(items, { autoAlpha: 0, scale: 0, opacity: 0 });

        const t1 = gsap.timeline();



        t1.from(items, {
            scale: 0.5,
            opacity: 0
        }).to(items, {
          scale: 0.9,
          opacity: 0.6,
          duration: 0.15,
          ease: "power2.out",
          stagger: 0.3,
        })
          .to(items, {
            scale: 1.08,
            duration: 0.2,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.3,
          })
          .to(items, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.3,
          });
      });
    });

    return () => ctx.revert();
  }, [ref]);

  return null;
}
