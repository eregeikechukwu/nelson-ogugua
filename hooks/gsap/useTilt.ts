"use client";

import { useEffect, useRef } from "react";

type TiltOptions = {
  maxRotate?: number;
  perspective?: number;
  duration?: number;
  ease?: string;
  className?: string;
  disableOnTouch?: boolean;
};

export function useTilt(options: TiltOptions = {}) {
  const {
    maxRotate = 20,
    perspective = 1000,
    duration = 0.3,
    ease = "power2.out",
    className = "tilt-element",
    disableOnTouch = true,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip on touch devices if specified
    if (disableOnTouch && "ontouchstart" in window) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;

    script.onload = () => {
      const gsap = window.gsap;
      const container = containerRef.current;

      if (!container || !gsap) {
        console.error("useTilt: Container or GSAP not available");
        return;
      }

      const elements = container.querySelectorAll<HTMLElement>(`.${className}`);

      if (elements.length === 0) {
        console.warn(
          `useTilt: No elements found with className "${className}"`,
        );
        return;
      }

      console.log(`useTilt: Initialized ${elements.length} elements`);

      const cleanupFunctions: (() => void)[] = [];

      elements.forEach((el) => {
        // Set initial 3D transform properties
        gsap.set(el, {
          transformPerspective: perspective,
          transformStyle: "preserve-3d",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          // Normalize to -1 to 1 range
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

          gsap.to(el, {
            rotateY: x * maxRotate,
            rotateX: -y * maxRotate,
            duration,
            ease,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            duration: duration * 1.5,
            ease,
          });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup function
        cleanupFunctions.push(() => {
          el.removeEventListener("mousemove", handleMouseMove);
          el.removeEventListener("mouseleave", handleMouseLeave);
          gsap.killTweensOf(el);
        });
      });

      // Return cleanup for this effect
      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    };

    script.onerror = () => {
      console.error("useTilt: Failed to load GSAP");
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [maxRotate, perspective, duration, ease, className, disableOnTouch]);

  return containerRef;
}
