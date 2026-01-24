"use client";

import { useState } from "react";

export default function Greetings() {
  const [curGreeting, setCurGreeting] = useState(0);

  const greetings = ["Hello", "Bonjour", "Hola", "Hallo", "Ciao", "Ndewo"];

  const interval = setInterval(() => {
    setCurGreeting((curGreeting + 1) % greetings.length); // Increment curGreeting

    clearInterval(interval);
  }, 1000);

  return (
    <h1 className="text-[5.556rem] font-bold leading-[1] line !text-white">
      {greetings[curGreeting]}
      <span className="text-[var(--color-yellow)]">.</span>
    </h1>
  );
}
