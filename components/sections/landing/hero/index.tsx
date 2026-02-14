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
    <section
      id="home"
      className="container max-md:!pt-[1.5rem] flex flex-col md:gap-[2.215rem] gap-32 "
    >
      {/* h1's and image */}
      <div className="flex md:flex-row flex-col md:gap-0 gap-32 justify-between items-center md:!mb-[1rem] mb-0">
        <div className="md:text-left text-center line-reveal-container md:order-1 order-2">
          <Greetings />
          <h1 data-text="I'm Nelson" className="largeText  line">
            I&apos;m Nelson
          </h1>
          <h1 data-text="Ogugua" className="largeText  line">
            Ogugua
          </h1>
        </div>

        <div className="w-[9.2rem] md:w-[17.6875rem]  md:order-2 order-1 h-auto popOut">
          <RotatingSVG />
        </div>
      </div>

      {/* Short descrption */}
      <div className="stagger-reveal-container md:text-left text-center leading-[1.7] md:!leading-[1.78] text-14 md:!text-[1.125rem]">
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
      <div className="flex md:gap-[1rem] gap-10 md:w-auto w-full md:justify-start justify-center">
        <div className="basis-1/2 md:basis-auto">
          <Button link="/contact" variant="normal">
            Work with me
          </Button>
        </div>
        <div className="basis-1/2 md:basis-auto">
          <Button link="/about" variant="dark">
            view my works
          </Button>
        </div>
      </div>
    </section>
  );
}
