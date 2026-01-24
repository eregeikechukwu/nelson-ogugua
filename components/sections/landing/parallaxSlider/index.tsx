import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
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

export default function ParallaxSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const firstSet = track.children[0] as HTMLElement;
    const setWidth = firstSet.offsetWidth;

    gsap.set(track, { x: 0 });

    tweenRef.current = gsap.to(track, {
      x: -setWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    const handleResize = () => {
      tweenRef.current?.kill();
      const newWidth = firstSet.offsetWidth;

      tweenRef.current = gsap.to(track, {
        x: -newWidth,
        duration: 15,
        ease: "none",
        repeat: -1,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      tweenRef.current?.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pause = () => tweenRef.current?.timeScale(0);
  const play = () => tweenRef.current?.timeScale(1);

  return (
    <div className="py-22 overflow-hidden lg:mx-auto" ref={containerRef}>
      <div className="h-[7.94rem]" onMouseEnter={pause} onMouseLeave={play}>
        <div ref={trackRef} className="flex w-max h-full !ml-auto">
          {[0, 1].map((_, setIndex) => (
            <div key={setIndex} className="flex h-full">
              {icons.map((Icon, index) => (
                <IconItem
                  key={`${setIndex}-${index}`}
                  Icon={Icon}
                  index={index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
