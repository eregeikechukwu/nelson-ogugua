import { axiforma } from "@/fonts/fonts";
import "@/styles/globals.scss";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { LayoutLayer } from "@/components/pages/layoutLayer";

export const metadata = {
  title: {
    default: "Nelson Ogugua",
    template: "%s | Nelson Ogugua",
  },
  description:
    "Nelson Ogugua, a designer who enjoys turning complex ideas into products that are functional, intuitive and easy to use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home | Nelson Ogugua</title>
      </head>

      <body className={`${axiforma.variable} font-axiforma antialiased`}>
        <div id="smooth-wrapper">
          <LayoutLayer>
            <Nav />
            {children}
            <Footer />
          </LayoutLayer>
        </div>
      </body>
    </html>
  );
}
