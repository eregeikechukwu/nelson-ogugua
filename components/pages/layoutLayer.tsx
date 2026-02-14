"use client";

import { useEffect, useState } from "react";
import PreLoader from "./preLoader";
import { useHardScroll } from "@/hooks/gsap/useHardScroll";
import { usePathname } from "next/navigation";

export function LayoutLayer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
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
