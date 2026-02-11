import { ArrowRight } from "lucide-react";
import Link from "next/link";

const normalBtn = "bg-[var(--color-yellow)] text-black before:bg-white";

export function Button({
  children,
  link = "",
  takeMeOut = false,
  variant = "normal",
}: {
  children: string;
  link?: string;
  takeMeOut?: boolean;
  variant?: "normal" | "dark";
}) {
  return (
    <Link
      href={link}
      className="cursor-pointer"
      target={takeMeOut ? "_blank" : ""}
      rel="noopener noreferrer"
    >
      <button
        className={`group animated-button flex items-center rounded-[0.222rem] gap-12 px-12 h-48 font-bold cursor-pointer ${variant === "normal" ? `${normalBtn}` : "bg-black text-white border-gray before:bg-[var(--color-medium-gray)]"}`}
      >
        <span className="text-14 uppercase tracking-[2px] leading-[1.75] pt-4">
          {children}
        </span>
        <span className="arrow inline-block w-20 h-20">
          <ArrowRight
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
      className={`group animated-button center-content rounded-[0.222rem] gap-12 w-[12.3125rem] h-48 font-bold cursor-pointer ${variant === "light" ? `${normalBtn}` : "bg-black text-white border-gray"} ${isSubmitting || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="text-14 uppercase tracking-[2px] leading-[1.75] pt-4">
        {isSubmitting ? "Submitting..." : "Submit"}
      </span>
    </button>
  );
}
