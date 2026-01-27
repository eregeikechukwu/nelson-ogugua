"use client";

import gsap from "gsap";
import { useRef, useCallback, useEffect } from "react";

export function useParallaxSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const initAnimation = useCallback(() => {
    if (!trackRef.current || isInitializedRef.current) return;

    const track = trackRef.current;
    const firstSet = track.children[0] as HTMLElement;

    // Wait for layout to settle
    rafRef.current = requestAnimationFrame(() => {
      const setWidth = firstSet.offsetWidth;

      if (setWidth === 0) {
        isInitializedRef.current = false;
        return;
      }

      // Kill existing animation
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      // Reset position
      gsap.set(track, { x: 0 });

      // Create seamless infinite loop
      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
        },
      });

      isInitializedRef.current = true;
    });
  }, []);

  useEffect(() => {
    initAnimation();

    const handleResize = () => {
      isInitializedRef.current = false;
      initAnimation();
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [initAnimation]);

  const pause = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const play = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  return { containerRef, trackRef, pause, play };
}
