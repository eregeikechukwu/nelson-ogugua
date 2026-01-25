"use client";

import { useEffect, useState } from "react";

function CountUp({
  ref,
  end,
  duration = 1500,
  styles,
}: {
  ref: React.RefObject<HTMLDivElement>;
  end: number;
  duration?: number;
  styles?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //intersection observer

    let start = 0;
    const increment = end / (duration / 16); // 60fps ~ 16ms/frame

    const startCounter = () => {
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 16);
    };

    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.unobserve(ref.current as Element);
            startCounter();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(ref.current as Element);
    }

    return;
  }, [end, duration, ref]);

  return <span className={styles}>{count}</span>;
}

export default CountUp;
