"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type UseFollowPointerProps = {
  cursor: React.RefObject<HTMLElement | null>;
  label: React.RefObject<HTMLElement | null>;
};

type FollowPointerItem = {
  active: boolean;
  index: number;
};

type MoveItemsFn = (x: number, y: number) => void;

export function useFollowPointer({ cursor, label }: UseFollowPointerProps) {
  const [item, setItem] = useState<FollowPointerItem>({ active: false, index: 0 });

  // QuickTo refs
  const xMoveCursor = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yMoveCursor = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const xMoveLabel = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yMoveLabel = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  /** Callbacks for pointer enter/leave */
  const handlePointerEnter = useCallback((index: number) => {
    setItem({ active: true, index });
  }, []);

  const handlePointerLeave = useCallback((index: number) => {
    setItem({ active: false, index });
  }, []);

  /** Move items on pointer move */
  const moveItems = useCallback<MoveItemsFn>((x, y) => {
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveLabel.current?.(x);
    yMoveLabel.current?.(y);
  }, []);

  useEffect(() => {
    if (!cursor.current || !label.current) return;

    const ctx = gsap.context(() => {
      // Move cursor
      xMoveCursor.current = gsap.quickTo(cursor.current!, "left", {
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });
      yMoveCursor.current = gsap.quickTo(cursor.current!, "top", {
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });

      // Move cursor label
      xMoveLabel.current = gsap.quickTo(label.current!, "left", {
        duration: 0.59,
        ease: "power2",
      });
      yMoveLabel.current = gsap.quickTo(label.current!, "top", {
        duration: 0.59,
        ease: "power2",
      });
    });

    return () => ctx.revert();
  }, [cursor, label]);

  return { item, handlePointerEnter, handlePointerLeave, moveItems };
}
