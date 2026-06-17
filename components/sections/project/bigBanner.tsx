import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

export function BigBanner({ imgUrl }: { imgUrl: string }) {
  return (
    <motion.div className="center-content" {...fadeUp}>
      <Image
        src={imgUrl}
        alt="big banner"
        width={1440}
        height={709}
        className="w-screen max-w-[100rem] h-auto object-cover"
      />
    </motion.div>
  );
}

export function Banner({
  imgUrl,
  rounded = true,
  className,
}: {
  imgUrl: string;
  rounded?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`center-content overflow-hidden ${rounded ? "md:rounded-[1rem] rounded-[0.5rem] " : ""}  ${className || ""}`}
      {...fadeUp}
    >
      <Image
        src={imgUrl}
        alt="banner"
        width={1072}
        height={504}
        className="w-full max-w-[100rem] h-auto object-cover"
      />
    </motion.div>
  );
}
