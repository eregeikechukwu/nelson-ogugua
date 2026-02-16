import { useScreenSize } from "@/hooks/useScreenSize";

export function Title({ children, font }: { children: string; font?: number }) {
  const { isMobile, isSmall } = useScreenSize();

  const defaultSize = !(isMobile || isSmall) ? 14 : 12;

  return (
    <h1 className=" text-white uppercase font-bold flex items-center gap-6  ">
      <span className=" inline-block w-4  h-[0.9em] self-center bg-[var(--color-yellow)]" />
      <span
        className={`translate-y-[1px] text-${font || defaultSize} tracking-[2px] leading-[1]`}
      >
        {children}
      </span>
    </h1>
  );
}
