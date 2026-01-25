// components/cursor/cursorShape.tsx
import React, { forwardRef } from "react";

type CursorShapeProps = {
  children?: React.ReactNode;
  className?: string;
};

export const CursorShape = forwardRef<HTMLDivElement, CursorShapeProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`cursorShape center-content ${className}`}>
        {children}
      </div>
    );
  },
);

CursorShape.displayName = "CursorShape";
