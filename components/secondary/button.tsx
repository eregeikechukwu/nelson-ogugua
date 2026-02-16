import { ChevronRight } from "lucide-react";
import Link from "next/link";

const normalBtn = "bg-[var(--color-yellow)] text-black before:bg-white";

export function Button({
  children,
  link = "",
  width = "md:!w-auto !w-full",
  padding = "!px-[0.794rem]",
  className = "",
  takeMeOut = false,
  variant = "normal",
}: {
  children: string;
  link?: string;
  width?: string;
  padding?: string;
  className?: string;
  takeMeOut?: boolean;
  variant?: "normal" | "dark";
}) {
  return (
    <Link
      href={link}
      className={`cursor-pointer ${width}`}
      target={takeMeOut ? "_blank" : ""}
      rel="noopener noreferrer"
    >
      <button
        className={`${className} ${width} ${padding} group animated-button flex items-center justify-center rounded-[0.1562rem] md:rounded-[0.222rem] md:gap-[0.75rem] gap-[0.469rem]  md:!px-[0.75rem]  h-48 font-bold cursor-pointer ${variant === "normal" ? `${normalBtn}` : "bg-black text-white border-gray before:bg-[var(--color-medium-gray)]"}`}
      >
        <span className="md:text-[0.875rem] sm:text-[0.75rem] text-[0.75rem] uppercase tracking-[1.26px] md:tracking-[2px] leading-[1.26] md:leading-[1.75] pt-5">
          {children}
        </span>
        <span className="arrow inline-block w-15 h-15 md:!w-[1.25rem] md:!h-[1.25rem]">
          <ChevronRight
            width={20}
            height={20}
            className={
              variant === "normal"
                ? "text-black  w-full h-full"
                : "text-white  w-full h-full"
            }
          />
        </span>
      </button>
    </Link>
  );
}

export function SubmitButton({
  isSubmitting,
  disabled,
  variant = "light",
}: {
  isSubmitting?: boolean;
  disabled?: boolean;
  variant?: "light" | "dark";
}) {
  return (
    <button
      disabled={isSubmitting || disabled}
      type="submit"
      className={`group animated-button center-content rounded-[0.222rem] gap-12 md:w-[12.3125rem] w-full h-48   font-bold cursor-pointer ${variant === "light" ? `${normalBtn}` : "bg-black text-white border-gray"} ${isSubmitting || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="text-14 uppercase tracking-[2px] leading-[1.75] pt-4">
        {isSubmitting ? "Submitting..." : "Submit"}
      </span>
    </button>
  );
}
