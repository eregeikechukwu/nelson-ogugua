"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScaleDown(ref: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const items = Array.from(ref.current!.children);
      console.log("Scale Down items:", items);
      if (!items.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
        },
      });

      tl.from(items, {
        scale: 0.5,
        opacity: 0,
        duration: 2,
        stagger: 0.12,
        ease: "elastic.out(1, 0.5)",
      });
      tl.to(items, {
        scale: 1,
        opacity: 1,
        duration: 2,
        stagger: 0.12,
        ease: "elastic.out(1, 0.5)",
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);

  return null;
}
