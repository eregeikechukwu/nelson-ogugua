"use client";

import CountUp from "@/components/secondary/countup";
import { Title } from "@/components/secondary/title";
import { RefObject, useRef } from "react";

export function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerStyles =
    "px-40 py-54 flex flex-col gap-25 bg-[var(--background)]";
  const numberStyles =
    "text-[4.444rem] font-bold text-left text-white leading-[1.13] inline-block";
  const textStyles = "text-[var(--color-text-gray)] leading-[1.56]";

  return (
    <section className="container flex flex-col gap-40">
      <Title>My expertise in numbers</Title>

      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-px bg-[var(--color-medium-gray)] border-gray"
      >
        <div className={`${containerStyles}`}>
          <div>
            <CountUp
              end={103}
              duration={103 * 40}
              styles={numberStyles}
              ref={containerRef as RefObject<HTMLDivElement>}
            />
            <span className={numberStyles}>+</span>
          </div>
          <p className={`${textStyles}`}>
            Projects completed across branding and product design
          </p>
        </div>
        <div className={`${containerStyles}`}>
          <div>
            {" "}
            <CountUp
              end={58}
              styles={numberStyles}
              duration={58 * 40}
              ref={containerRef as RefObject<HTMLDivElement>}
            />
            <span className={numberStyles}>+</span>
          </div>
          <p className={`${textStyles}`}>
            Clients trusted me to bring their ideas to life
          </p>
        </div>
        <div className={`${containerStyles}`}>
          <div>
            <CountUp
              end={98}
              duration={98 * 40}
              styles={numberStyles}
              ref={containerRef as RefObject<HTMLDivElement>}
            />
            <span className={numberStyles}>%</span>
          </div>
          <p className={`${textStyles}`}>
            Projects completed across branding and product design
          </p>
        </div>
      </div>
    </section>
  );
}
