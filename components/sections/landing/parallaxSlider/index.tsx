/* eslint-disable react/jsx-key */
import { memo } from "react";
import {
  Airplane,
  Instagram,
  Facebook,
  Wallet,
  Wallet2,
  Send,
  Heart,
  Star,
  IconProps,
} from "iconsax-react";
import { useParallaxSlider } from "@/hooks/gsap/useParallaxSLider";
import Image from "next/image";

const icons = [
  Facebook,
  Airplane,
  Instagram,
  Wallet2,
  Wallet,
  Heart,
  Star,
  Send,
];

const logos = [
  "/svg/pineapple.svg",
  "/svg/ceedcap.svg",
  "/svg/coren.svg",
  "svg/dbn.svg",
  "/svg/binkey.svg",
  "/svg/dotcampus.svg",
];

const IconItem = memo(function IconItem({
  Icon,
  index,
}: {
  Icon: React.FC<IconProps>;
  index: number;
}) {
  return (
    <div className="px-65 h-full center-content flex-shrink-0 border-gray !border-r-0">
      <Icon
        size="32"
        strokeWidth={2}
        stroke="var(--color-icon-gray)"
        className="font-[700]"
        fill={index % 2 === 0 ? "var(--color-icon-gray)" : "white"}
      />
    </div>
  );
});

export function ParallaxSlider() {
  const { containerRef, trackRef } = useParallaxSlider(10);

  return (
    <div
      className="md:!py-[1.375rem] !mt-[2rem] md:!mt-0 py-12 overflow-hidden lg:mx-auto"
      ref={containerRef}
    >
      <div
        className="md:!h-[8.375rem] h-80 fadedEdges"
        // onMouseEnter={pause}
        // onMouseLeave={play}
      >
        <div ref={trackRef} className="flex w-max h-full !ml-auto">
          {[0, 1].map((_, setIndex) => (
            <div key={setIndex} className="flex h-full">
              {/* {icons.map((Icon, index) => (
                <IconItem
                  key={`${setIndex}-${index}`}
                  Icon={Icon}
                  index={index}
                />
              ))} */}
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="md:!px-[4.375rem] md:!py-[2.125rem] py-33 px-40 h-full center-content flex-shrink-0 border-gray !border-r-0"
                >
                  <Image
                    src={logo}
                    alt="logo"
                    width={140}
                    height={37}
                    className="h-auto md:!max-h-[3rem] max-h-[1.5rem] w-full object-contain"
                  />
                </div>
              ))}
              {/* {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="md:!px-[4.06rem] px-38 h-full center-content flex-shrink-0 border-gray !border-r-0"
                >
                  <p className="text-[#616161] leading-[1.71] text-[1.1875rem] md:text-[1.9rem] font-[900]">
                    LOGO
                  </p>
                </div>
              ))} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
