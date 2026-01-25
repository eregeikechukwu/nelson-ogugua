import { Button } from "@/components/secondary/button";
import { Title } from "@/components/secondary/title";
import { socials } from "@/utils/socials";
import Link from "next/link";

const paragrapgh =
  "For the last 5 years, I’ve worked as a brand and product designer. From startups to big B2B companies. I don’t just make things look good; I understand how the whole system connects. I move easily between brand design and the product side to give you the best results.";

export function About() {
  return (
    <section id="about" className="container flex justify-between">
      <div className="flex flex-col gap-60">
        <div className="flex flex-col gap-20">
          <Title>About me</Title>

          <div className="line-reveal-container text-left">
            <h1 data-text="Users First." className="mediumText line">
              Users First.
            </h1>
            <h1 data-text="Pixels Second." className="mediumText line">
              Pixels Second.
            </h1>
          </div>
        </div>

        {/* SOcials */}
        <div className="flex flex-col  gap-18 items-start">
          <p className="text-[var(--color-text-gray)] text-[1.0375rem]">
            Let&apos;s connect
          </p>

          {/* social icons */}
          <div className="flex justify-between gap-[0.74444rem]">
            {socials.map((item, i) => (
              <Link href={item.link} key={i} className="animate-hover">
                <div className="bg-[var(--color-gray-transparent)] h-32 w-32 center-content rounded-[0.5556rem] ">
                  <item.icon
                    width={18.9}
                    height={18.9}
                    size={18.9}
                    stroke="white"
                    key={`social-${i}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Text & CTA */}
      <div className="max-w-[24.625rem] flex flex-col gap-40">
        <div className="stagger-reveal-container leading-[1.78] text-18">
          {paragrapgh.split(" ").map((item, i) => {
            return (
              <span key={`div-${i}`} className="text-[var(--color-text-gray)]">
                <span key={`span-${i}`} className="word">
                  {item}&nbsp;
                </span>
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <Button link="/about">More About Me</Button>
      </div>
    </section>
  );
}
