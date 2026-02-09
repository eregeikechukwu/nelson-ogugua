"use client";

import { Button } from "@/components/secondary/button";
import { useScaleDown } from "@/hooks/gsap/useScaleDown";
import { processes } from "@/utils/about-data";
import Image from "next/image";
import { useRef } from "react";

export function MyProcess() {
  const ref = useRef(null);
  useScaleDown(ref);

  return (
    <div className="pt-100 flex flex-col gap-60">
      <div className="flex-col-50">
        <div className="line-reveal-container">
          <h2 data-text="My Process" className="normalText line">
            My Process
          </h2>
        </div>

        <div ref={ref} className="flex flex-col gap-16">
          {processes.map((process, i) => (
            <div key={i} className="h-auto  border-gray p-18 flex gap-21">
              <div className="h-auto basis-[21.875rem]">
                <Image
                  src={process.image}
                  height={211}
                  width={350}
                  alt="Process Image"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1 flex flex-col  gap-13">
                <h3 className="text-[2rem] font-bold">{process.name}</h3>
                <p className="paragraph-text">{process.paragraph}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center gap-16">
        <Button link="/contact">Work with me</Button>
        <Button link="/works" variant="dark">
          View my works
        </Button>
      </div>
    </div>
  );
}
