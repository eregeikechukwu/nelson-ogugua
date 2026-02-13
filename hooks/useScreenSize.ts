"use client";

import { useEffect, useState } from "react";

export function useScreenSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setisSmall] = useState(false);
  const [isDesktop, setisDesktop] = useState(false);

  useEffect(() => {
    // Set screen mode

    if (window.screen.width > 768) {
      // Large, desktop
      setTimeout(() => {
        setIsMobile(false);
        setisSmall(false);
        setisDesktop(true);
      }, 0);
    } else {
      //Generally small
      if (window.screen.width < 576) {
        //MObile
        setTimeout(() => {
          setIsMobile(false);
          setisSmall(true);
          setisDesktop(false);
        }, 0);
      }

      if (window.screen.width < 576) {
        //MObile
        setTimeout(() => {
          setIsMobile(true);
          setisSmall(true);
          setisDesktop(false);
        }, 0);
      }
    }
  }, []);

  return { isMobile, isSmall, isDesktop };
}
