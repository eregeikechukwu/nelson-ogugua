"use client";

import {
  Testimonial,
  About,
  Expertise,
  Hero,
  ParallaxSlider,
  Projects,
  Services,
} from "@/components/sections/landing";
import { useReconGsap } from "@/hooks/gsap";

export default function Home() {
  useReconGsap();

  return (
    <main>
      <Hero />
      <ParallaxSlider />
      <About />
      <Expertise />
      <Services />
      <Projects />
      <Testimonial />
    </main>
  );
}
