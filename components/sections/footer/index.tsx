"use client";

import { NameSVG } from "@/components/secondary/nameSVG";
import { RotatingSVG } from "@/components/secondary/rotatingSVG";
import { PassiveText } from "@/components/typography/passiveText";
import { useParallaxSlider } from "@/hooks/gsap/useParallaxSLider";
import { footerLinksPages, footerLinksSocials } from "@/utils/Links";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const FooterList = ({ list }: { list: { name: string; href: string }[] }) => {
  return (
    <div className=" flex flex-col gap-32">
      {list.map((item, i) => (
        <Link key={`item-${i}`} href={item.href}>
          <h1 className=" text-white uppercase font-bold flex items-center gap-6  animate-hover2">
            <span className=" inline-block w-4 h-[-webkit-fill-available] bg-[var(--color-yellow)]" />
            <span className="translate-y-[3px] text-14 tracking-[2px] leading-[1]">
              {item.name}
            </span>
          </h1>
        </Link>
      ))}
    </div>
  );
};

export function Footer() {
  const { containerRef, trackRef } = useParallaxSlider();

  return (
    <footer className=" container !max-w-screen pb-30 flex flex-col gap-50 items-center">
      {/* Name */}
      <div className="flex flex-col gap-32 items-center">
        <div className="flex-col flex items-center gap-32">
          {/* Rotating SVG */}
          <div className="w-[11rem] ">
            <RotatingSVG />
          </div>

          {/* SLiding name */}
          <div
            className="py-22 w-screen overflow-hidden lg:mx-auto"
            ref={containerRef}
          >
            <div className="h-auto">
              <div ref={trackRef} className="flex w-full h-full !ml-auto">
                {[0, 1].map((_, setIndex) => (
                  <div key={setIndex} className="flex h-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-full center-content flex-shrink-0 text-[14rem]"
                      >
                        <NameSVG>Nelson&nbsp;Ogugua</NameSVG>
                        <span className=" leading-[1] text-[var(--color-yellow)] ">
                          &nbsp;.&nbsp;
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-[17.35rem] absolute -top-[15%] right-[20%]">
          <RotatingSVG />
        </div>

        <div className="">
          <h1 className="extralargeText">Nelson</h1>
          <h1 className="extralargeText">Ogugua</h1>
        </div> */}

        {/* Links */}

        <div className="flex gap-88 w-full max-w-[var(--container-width)]">
          <FooterList list={footerLinksPages} />
          <FooterList list={footerLinksSocials} />
        </div>
      </div>

      {/* Landing */}
      <div className="p-24 border-gray flex w-full max-w-[var(--container-width)]">
        <PassiveText>
          © 2026 &bull; Designed by NELSON OGUGUA &bull;&nbsp;
        </PassiveText>
        <Link
          href={"https://nelson-erege-portfolio.vercel.app"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-5  hover:animate-pulse items-center"
        >
          <PassiveText>BUILT BY NELSON EREGE</PassiveText>{" "}
          <span className="translate-y-[-0.15rem]">
            <ExternalLink size={15} stroke="var(--color-text-gray)" />
          </span>
        </Link>
      </div>
    </footer>
  );
}
