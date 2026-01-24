"use client";

import { useRef, useState } from "react";
import styles from "./staggeredHover.module.scss";
import { motion } from "framer-motion";

interface TextProps {
  Letters: string;
  id: string;
  startAnimation: { y: string };
  size: string;
  className?: string;
}

function Text({ Letters, id, startAnimation, size, className }: TextProps) {
  const delay = 0.05;

  return (
    <div className={`${styles.staggeredText__container} ${className || ""}`}>
      {/* First line - visible by default */}
      <div className={styles.staggeredText__line}>
        {Letters.split("").map((letter, index) => (
          <motion.span
            animate={startAnimation}
            transition={{
              delay: index * delay,
              duration: 0.3,
              ease: "easeOut",
            }}
            key={`first-${index}-${id}`}
            style={{ fontSize: size }}
            className={styles.staggeredText__letter}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Second line - revealed on hover */}
      <div className={styles.staggeredText__line}>
        {Letters.split("").map((letter, index) => (
          <motion.span
            animate={startAnimation}
            transition={{
              delay: index * delay,
              duration: 0.3,
              ease: "easeOut",
            }}
            key={`second-${index}`}
            style={{ fontSize: size }}
            className={styles.staggeredText__letter}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

interface StaggeredTextProps {
  children?: string;
  id?: string;
  size?: string;
  width?: string;
  className?: string;
}

function StaggeredText({
  children = "content",
  id = `content${Date.now()}`,
  size = "2rem",
  width = "auto",
  className,
}: StaggeredTextProps) {
  const [hover, setHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple: just move up by 100% of the element's height - Kabby Lame hand gesture
  const startAnimation = hover ? { y: "-100%" } : { y: "0%" };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={styles.staggeredText}
      style={{ width }}
    >
      <Text
        Letters={children}
        id={id}
        size={size}
        startAnimation={startAnimation}
        className={className}
      />
    </div>
  );
}

export default StaggeredText;
