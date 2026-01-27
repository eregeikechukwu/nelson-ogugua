"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PreLoader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const portfolio = container.querySelector(".portfolio");
    const name1 = container.querySelector(".name1");
    const name2 = container.querySelector(".name2");
    const dot = container.querySelector(".blinking-fill");
    const loaderWrapper = document.querySelector(".loader-wrapper");

    //hide constainer before client is ready
    container.style.display = "flex";
    loaderWrapper?.classList.replace("hidden", "block");

    if (!name1 || !name2 || !portfolio || !dot) {
      return;
    }

    // Aggressive initial states for dramatic entrance
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
  }, [setIsLoading]);

  return (
    <div className="relative w-screen no-scrollbar h-screen !overflow-hidden w-screen">
      <div
        ref={containerRef}
        className="fixed inset-0  z-[9999] bg-black  flex-col will-change-transform hidden"
      >
        <div className="text-[7rem]  ml-20 mt-30 leading-[1]">
          <span className="outliner portfolio">
            Portfolio<span className="blinking-fill">.</span>
          </span>
        </div>
        <div className="text-[13rem] !mt-auto ml-auto text-end leading-[1] w-full">
          <span className="gradient-text inline-block name1 translate-y-[4rem]">
            Nelson
          </span>
          <br />
          <span className="gradient-text inline-block name2 mr-40">Ogugua</span>
        </div>
      </div>

      {/* yellow wrapper */}
      <div
        className={`loader-wrapper hidden absolute left-0 right-0 min-w-screen h-[70vh] bg-yellow-500 will-change-transform`}
      >
        &nbsp;
      </div>
    </div>
  );
}
