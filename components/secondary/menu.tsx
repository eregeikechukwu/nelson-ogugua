"use client";

import StaggeredText from "@/hooks/staggeredHover/staggeredHover";
import { navItems } from "@/utils/Links";
import Link from "next/link";
import { memo, useCallback } from "react";

function Menu({
  isModalOpen,
  toggleModal,
}: {
  isModalOpen: boolean;
  toggleModal: () => void;
}) {
  const onLinkCLick = useCallback(() => {
    setTimeout(() => {
      toggleModal();
    }, 400);
  }, [toggleModal]);

  return (
    <div
      className={`${isModalOpen ? "translate-x-0" : "translate-x-[105%]"} fixed inset-0 transition-transform duration-[0.5s] ease-[cubic-bezier(.65,.16,.82,.92)] z-50 top-[72px] h-[calc(100vh-72px)] w-screen bg-[var(--color-background)]`}
    >
      <nav className="flex flex-col items-left gap-48 px-16 py-31">
        {navItems.map((item, i) => (
          <Link
            onClick={() => onLinkCLick()}
            style={{
              transform: `${isModalOpen ? "translateX(0)" : "translateX(100vw)"}`,
              transition: "transform 0.9s cubic-bezier(.23,.67,.49,.92)",
              transitionDelay: `${i * 0.15}s`,
            }}
            href={item.link}
            className="link flex"
            key={`nav-item-${i}`}
          >
            <StaggeredText
              id={`nav-item-${i}-large`}
              size="1.25rem"
              className="tracking-[2.6px] md:!tracking-[1] uppercase  text-[var(--color-white)] overflow-hidden"
            >
              {item.name}
            </StaggeredText>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// Exporting memoized menu
export default memo(Menu);
