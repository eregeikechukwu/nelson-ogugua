"use client";

import { axiforma } from "@/fonts/fonts";
import "@/styles/globals.scss";
import { Nav } from "@/components/sections/nav";
import { useState } from "react";
import PreLoader from "@/components/pages/preLoader";
import { useHardScroll } from "@/hooks/gsap/useHardScroll";
import { Footer } from "@/components/sections/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useHardScroll({
    lerp: 0.1,
    wheelMultiplier: 0.9,
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home | Nelson Ogugua</title>
      </head>

      <body className={`${axiforma.variable} font-axiform antialiased`}>
        {isLoading ? (
          <PreLoader setIsLoading={setIsLoading} />
        ) : (
          <div id="smooth-wrapper">
            <Nav />
            {children}
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
