"use client";

import { About } from "@/components/sections/landing/about";
import { Hero } from "@/components/sections/landing/hero";
import ParallaxSlider from "@/components/sections/landing/parallaxSlider";
import { useReconGsap } from "@/hooks/gsap";

export default function Home() {
  useReconGsap();

  return (
    <main>
      <Hero />
      <ParallaxSlider />
      <About />
    </main>
  );
}
