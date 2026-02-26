"use client";

import gsap from "gsap";
import { useRef, useCallback, useEffect } from "react";

export function useParallaxSlider(duration = 45) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const initAnimation = useCallback(() => {
    if (!trackRef.current || isInitializedRef.current) return;

    const track = trackRef.current;

    const measure = () => {
      const setWidth = track.scrollWidth / 2;

      if (setWidth === 0) return;

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
    };

    rafRef.current = requestAnimationFrame(() => {
      const images = Array.from(track.querySelectorAll("img"));
      const unloaded = images.filter((img) => !img.complete);

      if (unloaded.length === 0) {
        measure();
      } else {
        Promise.all(
          unloaded.map(
            (img) =>
              new Promise((r) => {
                img.onload = r;
                img.onerror = r;
              }),
          ),
        ).then(measure);
      }
    });
  }, [duration]);

  useEffect(() => {
    initAnimation();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      isInitializedRef.current = false;
      initAnimation();
    };

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
