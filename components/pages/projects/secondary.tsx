import { Button } from "@/components/secondary/button";
import { H2 } from "@/components/typography/h2";
import {
  BigPassiveText,
  PassiveTextWithContainer,
} from "@/components/typography/passiveText";
import Link from "next/link";

export function WhatOthersThought({
  whatOthersThought,
}: {
  whatOthersThought: { head: string; content: string }[];
}) {
  return (
    <div className="container flex flex-col md:gap-[3.4rem]">
      {whatOthersThought.map((item) => (
        <div key={item.head} className="flex flex-col md:gap-[1.22rem]">
          <BigPassiveText>{item.head}</BigPassiveText>
          <div className="stagger-reveal-container">
            {item.content.split(" ").map((item, i) => {
              return (
                <span key={`div-${i}`}>
                  <H2 key={`span-${i}`} className="word leading-[1.3]">
                    {item}&nbsp;
                  </H2>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function NextProjectCTA({
  nextLink,
  name,
  description,
}: {
  nextLink: string;
  name: string;
  description: string;
}) {
  return (
    <section className="w-screen bg-[var(--color-cta-gray)] ">
      <div className="w-full max-w-[var(--container-width)] overflow-x-auto !mx-auto flex md:flex-row  flex-col  gap-[1rem]  justify-between items-center !py-[1.5rem] !px-[1rem] md:!px-0">
        {/* content */}
        <div className="flex flex-col gap-[0.875rem] max-w-[45rem]">
          <PassiveTextWithContainer>Next project</PassiveTextWithContainer>
          <H2>{name}</H2>
          <p className="paragraph-text">{description}</p>
        </div>

        {/* Button */}
        <Button link={nextLink}>View project</Button>
      </div>
    </section>
  );
}
