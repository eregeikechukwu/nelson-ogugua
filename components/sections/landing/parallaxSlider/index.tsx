/* eslint-disable react/jsx-key */
import { useEffect, useRef, memo, useCallback } from "react";
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

export function ParallaxSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const initAnimation = useCallback(() => {
    if (!trackRef.current || isInitializedRef.current) return;

    const track = trackRef.current;
    const firstSet = track.children[0] as HTMLElement;

    // Wait for layout to settle
    rafRef.current = requestAnimationFrame(() => {
      const setWidth = firstSet.offsetWidth;

      if (setWidth === 0) {
        isInitializedRef.current = false;
        return;
      }

      // Kill existing animation
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      // Reset position
      gsap.set(track, { x: 0 });

      // Create seamless infinite loop
      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
        },
      });

      isInitializedRef.current = true;
    });
  }, []);

  useEffect(() => {
    initAnimation();

    const handleResize = () => {
      isInitializedRef.current = false;
      initAnimation();
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [initAnimation]);

  const pause = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const play = useCallback(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="py-22 overflow-hidden lg:mx-auto" ref={containerRef}>
      <div className="h-134" onMouseEnter={pause} onMouseLeave={play}>
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
                <div key={index} className="px-65 h-full center-content flex-shrink-0 border-gray !border-r-0">
                  <p
                    
                    className="text-[#616161] leading-[1.71] text-[1.9rem] font-[900]"
                  >
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
