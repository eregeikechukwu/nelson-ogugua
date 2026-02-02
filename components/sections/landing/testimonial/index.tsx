"use client";

import { Title } from "@/components/secondary/title";
import { PassiveText } from "@/components/typography/passiveText";
import { testimonials } from "@/utils/testimonials";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
    startTranslate: 0,
  });

  const buttonStyles =
    "group w-48 h-48 p-12 rounded-[4px] cursor-pointer flex items-center justify-center transition-colors";
  const iconStyles = "group-hover:animate-pulse";

  const GAP = 24;
  const CARD_WIDTH = 520; // 32.5rem

  useEffect(() => {
    if (!trackRef.current) return;
    // Set initial position
    gsap.set(trackRef.current, { x: 0 });
  }, []);

  // Touch/Mouse drag handlers
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      if (isAnimating) return;

      dragStateRef.current.isDragging = true;
      dragStateRef.current.startX =
        "touches" in e ? e.touches[0].clientX : e.clientX;

      // Get current transform value
      const transform = gsap.getProperty(track, "x") as number;
      dragStateRef.current.startTranslate = transform;

      track.style.cursor = "grabbing";
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!dragStateRef.current.isDragging) return;

      e.preventDefault();
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const diff = currentX - dragStateRef.current.startX;

      gsap.set(track, {
        x: dragStateRef.current.startTranslate + diff,
      });
    };

    const handleDragEnd = () => {
      if (!dragStateRef.current.isDragging) return;

      dragStateRef.current.isDragging = false;
      track.style.cursor = "grab";

      // Calculate which card to snap to
      const currentX = gsap.getProperty(track, "x") as number;
      const movedCards = Math.round(-currentX / (CARD_WIDTH + GAP));
      const newIndex = Math.max(
        0,
        Math.min(movedCards, testimonials.length - 1),
      );

      setActiveIndex(newIndex);
      setIsAnimating(true);

      gsap.to(track, {
        x: -(newIndex * (CARD_WIDTH + GAP)),
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
    };

    track.addEventListener("mousedown", handleDragStart);
    track.addEventListener("touchstart", handleDragStart, { passive: true });

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("touchmove", handleDragMove, { passive: false });

    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      track.removeEventListener("mousedown", handleDragStart);
      track.removeEventListener("touchstart", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isAnimating]);

  const scrollToIndex = (direction: "next" | "prev") => {
    if (!trackRef.current || isAnimating) return;

    setIsAnimating(true);

    let newIndex = activeIndex;

    if (direction === "next") {
      newIndex = activeIndex + 1;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
    } else {
      newIndex = activeIndex - 1;
      if (newIndex < 0) {
        newIndex = testimonials.length - 1;
      }
    }

    setActiveIndex(newIndex);

    // Calculate position - each card moves by (cardWidth + gap)
    const moveAmount = -(newIndex * (CARD_WIDTH + GAP));

    gsap.to(trackRef.current, {
      x: moveAmount,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setIsAnimating(false),
    });
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
              onClick={() => scrollToIndex("prev")}
              disabled={isAnimating}
              className={`${buttonStyles} bg-white hover:bg-gray-100 disabled:opacity-50`}
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
              className="p-24 border-gray flex flex-col justify-between h-[28.125rem] flex-shrink-0"
              style={{ width: "32.5rem" }}
            >
              <div className="text-24 stagger-reveal-container">
                {item.testimony.split(" ").map((word, j) => (
                  <span key={j}>
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
