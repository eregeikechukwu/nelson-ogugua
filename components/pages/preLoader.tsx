"use client";

import { useReconGsap } from "@/hooks/gsap";
import { useLetterReveal } from "@/hooks/gsap/useLetterReveal";
import { usePreloader } from "@/hooks/gsap/usePreloader";
import { useIsClientLoaded } from "@/hooks/useIsClientLoaded";
import { useEffect, useRef, useState } from "react";

export default function PreLoader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Recon GSAP effects
  useReconGsap();

  const { containerRef, page } = usePreloader(setIsLoading);
  const [displayPage, setDisplayPage] = useState("/");

  const displayRef = useRef<HTMLDivElement | null>(null);

  const isClientLoaded = useIsClientLoaded();

  // Call stagger text animation on display name
  useLetterReveal(displayRef, displayPage);

  const parseDisplaypage = (pageStr: string) => {
    if (pageStr.includes("#")) {
      const formatted = pageStr.replace("/", "").replace("#", "");
      return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
    }
    if (pageStr === "/") return "/";
    return (
      pageStr.replace("/", "").slice(0, 1).toUpperCase() +
      pageStr.replace("/", "").slice(1)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplayPage(parseDisplaypage(page.current));
    }, 0);
  }, [page]);

  console.log(
    "PreLoader rendering for page:",
    displayPage
      .trim()
      .split("")
      .map((char) => char),
  );

  return (
    <div className="relative w-screen no-scrollbar h-screen !overflow-hidden w-screen bg-[var(--background)] ">
      <div
        ref={containerRef}
        className={` ${isClientLoaded ? "" : "opacity-0"}  fixed inset-0  z-[9999] bg-black  flex-col will-change-transform  hidden`}
      >
        <div
          className={` ${displayPage !== "/" ? "hidden" : ""} flex flex-col  h-full w-full bg-[var(--background)]  px-16 md:!px-5`}
        >
          <div
            className={`lg:text-[7rem] md:text-[5rem] text-[3.6rem] mt-53 md:!mt-[1.875rem] leading-[1]`}
          >
            <span className="outliner portfolio">
              Portfolio<span className="blinking-fill">.</span>
            </span>
          </div>
          <div className="md:text-[13rem] text-[4.78rem] !mt-auto ml-auto text-end md:!mb-4 mb-55 leading-[1.2] md:leading-[1] w-full">
            <span className="gradient-text inline-block name1 translate-y-[4rem]">
              Nelson
            </span>
            <br />
            <span className="gradient-text inline-block name2 mr-40">
              Ogugua
            </span>
          </div>
        </div>

        <div
          className={`pageName  center-content h-full ${displayPage.trim().length === 1 || displayPage === "/" ? "!hidden" : ""} bg-[var(--background)]`}
        >
          <div ref={displayRef}>
            <h1 className="letter-reveal text-[3rem] md:text-[5rem]">
              {displayPage.split("").map((char, index) => (
                <span key={index} className="letter inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            &nbsp;
          </div>
          <span className="blinking-fill translate-y-[-1.4rem] md:translate-y-[-1.5rem] text-[5rem] md:!text-[8rem]">
            .
          </span>
        </div>
      </div>

      {/* yellow wrapper */}
      <div
        className={`loader-wrapper absolute inset-0 min-w-screen h-[70vh] bg-yellow-500 will-change-transform ${!isClientLoaded ? "opacity-0" : ""} ${displayPage !== "/" ? "hidden" : ""} `}
      >
        <div className="bg-white w-full white-wrapper h-[85%]" />
        &nbsp;
      </div>
    </div>
  );
}
