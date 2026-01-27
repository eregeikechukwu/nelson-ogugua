"use client";

import { useLayoutEffect, useRef } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
) {
  const previousScrollY = useRef(0);

  // BEcause useEFfect returns a null
  useLayoutEffect(() => {
    const header = document.getElementById("hero") as HTMLElement;
    const options = {
      root: null,
      threshold: 0,
        rootMargin: "-64px",
    };

    if (!ref || !header) return;
    //for hiding the nav when scrolling down
    window.addEventListener("scroll", () => {
      if (
        window.scrollY > previousScrollY.current + 200 &&
        ref?.current?.classList.contains("sticky")
      ) {
        previousScrollY.current = window.scrollY;
        ref?.current.classList.remove("sticky-down");
      }

      if (
        window.scrollY < previousScrollY.current - 100 &&
        ref?.current?.classList.contains("sticky")
      ) {
        previousScrollY.current = window.scrollY;
        ref?.current.classList.add("sticky-down");
      }
      if (window.scrollY < 100) {
        ref?.current?.classList.remove("sticky-down");
        ref?.current?.classList.remove("sticky");
      }
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref?.current?.classList.remove("sticky");
      } else {
        ref?.current?.classList.add("sticky");
      }
    }, options);

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
