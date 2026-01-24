"use client";

import StaggeredText from "@/hooks/staggeredHover/staggeredHover";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "ABOUT", link: "#about" },
  { name: "WORKS", link: "#works" },
  { name: "CONTACT", link: "#contact" },
];

export function Nav() {
  return (
    <div className="container py-30 flex justify-between items-center">
      <Image
        alt="logo"
        height={20}
        width={153}
        src="/logo.png"
        className="h-20 w-153"
      />

      <nav className="flex items-center gap-39 h-[1rem]">
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
  );
}
