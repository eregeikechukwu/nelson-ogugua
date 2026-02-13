"use client";

import { useEffect, useState } from "react";
import PreLoader from "./preLoader";
import { useHardScroll } from "@/hooks/gsap/useHardScroll";
import { usePathname } from "next/navigation";

export function LayoutLayer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Alert to switch to desjtop mode on mobile devices
    const screenwidth = window.screen.width;

    if (screenwidth < 700)
      alert("Please turn on desktop mode and rotate your device");
    // Listen to route change and calll preloader
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useHardScroll({
    lerp: 0.1,
    wheelMultiplier: 0.9,
  });

  return (
    <div id="layout-layer">
      {isLoading ? (
        <PreLoader setIsLoading={setIsLoading} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
