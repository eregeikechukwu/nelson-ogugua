export function PassiveText({
  children,
  className,
  scaleDown = true,
}: {
  children: string;
  className?: string;
  scaleDown?: boolean;
}) {
  return (
    <p
      className={` ${scaleDown ? "text-10 md:!text-[0.75rem] leading-[1.51] md:!leading-[2] tracking-[1.26px] md:!tracking-[2px]" : "!text-[0.75rem] !leading-[2] !tracking-[2px]"} ${className}  uppercase text-[var(--color-text-gray)]`}
    >
      {children}
    </p>
  );
}

export function PassiveTextWithContainer({
  children,
  scaleDown = true,
}: {
  children: string;
  className?: string;
  scaleDown?: boolean;
}) {
  return (
    <div
      className={`${scaleDown ? "!py-[0.39375rem] !px-[0.475rem] md:!px-[0.75rem] md:!py-[0.625rem]" : "!px-[0.75rem] !py-[0.625rem]"} w-max  bg-[var(--color-gray-transparent3)] backdrop-blur-[20px]`}
    >
      <PassiveText scaleDown={scaleDown} className={` text-white !leading-[1]`}>
        {children}
      </PassiveText>
    </div>
  );
}
