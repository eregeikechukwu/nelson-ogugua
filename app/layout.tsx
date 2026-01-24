"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { axiforma } from "@/fonts/fonts";
import "@/styles/globals.scss";
import { Nav } from "@/components/sections/nav";
import { useState } from "react";
import PreLoader from "@/components/pages/preLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${axiforma.variable} font-axiform antialiased`}
      >
        {isLoading ? (
          <PreLoader setIsLoading={setIsLoading} />
        ) : (
          <>
            <Nav />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
