"use client";

import { Title } from "@/components/secondary/title";
import { PassiveText } from "@/components/typography/passiveText";
import { testimonials } from "@/utils/testimonials";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useRef, useState } from "react";

export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonStyles =
    "group w-48 h-48 p-12 rounded-[4px] cursor-pointer flex items-center justify-center transition-colors";
  const iconStyles = "group-hover:animate-pulse";

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const clampedIndex = Math.max(0, Math.min(index, testimonials.length - 1));
    setActiveIndex(clampedIndex);

    // Calculate based on card width (32.5rem) + gap (24px = 2.4rem)
    const cardWidthRem = 32.5;
    const gapRem = 2.4;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const scrollPosition =
      clampedIndex * (cardWidthRem + gapRem) * rootFontSize;

    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const cardWidthRem = 32.5;
    const gapRem = 2.4;
    const cardPlusGap = (cardWidthRem + gapRem) * rootFontSize;

    // Calculate index based on scroll position
    const index = Math.round(container.scrollLeft / cardPlusGap);
    const clampedIndex = Math.max(0, Math.min(index, testimonials.length - 1));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  return (
    <section className="container !overflow-visible flex flex-col gap-28">
      {/* Heading and controls */}
      <div className="flex flex-col gap-20">
        <Title>Testimonial</Title>
        <div className="flex justify-between items-center line-reveal-container">
          <h1 data-text="Feedback That Inspires" className="mediumText line">
            Feedback That Inspires
          </h1>

          {/* Controls */}
          <div className="flex gap-18">
            <button
              onClick={() => scrollToIndex(activeIndex - 1)}
              className={`${buttonStyles} ${
                activeIndex === 0
                  ? "border-gray bg-black cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={activeIndex === 0}
            >
              <ArrowLeft
                width={24}
                height={24}
                color={activeIndex === 0 ? "white" : "black"}
                className={activeIndex === 0 ? "" : iconStyles}
              />
            </button>

            <button
              onClick={() => scrollToIndex(activeIndex + 1)}
              className={`${buttonStyles} ${
                activeIndex === testimonials.length - 1
                  ? "border-gray bg-black cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={activeIndex === testimonials.length - 1}
            >
              <ArrowRight
                width={24}
                height={24}
                color={
                  activeIndex === testimonials.length - 1 ? "white" : "black"
                }
                className={
                  activeIndex === testimonials.length - 1 ? "" : iconStyles
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        className="overflow-x-auto w-[100rem] scroll-smooth scrollbar-hide"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div className="grid grid-flow-col auto-cols-[32.5rem] grid-rows-1 gap-24 w-max snap-x snap-mandatory">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="p-24 border-gray flex flex-col justify-between h-[28.125rem] snap-start transition-transform duration-300"
            >
              <div className="text-24 stagger-reveal-container">
                {item.testimony.split(" ").map((word, i) => (
                  <span key={i}>
                    <span className="word">{word}&nbsp;</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-12">
                <p className="text-16 font-[500] leading-[1.5]">{item.name}</p>
                <PassiveText>{item.role}</PassiveText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
