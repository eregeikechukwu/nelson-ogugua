export function Title({
  children,
  font = 14,
}: {
  children: string;
  font?: number;
}) {
  return (
    <h1 className=" text-white uppercase font-bold flex items-center gap-6  ">
      <span className=" inline-block w-4 h-[-webkit-fill-available] bg-[var(--color-yellow)]" />
      <span
        className={`translate-y-[3px] text-${font} tracking-[2px] leading-[1]`}
      >
        {children}
      </span>
    </h1>
  );
}
