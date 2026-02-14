"use client";

import { Hamburger } from "@/components/secondary/hamburger";
import Menu from "@/components/secondary/menu";
import StaggeredText from "@/hooks/staggeredHover/staggeredHover";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useScreenSize } from "@/hooks/useScreenSize";
import { navItems } from "@/utils/Links";
import Link from "next/link";
import { useRef, useState } from "react";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(navRef, isMenuOpen);
  const { isSmall } = useScreenSize();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        ref={navRef}
        className={`${isMenuOpen && "menu-open"} md:py-[1.875rem] py-16 px-16 md:px-0 sticky flex justify-center items-center h-[var(--nav-height-sm)] md:h-[var(--nav-height)]`}
      >
        <div className="max-w-[var(--container-width)] w-full flex justify-between items-center">
          <Link href={"/#home"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="logo"
              height={20}
              width={153}
              src="/svg/logo.svg"
              className="md:h-[1.25rem] h-17 w-auto"
            />
          </Link>

          {/* Hamburger for large screens */}
          <Hamburger onClick={toggleMenu} />
          {/* Nav list for large screens */}
          {!isSmall && (
            <nav className="md:flex items-center gap-39 h-[1rem] hidden ">
              {navItems.map((item, i) => (
                <Link
                  href={item.link}
                  className="link flex"
                  key={`nav-item-${i}`}
                >
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
          )}
        </div>
      </div>

      {/* Menu for mobile */}
      <Menu isModalOpen={isMenuOpen} toggleModal={toggleMenu} />
    </>
  );
}
