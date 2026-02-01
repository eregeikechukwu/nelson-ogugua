"use client";

import { useReconGsap } from "@/hooks/gsap";
import { useEffect, useState } from "react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Recon GSAP fpr that page
  useReconGsap();

  useEffect(() => {
    setTimeout(() => {
      setIsClientLoaded(true);
    }, 0);
  }, []);

  if (!isClientLoaded) {
    // make page opcity 0 until client is loaded to prevent hydration mismatch
    return <div className="page-wrapper opacity-0">{children}</div>;
  }

  return <div className="page-wrapper !mt-[var(--nav-height)]">{children}</div>;
}
