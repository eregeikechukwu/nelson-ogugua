"use client";

import { Button } from "@/components/secondary/button";
import { useScaleDown } from "@/hooks/gsap/useScaleDown";
import { processes } from "@/utils/about-data";
import Image from "next/image";
import { useRef } from "react";

export function MyProcess() {
  const ref = useRef(null);
  useScaleDown(ref);
  console.log("Unu na emenu eeeh");
  return (
    <div className="container flex flex-col gap-60">
    <div className="flex-col-50">
      <div className="line-reveal-container">
        <h2 data-text="My Process" className="normalText line">
          My Process
        </h2>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-15"
      >
        {processes.map((process, i) => (
          <div
            key={i}
            className="h-auto  border-gray p-18 flex flex-col gap-21"
          >
            <div className="h-175">
              <Image
                src={process.image}
                height={175}
                width={310}
                alt="Process Image"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-13">
              <h3 className="text-24 font-bold">{process.name}</h3>
              <p className="bodyText text-15 text-[var(--color-text-gray)] leading-[1.75]">
                {process.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

     <div className="w-full flex justify-center gap-16">
          <Button link="/contact">Hire me</Button>
          <Button link="/works" variant="dark">
            View my works
          </Button>
        </div>
        </div>
  );
}
