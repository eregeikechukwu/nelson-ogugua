"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TypewriterProps = {
  children: string;
  className?: string;
  speed?: number; // Characters per second
  delay?: number; // Delay before starting (in seconds)
  cursor?: boolean; // Show blinking cursor
  onComplete?: () => void;
  triggerOnScroll?: boolean; // Enable scroll trigger
  triggerStart?: string; // ScrollTrigger start position
  once?: boolean; // Trigger only once
};

export function Typewriter({
  children,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
  triggerOnScroll = true,
  triggerStart = "top 80%",
  once = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter animation function
  const startTypewriter = () => {
    if (hasTriggered && once) return;
    
    setHasTriggered(true);
    setDisplayedText("");
    setIsComplete(false);
    
    let currentIndex = 0;
    const text = children;
    const intervalTime = 1000 / speed;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsComplete(true);
          onComplete?.();
        }
      }, intervalTime);
    }, delay * 1000);
  };

  // Setup ScrollTrigger or immediate start
  useEffect(() => {
    if (!containerRef.current) return;

    if (triggerOnScroll) {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: triggerStart,
        once: once,
        onEnter: () => {
          startTypewriter();
        },
        onEnterBack: () => {
          if (!once) {
            startTypewriter();
          }
        },
      });

      return () => {
        trigger.kill();
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      // Start immediately if scroll trigger is disabled
      startTypewriter();

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [children, speed, delay, triggerOnScroll, triggerStart, once]);

  // Animate cursor blinking
  useEffect(() => {
    if (!cursor || !cursorRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "steps(1)",
    }).to(cursorRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "steps(1)",
    });

    // Stop blinking when complete
    if (isComplete) {
      tl.kill();
      gsap.set(cursorRef.current, { opacity: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [cursor, isComplete]);

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {cursor && (
        <span
          ref={cursorRef}
          className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
        />
      )}
    </span>
  );
}

// // ==================== USAGE EXAMPLES ====================

// export function TypewriterExamples() {
//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-8">
//       <div className="space-y-[100vh]">
//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Scroll down to see animations trigger</h2>
//           <Typewriter className="text-5xl font-bold">
//             This triggers immediately (top of page)
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Triggers when you scroll to it</h2>
//           <Typewriter className="text-4xl font-bold text-blue-400">
//             Hello! I appear when you scroll here!
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Custom trigger point (top 60%)</h2>
//           <Typewriter 
//             className="text-4xl font-bold text-purple-400"
//             triggerStart="top 60%"
//           >
//             I trigger earlier in the viewport
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Fast typing speed</h2>
//           <Typewriter 
//             className="text-3xl text-green-400"
//             speed={100}
//           >
//             Super fast typewriter effect with scroll trigger!
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Slow with delay</h2>
//           <Typewriter 
//             className="text-3xl text-pink-400"
//             speed={30}
//             delay={0.5}
//           >
//             Slow and dramatic...
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Repeats on scroll (once=false)</h2>
//           <Typewriter 
//             className="text-3xl text-yellow-400"
//             once={false}
//           >
//             Scroll up and down - I'll type again!
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">No cursor</h2>
//           <Typewriter 
//             className="text-3xl text-orange-400"
//             cursor={false}
//           >
//             Clean text without the blinking cursor
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Gradient text</h2>
//           <Typewriter 
//             className="text-5xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
//             speed={60}
//           >
//             Beautiful Gradient Animation
//           </Typewriter>
//         </div>

//         <div>
//           <h2 className="text-xl mb-4 text-slate-400">Long paragraph</h2>
//           <Typewriter 
//             className="text-xl leading-relaxed max-w-3xl text-slate-300"
//             speed={80}
//           >
//             The typewriter effect combined with scroll trigger creates an engaging user experience. 
//             As visitors scroll down your page, content comes alive with this classic animation technique. 
//             It's perfect for storytelling, hero sections, and drawing attention to key messages.
//           </Typewriter>
//         </div>

//         <div className="pb-32">
//           <h2 className="text-xl mb-4 text-slate-400">End of demo</h2>
//           <Typewriter 
//             className="text-4xl font-bold text-red-400"
//             speed={70}
//           >
//             You made it to the bottom! 🎉
//           </Typewriter>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ==================== HOW TO USE ====================
// /*

// 1. Basic scroll-triggered typewriter (default behavior):
// <Typewriter className="text-4xl">
//   This types when scrolled into view
// </Typewriter>

// 2. Custom trigger point:
// <Typewriter triggerStart="top 60%">
//   Triggers when element is 60% into viewport
// </Typewriter>

// 3. Retrigger on scroll up/down (not just once):
// <Typewriter once={false}>
//   This retypes every time you scroll to it
// </Typewriter>

// 4. Disable scroll trigger (start immediately):
// <Typewriter triggerOnScroll={false}>
//   This starts typing immediately on page load
// </Typewriter>

// 5. Combined with other props:
// <Typewriter 
//   className="text-5xl font-bold"
//   speed={80}
//   delay={0.5}
//   cursor={true}
//   triggerStart="top 70%"
//   once={true}
//   onComplete={() => console.log('Done!')}
// >
//   Full-featured example
// </Typewriter>

// Props:
// - children: string (required) - The text to type
// - className: string - Tailwind/CSS classes
// - speed: number - Characters per second (default: 50)
// - delay: number - Delay before typing starts (default: 0)
// - cursor: boolean - Show blinking cursor (default: true)
// - triggerOnScroll: boolean - Enable scroll trigger (default: true)
// - triggerStart: string - ScrollTrigger start position (default: "top 80%")
// - once: boolean - Trigger only once (default: true)
// - onComplete: () => void - Callback when typing completes

// */