"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function PassiveName() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(containerRef.current)
        .forEach((container) => {
          const items = container.children;

          console.log(items);
          if (!items.length) return;

          gsap.set(items, { autoAlpha: 0 });

          gsap.fromTo(
            items,
            {
              xPercent: 130,
              autoAlpha: 0,
            },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power3.out",
              stagger: 0.3,
              duration: 1.4,
              delay: 0.5,
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-[rgba(255,255,255,0.09)] leading-2 text-[11rem] font-bold"
    >
      <h1 className="leading-[0.9]">Nelson</h1>
      <h1 className="leading-[0.9] pl-40">&nbsp;&nbsp;Ogugua</h1>
    </div>
  );
}
