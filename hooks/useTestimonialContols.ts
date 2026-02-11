"use client";

import gsap from "gsap";
import { RefObject, useEffect } from "react";

export function useTestimonialContols(
  dragStateRef: RefObject<{
    isDragging: boolean;
    startX: number;
    currentX: number;
    startTranslate: number;
  }>,
  testimonials: {
    id: number;
    name: string;
    role: string;
    testimony: string;
  }[],
  activeIndex: number,
  isAnimating: boolean,
  trackRef: RefObject<HTMLDivElement | null>,
  setActiveIndex: (index: number) => void,
  setIsAnimating: (isAnimating: boolean) => void,
  CARD_WIDTH: number,
  GAP: number,
) {
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

  return { scrollToIndex };
}
