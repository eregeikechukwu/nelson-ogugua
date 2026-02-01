"use client";

import { PageWrapper } from "@/components/pages/pageWrapper";
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
    <PageWrapper>
      <main>
        <Hero />
        <ParallaxSlider />
        <About />
        <Expertise />
        <Services />
        <Projects />
        <Testimonial />
      </main>
    </PageWrapper>
  );
}
