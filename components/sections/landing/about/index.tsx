import { Button } from "@/components/secondary/button";
import { Title } from "@/components/secondary/title";
import { useScreenSize } from "@/hooks/useScreenSize";
import { socials } from "@/utils/socials";
import Link from "next/link";

const paragrapgh =
  "Technology loses its meaning without empathy. My process begins with the user's story. I try to understand the 'who' and the 'why' before touching the 'how.' I craft digital products that don't just look good; they simplify complexity.";

const Socials = () => {
  return (
    <div className="flex flex-col  gap-18 items-start">
      <p className="text-[var(--color-text-gray)] text-[0.875rem] md:text-[1.0375rem]">
        Let&apos;s connect
      </p>

      {/* social icons */}
      <div className="flex justify-between gap-[0.8375rem] md:gap-[0.74444rem]">
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
  );
};

export function About() {
  const { isSmall, isMobile } = useScreenSize();

  console.log(isMobile);

  return (
    <section
      id="about"
      className="container flex md:flex-row flex-col justify-between md:gap-0 gap-24"
    >
      <div className="flex flex-col gap-0 md:gap-[3.75rem]">
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

        {!(isSmall || isMobile) && (
          // {/* SOcials for desktop*/}
          <Socials />
        )}
      </div>

      {/* Text & CTA */}
      <div className="max-w-[24.625rem] flex flex-col gap-40">
        <div className="stagger-reveal-container leading-[1.78] paragraph-text">
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

        {/* SOcials for mobile */}
        {isSmall || isMobile ? <Socials /> : null}

        {/* CTA */}
        <Button link="/about">More About Me</Button>
      </div>
    </section>
  );
}
