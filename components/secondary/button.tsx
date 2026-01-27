import { ArrowRight2 } from "iconsax-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Button({
  children,
  link,
  variant = "light",
}: {
  children: string;
  link: string;
  variant?: "light" | "dark";
}) {
  return (
    <Link href={link} className="cursor-pointer">
      <button
        className={`group animated-button flex items-center rounded-[0.222rem] gap-12 px-12 h-48 font-bold cursor-pointer ${variant === "light" ? "bg-white text-black" : "bg-black text-white border-gray"}`}
      >
        <span className="text-14 uppercase tracking-[2px] leading-[1.75] pt-4">
          {children}
        </span>
        <span className="arrow inline-block w-20 h-20">
          <ArrowRight
            width={20}
            height={20}
            className={
              variant === "light"
                ? "text-black group-hover:text-white w-full h-full transition-colors"
                : "text-white group-hover:text-black w-full h-full transition-colore"
            }
          />
        </span>
      </button>
    </Link>
  );
}
