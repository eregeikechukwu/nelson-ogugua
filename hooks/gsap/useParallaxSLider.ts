"use client";

import gsap from "gsap";
import { useRef, useCallback, useEffect } from "react";

export function useParallaxSlider(duration = 45) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isInitializedRef = useRef(false);

  const startAnimation = useCallback(
    (setWidth: number) => {
      if (!trackRef.current) return;
      const track = trackRef.current;

      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      gsap.set(track, { x: 0 });

      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => void gsap.set(track, { x: 0 }),
      });

      isInitializedRef.current = true;
    },
    [duration],
  );

  const initAnimation = useCallback(() => {
    if (!trackRef.current) return;

    isInitializedRef.current = false;

    const track = trackRef.current;
    let lastWidth = 0;
    let stableFrames = 0;
    const requiredStableFrames = 10; // ~160ms at 60fps
    let rafId: number;

    const pollWidth = () => {
      const currentWidth = track.scrollWidth;

      if (currentWidth > 0 && currentWidth === lastWidth) {
        stableFrames++;
      } else {
        stableFrames = 0;
        lastWidth = currentWidth;
      }

      if (stableFrames >= requiredStableFrames) {
        const setWidth = track.scrollWidth / 2;
        if (setWidth > 0) {
          startAnimation(setWidth);
        }
        return; // stop polling
      }

      rafId = requestAnimationFrame(pollWidth);
    };

    rafId = requestAnimationFrame(pollWidth);

    return () => cancelAnimationFrame(rafId);
  }, [startAnimation]);

  useEffect(() => {
    const cleanup = initAnimation();

    let resizeTimeout: NodeJS.Timeout;

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initAnimation();
      }, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      cleanup?.();
      if (tweenRef.current) tweenRef.current.kill();
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [initAnimation]);

  const pause = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  const play = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return { containerRef, trackRef, pause, play };
}
