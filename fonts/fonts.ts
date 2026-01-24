import localFont from "next/font/local";

export const axiforma = localFont({
  src: [
    { path: "./Axiforma-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Axiforma-Medium.woff2", weight: "500", style: "normal" },
    { path: "./Axiforma-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./Axiforma-Bold.woff2", weight: "700", style: "normal" },
    { path: "./Axiforma-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./Axiforma-Black.woff2", weight: "900", style: "normal" },

    // italics
    { path: "./Axiforma-Italic.woff2", weight: "400", style: "italic" },
    { path: "./Axiforma-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "./Axiforma-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "./Axiforma-BoldItalic.woff2", weight: "700", style: "italic" },
    {
      path: "./Axiforma-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    { path: "./Axiforma-BlackItalic.woff2", weight: "900", style: "italic" },
  ],

  variable: "--font-axiforma",
  display: "swap",
});
