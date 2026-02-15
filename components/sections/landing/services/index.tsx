"use client";

import { Button } from "@/components/secondary/button";
import { CTA } from "@/components/secondary/cta";
import { Title } from "@/components/secondary/title";
import { useTilt } from "@/hooks/gsap/useTilt";
import { services } from "@/utils/services";
import Image from "next/image";
// import Image from "next/image";

export function Services() {
  const tiltRef = useTilt({
    maxRotate: 15,
    perspective: 1200,
    className: "tilt-card",
  });

  return (
    <section id="services" className="container">
      <div className="w-full flex flex-col gap-20 pb-24 md:pb-[1.625rem] border-bottom">
        <Title>Services</Title>
        <div className="line-reveal-container">
          <h1 data-text="What I Can Do For You" className="line mediumText">
            What I Can Do For You
          </h1>
        </div>
      </div>

      {/* Services */}
      <div ref={tiltRef}>
        {services.map((service, i) => {
          return (
            <div
              key={i}
              className="border-bottom py-40 flex flex-col gap-24 md:!gap-0 md:flex-row justify-between"
            >
              {/* Writings */}
              <div className="flex order-2 md:order-1 flex-col gap-28 max-w-[34rem]">
                <div className="flex flex-col gap-18">
                  <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-white">
                    {service.name}
                  </h2>
                  <div className="stagger-reveal-container">
                    {service.paragrapgh.split(" ").map((word, i) => (
                      <span
                        key={`div-${i}`}
                        className="text-[var(--color-text-gray)] !leading-[1] md:text-[1rem] text-[0.875rem] "
                      >
                        <span key={`span-${i}`} className="word !leading-[1]">
                          {word}&nbsp;
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services list */}
                <div className="flex flex-col gap-24 ">
                  <h3 className="uppercase leading-[2] text-12 font-bold tracking-[2px]">
                    {service.name} services
                  </h3>
                  <div className="flex flex-col gap-24 slide-in-container">
                    {service.subServices.map((item, i) => (
                      <p
                        key={i}
                        className="flex items-center gap-15 text-white leading-[1] md:text-[1rem] text-[0.875rem] slide"
                      >
                        <span className="inline-block rounded-[2px] h-10 w-10 bg-[var(--color-yellow)] -translate-y-[2px]" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* IMage */}
              <div className="order-1 md:order-2 max-w-[29.375rem] max-md:!h-[15rem] md:!max-h-[30rem] overflow-hidden object-cover">
                <Image
                  width={470}
                  height={345}
                  src={service.banner}
                  alt={service.name}
                  className="md:!object-cover h- h-full tilt-card cursor-pointer"
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <img
                  src={service.banner}
                  width={470}
                  height={345}
                  alt="banner image"
                  className="object-cover h-full tilt-card cursor-pointer"
                /> */}
              </div>
            </div>
          );
        })}
      </div>

      <CTA>
        <Button link="/contact">Work with Me</Button>
      </CTA>
    </section>
  );
}
