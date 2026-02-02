"use client";

import gsap from "gsap";
import { useLayoutEffect } from "react";

export function useLetterReveal(
  ref: React.RefObject<HTMLElement | null>,
  displayPage?: string,
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const containers = gsap.utils.selector(el)(".letter-reveal");

        containers.forEach((container) => {
          const items = container.querySelectorAll<HTMLElement>(".letter");
          console.log("Letter items found:", items.length);
          if (!items.length) return;

          const tl = gsap.timeline();

          tl.fromTo(
            items,
            { yPercent: 120, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "back.out(1.7)",
              stagger: 0.05,
              duration: 0.5,
            },
          );
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref, displayPage]);

  return null;
}
