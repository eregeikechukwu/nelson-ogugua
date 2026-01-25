"use client";

import { forwardRef } from "react";
import { motion, Variants, MotionProps } from "framer-motion";
import { CursorShape } from "./cursorShape";

const MotionComponent = motion(CursorShape);

export type ThumbnailCursorProps = MotionProps & {
  variants: Variants;
  active: boolean;
  className?: string;
};

/**
 * Thumbnail cursor circle
 */
export const ThumbnailCursorCircle = forwardRef<
  HTMLDivElement,
  ThumbnailCursorProps
>(
  (
    { variants, active, className = "bg-[var(--color-yellow)]", ...props },
    ref,
  ) => {
    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={variants}
        initial="initial"
        animate={active ? "enter" : "closed"}
        {...props}
      />
    );
  },
);

ThumbnailCursorCircle.displayName = "ThumbnailCursorCircle";

/**
 * Thumbnail cursor label
 */
export const ThumbnailCursorLabel = forwardRef<
  HTMLDivElement,
  ThumbnailCursorProps
>(({ variants, active, className = "", ...props }, ref) => {
  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variants}
      initial="initial"
      animate={active ? "enter" : "closed"}
      {...props}
    />
  );
});

ThumbnailCursorLabel.displayName = "ThumbnailCursorLabel";
