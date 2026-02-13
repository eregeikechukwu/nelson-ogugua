"use client";

import { Hamburger } from "@/components/secondary/hamburger";
import StaggeredText from "@/hooks/staggeredHover/staggeredHover";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Link from "next/link";
import { useRef } from "react";

const navItems = [
  { name: "ABOUT", link: "/about" },
  { name: "WORKS", link: "/works" },
  { name: "CONTACT", link: "/contact" },
];

export function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(navRef);

  return (
    <div
      ref={navRef}
      className="md:py-30 py-16 px-16 md:px-0 sticky flex justify-center items-center h-72 md:h-auto"
    >
      <div className="max-w-[var(--container-width)] w-full flex justify-between items-center">
        <Link href={"/#home"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="logo"
            height={20}
            width={153}
            src="/svg/logo.svg"
            className="md:h-20 h-17 w-auto"
          />
        </Link>

        <Hamburger />
        <nav className="md:flex items-center gap-39 h-[1rem] hidden ">
          {navItems.map((item, i) => (
            <Link href={item.link} className="link flex" key={`nav-item-${i}`}>
              <StaggeredText
                id={`nav-item-${i}-small`}
                size="0.667rem"
                className="tracking-[0.111rem] uppercase font-[600] text-[var(--color-white)] overflow-hidden"
              >
                {item.name}
              </StaggeredText>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
