"use client";

import { useScaleDown } from "@/hooks/gsap/useScaleDown";
import { useRef } from "react";

export function MyProcess() {
  const ref = useRef(null);
  useScaleDown(ref);
  return (
    <div className="container flex-col-50">
      <div className="line-reveal-container">
        <h2 data-text="My Process" className="normalText line">
          My Process
        </h2>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-20"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-400  rounded-[2rem] bg-[var(--color-yellow)]"
          >
            &nbsp;
          </div>
        ))}
      </div>
    </div>
  );
}
