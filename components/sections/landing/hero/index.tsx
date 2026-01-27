"use client";

import { Button } from "@/components/secondary/button";
import Greetings from "@/components/secondary/greetings";
import { RotatingSVG } from "@/components/secondary/rotatingSVG";
import { useSlowScroll } from "@/hooks/gsap/useSlowScroll";
import { useRef } from "react";

const descrption =
  "I am a Product and Brand Designer with 6+ years of experience crafting intuitive digital experiences. I’m passionate about understanding user needs and translating them into innovative, user-centric designs. With a strong foundation in design principles and a keen eye for detail, I deliver exceptional products that drive business growth. Let's create something extraordinary together!";

export function Hero() {
  const slowScrollRef = useRef<HTMLDivElement | null>(null);
  useSlowScroll(slowScrollRef, {
    initialY: -100,
    transformY: 100,
    duration: 1,
  });

  return (
    <section id="hero" className="container flex flex-col gap-34 ">
      {/* h1's and image */}
      <div className="flex justify-between items-center mb-16">
        <div className="text-left line-reveal-container">
          <Greetings />
          <h1 data-text="I'm Nelson" className="largeText  line">
            I&apos;m Nelson
          </h1>
          <h1 data-text="Ogugua" className="largeText  line">
            Ogugua
          </h1>
        </div>

        <div className=" w-[17.6875rem] h-auto popOut">
          <RotatingSVG />
        </div>
      </div>

      {/* Short descrption */}
      <div className="stagger-reveal-container leading-[1.78] text-18">
        {descrption.split(" ").map((item, i) => {
          return (
            <span key={`div-${i}`} className="text-[var(--color-text-gray)]">
              <span key={`span-${i}`} className="word">
                {item}&nbsp;
              </span>
            </span>
          );
        })}
      </div>

      {/* buttons */}
      <div className="flex gap-16">
        <Button link="/about" variant="light">
          Hire me
        </Button>
        <Button link="/about" variant="dark">
          view my works
        </Button>
      </div>
    </section>
  );
}
