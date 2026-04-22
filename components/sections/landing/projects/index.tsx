"use client";

import { Title } from "@/components/secondary/title";
import { useFollowPointer } from "@/hooks/gsap/useFollowPointer";
import {
  ThumbnailCursorCircle,
  ThumbnailCursorLabel,
} from "@/components/secondary/magnetic";
import { landingPageelectedWorks, selectedWorks } from "@/utils/selectedWorks";
import Image from "next/image";
import { useRef } from "react";
import { scaleUp } from "./variants";
import { PassiveTextWithContainer } from "@/components/typography/passiveText";
import { useTilt } from "@/hooks/gsap/useTilt";
import { CTA } from "@/components/secondary/cta";
import { Button } from "@/components/secondary/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import Link from "next/link";

export function Projects() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLDivElement | null>(null);

  const {
    item: { active },
    handlePointerEnter,
    handlePointerLeave,
    moveItems,
  } = useFollowPointer({
    cursor,
    label,
  });

  const { isSmall, isMobile } = useScreenSize();
  const tiltRef = useTilt();

  return (
    <section
      id="works"
      onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
      className="container flex flex-col gap-40 md:!gap-[1.75rem] relative"
    >
      <div className="flex flex-col gap-20">
        <Title>Works</Title>
        <h1 data-text="Selected Works" className="mediumText">
          Selected Works
        </h1>
      </div>

      {/* Projects */}
      <div
        ref={tiltRef}
        className="grid grid-cols-1  md:!grid-cols-[repeat(auto-fit,minmax(31.25rem,1fr))] gap-24 md:gap-[2rem]"
      >
        {landingPageelectedWorks.map((work, i) => (
          <Link href={work.link} key={i}>
            <div
              onPointerEnter={({ clientX, clientY }) => {
                handlePointerEnter(i);
                moveItems(clientX, clientY);
              }}
              onPointerLeave={({ clientX, clientY }) => {
                handlePointerLeave(i);
                moveItems(clientX, clientY);
              }}
              className="!p-[0.9375rem] md:!p-[1.5rem] border-gray flex flex-col gap-[1.10625rem] md:!gap-[1.75rem] cursor-pointer projectHover"
            >
              {/* Banner */}
              <div className="relative h-[12.5rem] md:!h-[19.75rem] bg-[var(--color-medium-gray)]">
                <Image
                  src={work.image}
                  alt={work.name}
                  // fill
                  width={1656}
                  height={1106}
                  className={`object-cover ${!isSmall && !isMobile && "tilt-element"} w-full h-full`}
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-27 md:!gap-[2.625rem]">
                <h3 className="md:!text-[1.75rem] text-[1.25rem] font-bold">
                  {work.name}
                </h3>
                <p className="paragraph-text min-h-[2rem] md:!min-h-[3.3rem]">
                  {work.description}
                </p>
                {work.services[0] !== "case study in progress" ? (<PassiveTextWithContainer>
                  {work.services.join(" | ")}
                </PassiveTextWithContainer>) : 
                
                <PassiveTextWithContainer className="!bg-white !text-black">
                  {work.services.join(" | ")}
                </PassiveTextWithContainer>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <CTA className="md:!mt-[2.375rem] !mt-0">
        <Button link="/works">View All Works</Button>
      </CTA>

      {/* Cursor and label */}
      <ThumbnailCursorCircle ref={cursor} variants={scaleUp} active={active} />
      <ThumbnailCursorLabel
        ref={label}
        variants={scaleUp}
        active={active}
        className="text-black"
      >
        View
      </ThumbnailCursorLabel>
    </section>
  );
}
