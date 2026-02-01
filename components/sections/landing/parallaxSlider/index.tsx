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
  const { containerRef, trackRef} = useParallaxSlider();

  return (
    <div className="py-22 overflow-hidden lg:mx-auto" ref={containerRef}>
      <div
        className="h-134 fadedEdges"
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
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="px-65 h-full center-content flex-shrink-0 border-gray !border-r-0"
                >
                  <p className="text-[#616161] leading-[1.71] text-[1.9rem] font-[900]">
                    LOGO
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
