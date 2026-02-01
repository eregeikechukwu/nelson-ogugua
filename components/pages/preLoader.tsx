"use client";

import { usePreloader } from "@/hooks/gsap/usePreloader";
import { useIsClientLoaded } from "@/hooks/useIsClientLoaded";
import { useEffect, useState } from "react";

export default function PreLoader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { containerRef, page } = usePreloader(setIsLoading);
  const [displayPage, setDisplayPage] = useState("/");

  const isClientLoaded = useIsClientLoaded();

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

  console.log("PreLoader page prop:", page);
  console.log("PreLoader rendering for page:", displayPage.length);

  return (
    <div className="relative w-screen no-scrollbar h-screen !overflow-hidden w-screen">
      <div
        ref={containerRef}
        className={` ${isClientLoaded ? "" : "opacity-0"}  fixed inset-0  z-[9999] bg-black  flex-col will-change-transform hidden`}
      >
        <div
          className={` ${displayPage !== "/" ? "hidden" : ""} flex flex-col  h-full w-full`}
        >
          <div className={`text-[7rem] ml-20 mt-30 leading-[1]`}>
            <span className="outliner portfolio">
              Portfolio<span className="blinking-fill">.</span>
            </span>
          </div>
          <div className="text-[13rem] !mt-auto ml-auto text-end leading-[1] w-full">
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
          className={`pageName center-content text-[5rem] h-full ${displayPage.trim().length === 1 || displayPage === "/" ? "!hidden" : ""}`}
        >
          {displayPage}&nbsp;
          <span className="blinking-fill translate-y-[-1rem] !text-[8rem]">
            .
          </span>
        </div>
      </div>

      {/* yellow wrapper */}
      <div
        className={`loader-wrapper hidden absolute inset-0 min-w-screen h-[70vh] bg-yellow-500 will-change-transform ${!isClientLoaded ? "opacity-0" : ""}`}
      >
        &nbsp;
      </div>
    </div>
  );
}
