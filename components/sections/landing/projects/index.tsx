"use client";

import { Title } from "@/components/secondary/title";
import { useFollowPointer } from "@/hooks/gsap/useFollowPointer";
import {
  ThumbnailCursorCircle,
  ThumbnailCursorLabel,
} from "@/components/secondary/magnetic";
import { selectedWorks } from "@/utils/selectedWorks";
import Image from "next/image";
import { useRef } from "react";
import { scaleUp } from "./variants";
import { PassiveTextWithContainer } from "@/components/typography/passiveText";
import { useTilt } from "@/hooks/gsap/useTilt";
import { Typewriter } from "@/components/secondary/typeWriter";

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

  const tiltRef = useTilt();

  return (
    <section
      id="works"
      onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
      className="container flex flex-col gap-28 relative"
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
        className="grid grid-cols-[repeat(auto-fit,minmax(31.25rem,1fr))] gap-32"
      >
        {selectedWorks.map((work, i) => (
          <div
            onPointerEnter={({ clientX, clientY }) => {
              handlePointerEnter(i);
              moveItems(clientX, clientY);
            }}
            onPointerLeave={({ clientX, clientY }) => {
              handlePointerLeave(i);
              moveItems(clientX, clientY);
            }}
            className="p-24 border-gray flex flex-col gap-28 cursor-pointer projectHover"
            key={i}
          >
            {/* Banner */}
            <div className="relative h-[19.75rem] bg-[var(--color-medium-gray)]">
              <Image
                src={work.image}
                alt={work.name}
                width={473}
                height={316}
                className="w-full h-full object-cover tilt-element"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-42">
              <h3 className="text-28 font-bold">{work.name}</h3>
              <Typewriter className="paragraph-text min-h-[3.3rem]" speed={30}>
                {work.description}
              </Typewriter>
              <PassiveTextWithContainer>
                {work.services.join(" | ")}
              </PassiveTextWithContainer>
            </div>
          </div>
        ))}
      </div>

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
