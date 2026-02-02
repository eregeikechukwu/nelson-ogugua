"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export function usePreloader(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const page = useRef<string>("");
  // Preloader logic to be implemented
  const containerRef = useRef<HTMLDivElement>(null);
  // const [page, setPage] = useState<string>("");
  const pathName = usePathname() || "";

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      page.current = `${pathName}${hash}`;
    } else {
      page.current = pathName;
    }

    // GSAP animation refs
    const container = containerRef.current;

    if (!container) return;

    //Set display first before chacking for children
    container.style.display = "flex";

    const portfolio = container.querySelector(".portfolio");
    const name1 = container.querySelector(".name1");
    const name2 = container.querySelector(".name2");
    const dot = container.querySelector(".blinking-fill");
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const pageName = container.querySelector(".pageName");

    loaderWrapper?.classList.replace("hidden", "block");

    console.log("usePreloader current page:", pageName);

    // Animations for in page transition
    if (page.current !== "/") {
      gsap.set(pageName, {
        opacity: 0,
        y: 50,
      });

      const p1 = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      p1.to(pageName, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 1,
      }).to(pageName, {
        duration: 0.7,
        opacity: 0,

        yPercent: -100,
      });
      return;
    }

    if (!name1 || !name2 || !portfolio || !dot) {
      // console.log("Preloader elements not found");
      return;
    }

    // Aggressive initial states for dramatic entrance for home initial load
    gsap.set([name1, name2], {
      y: 200,
      rotationX: 90,
      opacity: 0,
      transformPerspective: 1000,
      transformOrigin: "50% 0%",
    });

    gsap.set(portfolio, {
      x: -100,
      opacity: 0,
      rotationY: -25,
      transformPerspective: 800,
    });

    gsap.set(dot, {
      scale: 0,
      rotationY: -180,
      transformPerspective: 1000,
    });
    gsap.set(loaderWrapper, {
      top: "100vh",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      },
    });

    tl
      // Portfolio slides in with 3D rotation
      .to(
        portfolio,
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0.3,
      )

      // Dot spins in dramatically
      .to(
        dot,
        {
          scale: 1,
          rotation: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(2)",
        },
        "-=0.6",
      )

      // Names flip in from 3D space with visible rotation
      .to(
        name1,
        {
          y: 30,
          rotationX: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=0.4",
      )

      .to(
        name2,
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=1.4",
      )

      // Hold the moment
      .to({}, { duration: 0.5 })

      .to(
        portfolio,
        {
          backgroundPositionX: "150%",
          duration: 1,
          ease: "none",
          repeat: 0,
        },
        "0.5",
      )

      // Everything scales down slightly (anticipation)
      .to([portfolio, name1, name2], {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      })

      // VIOLENT upward explosion with rotation
      .to(
        container,
        {
          rotationX: -8,
          scale: 1.1,
          duration: 1,
          ease: "power4.in",
          transformOrigin: "50% 100%",
        },
        "+=0.05",
      )

      // Fade to black as it exits
      .to(
        container,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.3",
      )

      // wrapper scroll up
      .to(loaderWrapper, {
        top: "-100vh",
        duration: 1.5,
        ease: "0.03,1.19,0,0.97",
      });

    return () => {
      tl.kill();
    };
  }, [setIsLoading, page, pathName]);
  return { containerRef, page };
}
