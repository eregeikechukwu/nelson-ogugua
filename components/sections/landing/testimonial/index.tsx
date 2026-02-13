"use client";

import { Title } from "@/components/secondary/title";
import { PassiveText } from "@/components/typography/passiveText";
import { testimonials } from "@/utils/testimonials";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { useTestimonialContols } from "@/hooks/useTestimonialContols";

export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [overflowMap, setOverflowMap] = useState<Record<number, boolean>>({});
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
    startTranslate: 0,
  });

  const buttonStyles =
    "group w-48 h-48 p-12 rounded-[4px] cursor-pointer flex items-center active:bg-[var(--color-yellow)] justify-center transition-colors";
  const iconStyles = "group-hover:animate-pulse group-active:text-white";

  const GAP = 24;
  const CARD_WIDTH = 520; // 32.5rem

  useEffect(() => {
    if (!trackRef.current) return;
    // Set initial position
    gsap.set(trackRef.current, { x: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const map: Record<number, boolean> = {};
    const MAX_HEIGHT = 311; // matches .clamped max-height

    trackRef.current.querySelectorAll(".paragraphs").forEach((el) => {
      const id = Number(el.id.split("-")[0]);
      // Check if full height exceeds the clamped max-height
      const isOverflowing = el.scrollHeight > MAX_HEIGHT;
      map[id] = isOverflowing;
    });
    setTimeout(() => {
      setOverflowMap(map);
    }, 0);
  }, [testimonials]);

  const clampClick = (id: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Touch/Mouse drag handlers
  const { scrollToIndex } = useTestimonialContols(
    dragStateRef,
    testimonials,
    activeIndex,
    isAnimating,
    trackRef,
    setActiveIndex,
    setIsAnimating,
    CARD_WIDTH,
    GAP,
  );

  return (
    <section className="container overflow-hidden !md:overflow-visible flex flex-col gap-28">
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
              onClick={() => scrollToIndex("prev")}
              disabled={isAnimating}
              className={`${buttonStyles} bg-white hover:bg-gray-100 disabled:opacity-50 active:bg-[var(--color-yellow)] `}
            >
              <ArrowLeft
                width={24}
                height={24}
                color="black"
                className={iconStyles}
              />
            </button>

            <button
              onClick={() => scrollToIndex("next")}
              disabled={isAnimating}
              className={`${buttonStyles} bg-white hover:bg-gray-100 disabled:opacity-50`}
            >
              <ArrowRight
                width={24}
                height={24}
                color="black"
                className={iconStyles}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="overflow-hidden w-[102rem]" ref={containerRef}>
        <div
          ref={trackRef}
          className="flex gap-24"
          style={{ width: "max-content", cursor: "grab" }}
        >
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="p-24 border-gray flex flex-col justify-between  min-h-[28.125rem] flex-shrink-0 gap-50"
              style={{ width: "32.5rem" }}
            >
              <div
                id={`${i}-paragraph`}
                ref={(el: HTMLDivElement | null) => {
                  if (el) testimonialsRef.current[i] = el;
                }}
                className={`${overflowMap[i] && !expandedMap[i] ? "clamped" : ""} text-24 paragraphs stagger-reveal-container  relative`}
              >
                {item.testimony.split(" ").map((word, j) => (
                  <span key={j}>
                    <span className="word">{word}&nbsp;</span>
                  </span>
                ))}{" "}
                {overflowMap[i] && (
                  <div
                    onClick={() => clampClick(i)}
                    className="text-[var(--color-yellow)] text-17 py-5 cursor-pointer absolute bottom-3 bg-[var(--background)] right-0"
                  >
                    {!expandedMap[i] && (
                      <p className="text-white inline-block text-bottom">
                        ...&nbsp;
                      </p>
                    )}
                    {expandedMap[i] ? "See less" : "See more"}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-12">
                <p className="text-16 font-[500] leading-[1.5]">{item.name}</p>
                <PassiveText>{item.role}</PassiveText>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-12 justify-center">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setActiveIndex(i);
              gsap.to(trackRef.current, {
                x: -(i * (CARD_WIDTH + GAP)),
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => setIsAnimating(false),
              });
            }}
            className={`h-8 rounded-full transition-all ${
              i === activeIndex
                ? "bg-black w-24"
                : "bg-gray-300 hover:bg-gray-400 w-8"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
