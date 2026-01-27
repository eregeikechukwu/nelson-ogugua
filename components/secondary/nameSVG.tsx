"use client";
import { useEffect, useRef, useState } from "react";

export function NameSVG({ children }: { children: string }) {
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState("0 0 1000 200");

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      // Use the actual bounds without extra padding
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  }, [children]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className="inline-block align-baseline h-[1em]"
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <linearGradient id="name-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="43%" stopColor="#858585" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>

      <text
        ref={textRef}
        x="0"
        y="0"
        fill="url(#name-grad)"
        fontSize="100"
        fontWeight="600"
        fontFamily="Axiforma, sans-serif"
        dominantBaseline="hanging"
      >
        {children}
      </text>
    </svg>
  );
}
