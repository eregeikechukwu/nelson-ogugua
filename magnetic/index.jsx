"use client";

import { useRef } from "react";

import { useFollowPointer } from "@/hooks";

import {
  ThumbnailCursorCircle,
  ThumbnailCursorLabel,
  ThumbnailList,
} from "./components";
import { scaleUp } from "./variants";

export function Thumbnail() {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const cursor = useRef(null);
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const label = useRef(null);

  const {
    item: { active, index },
    handlePointerEnter,
    handlePointerLeave,
    moveItems,
  } = useFollowPointer({
    cursor,
    label,
  });

  return (
    <section
      id="work"
      className="container relative max-sm:px-4"
      onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
    >
      <div className="my-8 flex flex-col gap-0">
        <ThumbnailList
          handlePointerEnter={handlePointerEnter}
          handlePointerLeave={handlePointerLeave}
          moveItems={moveItems}
        />
        <ThumbnailCursorCircle
          ref={cursor}
          variants={scaleUp}
          active={active}
        />
        <ThumbnailCursorLabel ref={label} variants={scaleUp} active={active}>
          View
        </ThumbnailCursorLabel>
      </div>
    </section>
  );
}
