import { motion } from "framer-motion";
import { useParallaxSlider } from "@/hooks/gsap/useParallaxSLider";
import Image from "next/image";

const logos = [
  "/svg/pineapple.svg",
  "/svg/ceedcap.svg",
  "/svg/coren.svg",
  "svg/dbn.svg",
  "/svg/binkey.svg",
  "/svg/dotcampus.svg",
];

export function ParallaxSlider() {
  const { containerRef, trackRef, x} = useParallaxSlider(4);

  return (
    <div
      className="md:!py-[1.375rem] !mt-[2rem] md:!mt-0 py-12 overflow-hidden lg:mx-auto"
      ref={containerRef}
    >
      <div
        className="md:!h-[8.375rem] h-82 fadedEdges"
        // onMouseEnter={pause}
        // onMouseLeave={play}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max h-full !ml-auto"
        >
          {Array.from({ length: 2 }).map((_, setIndex) => (
            <div key={setIndex} className="flex h-full">
              {/* className={`${logo.includes("dbn") || logo.includes("pineapple") ? "py-20" : " md:!py-[2.125rem] py-33 "} */}
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className={`md:!py-[2.125rem] py-33 md:!px-[4.375rem]  px-40 h-full center-content flex-shrink-0 border-gray !border-r-0`}
                >
                  <Image
                    src={logo}
                    alt="logo"
                    width={140}
                    height={37}
                    className="h-auto md:!max-h-[3rem] max-h-[1.8rem] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
